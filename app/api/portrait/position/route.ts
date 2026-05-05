import { neon } from "@neondatabase/serverless";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const db = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { theme, position } = await req.json() as { theme: string; position: string };
  if (!theme || !position) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  await db`UPDATE portfolio_settings.portraits SET position = ${position} WHERE theme = ${theme}`;
  return NextResponse.json({ ok: true });
}
