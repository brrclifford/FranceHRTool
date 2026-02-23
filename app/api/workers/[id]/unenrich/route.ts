import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: workerId } = await params;
  const now = new Date().toISOString();
  const supabase = createServerClient();

  const { error: updateError } = await supabase
    .from("workers")
    .update({
      pay_rate: null,
      pay_type: null,
      job_title: null,
      job_specialisation_code: null,
      employee_group_name: null,
      is_full_time: null,
      contract_hours: null,
      payroll_user_id: null,
      effective_date: null,
      status: "unenriched",
      last_submitted_at: null,
      updated_at: now,
    })
    .eq("id", workerId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, now });
}
