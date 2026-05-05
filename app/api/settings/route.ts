import { neon } from "@neondatabase/serverless";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const db = neon(process.env.DATABASE_URL!);

export async function GET() {
  const rows = await db`SELECT key, value FROM portfolio_settings.settings`;
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key as string] = r.value as string;
  return NextResponse.json(map);
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const normalizeEmail = (e: string) => {
    const parts = e.toLowerCase().trim().split("@");
    return `${parts[0].replace(/\./g, "")}@${parts[1]}`;
  };
  const tokenEmail = token?.email ? normalizeEmail(token.email) : null;
  const adminEmail = process.env.ADMIN_EMAIL ? normalizeEmail(process.env.ADMIN_EMAIL) : null;
  if (!tokenEmail || tokenEmail !== adminEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json() as Record<string, string>;
  for (const [key, value] of Object.entries(body)) {
    await db`INSERT INTO portfolio_settings.settings (key, value) VALUES (${key}, ${value})
             ON CONFLICT (key) DO UPDATE SET value = ${value}`;
  }
  return NextResponse.json({ ok: true });
}
