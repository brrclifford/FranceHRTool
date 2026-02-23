import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: workerId } = await params;
  const formData = await request.json();
  const now = new Date().toISOString();
  const supabase = createServerClient();

  const { error: updateError } = await supabase
    .from("workers")
    .update({
      ...formData,
      status: "submitted",
      last_submitted_at: now,
      updated_at: now,
    })
    .eq("id", workerId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const { error: historyError } = await supabase
    .from("submission_history")
    .insert({
      worker_id: workerId,
      ...formData,
      submitted_at: now,
    });

  if (historyError) {
    return NextResponse.json({ error: historyError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, now });
}
