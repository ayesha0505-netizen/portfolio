import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  description: string;
  imageUrl: string;
  sourceType: "gallery" | "drive";
  createdAt: string;
}

const DEFAULT_ADMIN_PASSCODE = "ayeSha@1972";

function getAdminPasscode(): string {
  return process.env.ADMIN_PASSCODE || DEFAULT_ADMIN_PASSCODE;
}

function verifyAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization") || req.headers.get("x-admin-passcode");
  const provided = authHeader?.replace(/^Bearer\s+/i, "").trim();
  const actual = getAdminPasscode().trim();
  return Boolean(provided && provided === actual);
}

function getDataFilePath(): string {
  return path.join(process.cwd(), "data", "certificates.json");
}

function readCertificates(): CertificateItem[] {
  try {
    const filePath = getDataFilePath();
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeCertificates(items: CertificateItem[]): void {
  const filePath = getDataFilePath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2), "utf-8");
}

function parseGoogleDriveUrl(url: string): string {
  const trimmed = url.trim();
  const fileIdMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return trimmed;
}

// GET /api/certificates - Public fetch of published certificates
export async function GET() {
  const items = readCertificates();
  return NextResponse.json(items);
}

// POST /api/certificates - Admin creation of new certificate
export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid admin passcode" },
      { status: 401 }
    );
  }

  try {
    const contentType = req.headers.get("content-type") || "";

    let title = "";
    let issuer = "";
    let date = "";
    let description = "";
    let imageUrl = "";
    let sourceType: "gallery" | "drive" = "gallery";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      title = (formData.get("title") as string) || "";
      issuer = (formData.get("issuer") as string) || "";
      date = (formData.get("date") as string) || "";
      description = (formData.get("description") as string) || "";
      const driveUrl = (formData.get("driveUrl") as string) || "";

      const file = formData.get("file") as File | null;

      if (file && file.size > 0) {
        sourceType = "gallery";
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), "public", "uploads", "certificates");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const safeExt = path.extname(file.name) || ".jpg";
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;
        const filePath = path.join(uploadsDir, filename);

        fs.writeFileSync(filePath, buffer);
        imageUrl = `/uploads/certificates/${filename}`;
      } else if (driveUrl) {
        sourceType = "drive";
        imageUrl = parseGoogleDriveUrl(driveUrl);
      }
    } else {
      const json = await req.json();
      title = json.title || "";
      issuer = json.issuer || "";
      date = json.date || "";
      description = json.description || "";
      if (json.driveUrl) {
        sourceType = "drive";
        imageUrl = parseGoogleDriveUrl(json.driveUrl);
      } else if (json.imageUrl) {
        sourceType = json.sourceType || "gallery";
        imageUrl = json.imageUrl;
      }
    }

    if (!title.trim() || !description.trim() || !imageUrl) {
      return NextResponse.json(
        { error: "Title, description, and certificate image are required." },
        { status: 400 }
      );
    }

    const newCert: CertificateItem = {
      id: `cert_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      title: title.trim(),
      issuer: issuer.trim() || "Independent / Verified",
      date: date.trim() || undefined,
      description: description.trim(),
      imageUrl,
      sourceType,
      createdAt: new Date().toISOString(),
    };

    const current = readCertificates();
    const updated = [newCert, ...current];
    writeCertificates(updated);

    return NextResponse.json(newCert, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save certificate";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/certificates - Admin deletion of a certificate
export async function DELETE(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid admin passcode" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Certificate ID is required" },
        { status: 400 }
      );
    }

    const current = readCertificates();
    const itemToDelete = current.find((c) => c.id === id);

    if (itemToDelete && itemToDelete.imageUrl.startsWith("/uploads/certificates/")) {
      const filePath = path.join(process.cwd(), "public", itemToDelete.imageUrl);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch {
          // ignore deletion error if file already removed
        }
      }
    }

    const updated = current.filter((c) => c.id !== id);
    writeCertificates(updated);

    return NextResponse.json({ success: true, id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete certificate";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
