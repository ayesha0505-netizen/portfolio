import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    const actual = (process.env.ADMIN_PASSCODE || "").trim();

    if (!actual) {
      return NextResponse.json(
        { error: "Admin passcode not configured on server" },
        { status: 500 }
      );
    }

    if (passcode && passcode.trim() === actual) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid passcode" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Verification request failed" },
      { status: 400 }
    );
  }
}
