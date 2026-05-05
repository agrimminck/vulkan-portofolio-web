import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const db = neon(process.env.DATABASE_URL!);

export async function GET(_req: Request, { params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const rows = await db`SELECT data, content_type FROM portfolio_settings.portraits WHERE theme = ${theme}`;
  if (!rows.length) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const row = rows[0];
  const buf = Buffer.from(row.data as string, "hex");
  return new Response(buf, {
    headers: {
      "Content-Type": row.content_type as string,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
