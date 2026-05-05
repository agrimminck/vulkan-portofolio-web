import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const db = neon(process.env.DATABASE_URL!);

export async function GET(_req: Request, { params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const rows = await db`SELECT position, version FROM portfolio_settings.portraits WHERE theme = ${theme}`;
  if (!rows.length) return NextResponse.json({ position: "50% 50% 1", version: 0 });
  return NextResponse.json({
    position: rows[0].position ?? "50% 50% 1",
    version: rows[0].version ?? 0,
  });
}
