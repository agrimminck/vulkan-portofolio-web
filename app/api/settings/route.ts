import { neon } from "@neondatabase/serverless";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

const db = neon(process.env.DATABASE_URL!);

export async function GET() {
  const rows = await db`SELECT key, value FROM portfolio_settings.settings`;
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key as string] = r.value as string;
  return NextResponse.json(map);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json() as Record<string, string>;
  for (const [key, value] of Object.entries(body)) {
    await db`INSERT INTO portfolio_settings.settings (key, value) VALUES (${key}, ${value})
             ON CONFLICT (key) DO UPDATE SET value = ${value}`;
  }
  return NextResponse.json({ ok: true });
}
