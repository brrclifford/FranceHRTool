"use client";

import { useState, useCallback, useEffect } from "react";
import { Worker, EnrichmentFormData } from "@/lib/types";
import { createClient } from "@/lib/supabase";

export function useWorkers() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const fetchWorkers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("workers")
        .select("*")
        .order("created_at", { ascending: true });

      if (fetchError) throw fetchError;
      setWorkers((data as Worker[]) || []);
    } catch (err) {
      console.error("Error fetching workers:", err);
      setError(err instanceof Error ? err.message : "Failed to load workers");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const submitWorker = useCallback(
    async (workerId: string, formData: EnrichmentFormData) => {
      const now = new Date().toISOString();

      const { error: updateError } = await supabase
        .from("workers")
        .update({
          ...formData,
          status: "submitted",
          last_submitted_at: now,
          updated_at: now,
        })
        .eq("id", workerId);

      if (updateError) throw updateError;

      // Create submission history snapshot
      const { error: historyError } = await supabase
        .from("submission_history")
        .insert({
          worker_id: workerId,
          ...formData,
          submitted_at: now,
        });

      if (historyError) throw historyError;

      // Update local state
      setWorkers((prev) =>
        prev.map((w) =>
          w.id === workerId
            ? { ...w, ...formData, status: "submitted" as const, last_submitted_at: now, updated_at: now }
            : w
        )
      );
    },
    [supabase]
  );

  const unenrichWorker = useCallback(
    async (workerId: string) => {
      const now = new Date().toISOString();

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

      if (updateError) throw updateError;

      setWorkers((prev) =>
        prev.map((w) =>
          w.id === workerId
            ? {
                ...w,
                pay_rate: null,
                pay_type: null,
                job_title: null,
                job_specialisation_code: null,
                employee_group_name: null,
                is_full_time: null,
                contract_hours: null,
                payroll_user_id: null,
                effective_date: null,
                status: "unenriched" as const,
                last_submitted_at: null,
                updated_at: now,
              }
            : w
        )
      );
    },
    [supabase]
  );

  const unenrichedWorkers = workers.filter((w) => w.status === "unenriched");
  const submittedWorkers = workers.filter((w) => w.status === "submitted");

  return {
    workers,
    unenrichedWorkers,
    submittedWorkers,
    loading,
    error,
    submitWorker,
    unenrichWorker,
    refetch: fetchWorkers,
  };
}
