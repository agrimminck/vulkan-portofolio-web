import { neon } from "@neondatabase/serverless";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const db = neon(process.env.DATABASE_URL!);

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const theme = (formData.get("theme") as string | null)?.trim();
  const position = (formData.get("position") as string | null)?.trim() ?? "center center";

  if (!file || !theme) return NextResponse.json({ error: "Missing file or theme" }, { status: 400 });
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: "Invalid file type" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  if (bytes.byteLength > MAX_BYTES) return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });

  const buf = Buffer.from(bytes);
  const hex = buf.toString("hex");

  const ts = Date.now();
  await db`
    INSERT INTO portfolio_settings.portraits (theme, data, content_type, position, version)
    VALUES (${theme}, decode(${hex}, 'hex'), ${file.type}, ${position}, ${ts})
    ON CONFLICT (theme) DO UPDATE
      SET data = decode(${hex}, 'hex'), content_type = ${file.type}, position = ${position}, version = ${ts}
  `;

  return NextResponse.json({ url: `/api/portrait/${theme}`, position });
}
