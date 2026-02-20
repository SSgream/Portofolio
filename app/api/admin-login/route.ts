import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data } = await supabase
    .from("admin")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (!data) {
    return NextResponse.json(
      { error: "Login gagal" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}
