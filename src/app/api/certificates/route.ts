import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

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

function getAdminPasscode(): string {
  return (process.env.ADMIN_PASSCODE || "").trim();
}

function verifyAuth(req: NextRequest): boolean {
  const actual = getAdminPasscode();
  if (!actual) return false;

  const authHeader = req.headers.get("authorization") || req.headers.get("x-admin-passcode");
  const provided = authHeader?.replace(/^Bearer\s+/i, "").trim();
  return Boolean(provided && provided === actual);
}

function getTmpFilePath(): string {
  return path.join(os.tmpdir(), "certificates.json");
}

function getBundledFilePath(): string {
  return path.join(process.cwd(), "data", "certificates.json");
}

function readCertificates(): CertificateItem[] {
  // 1. Try reading from /tmp first (holds latest additions in serverless runtime)
  try {
    const tmpPath = getTmpFilePath();
    if (fs.existsSync(tmpPath)) {
      const raw = fs.readFileSync(tmpPath, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Ignore tmp read errors
  }

  // 2. Try reading from bundled static JSON file in the project
  try {
    const bundledPath = getBundledFilePath();
    if (fs.existsSync(bundledPath)) {
      const raw = fs.readFileSync(bundledPath, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Ignore bundled read errors
  }

  return [];
}

function writeCertificates(items: CertificateItem[]): void {
  // 1. Always write to /tmp (guaranteed writable on Vercel / AWS Lambda)
  try {
    const tmpPath = getTmpFilePath();
    fs.writeFileSync(tmpPath, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write to tmpdir:", err);
  }

  // 2. In local dev environment, also persist to project data/certificates.json
  try {
    const localPath = getBundledFilePath();
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localPath, JSON.stringify(items, null, 2), "utf-8");
  } catch {
    // Expected to fail on read-only serverless filesystems (/var/task)
  }
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
        const mimeType = file.type || "image/jpeg";

        // Store as Base64 data URL to be completely serverless-safe
        imageUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;

        // Also attempt writing to local uploads directory in local dev
        try {
          const uploadsDir = path.join(process.cwd(), "public", "uploads", "certificates");
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          const safeExt = path.extname(file.name) || ".jpg";
          const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;
          const filePath = path.join(uploadsDir, filename);
          fs.writeFileSync(filePath, buffer);
          imageUrl = `/uploads/certificates/${filename}`;
        } catch {
          // If read-only fs (Vercel), imageUrl remains the base64 data URL
        }
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
          // ignore deletion error if filesystem is read-only
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
