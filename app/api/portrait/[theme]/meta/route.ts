import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const db = neon(process.env.DATABASE_URL!);

export async function GET(_req: Request, { params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const rows = await db`SELECT position FROM portfolio_settings.portraits WHERE theme = ${theme}`;
  if (!rows.length) return NextResponse.json({ position: "center center" });
  return NextResponse.json({ position: rows[0].position ?? "center center" });
}
