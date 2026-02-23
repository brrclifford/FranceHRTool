"use client";

import { useState, useCallback, useEffect } from "react";
import { Worker, EnrichmentFormData } from "@/lib/types";

export function useWorkers() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/workers");
      if (!res.ok) throw new Error("Failed to load workers");
      const data = await res.json();
      setWorkers(data as Worker[]);
    } catch (err) {
      console.error("Error fetching workers:", err);
      setError(err instanceof Error ? err.message : "Failed to load workers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const submitWorker = useCallback(
    async (workerId: string, formData: EnrichmentFormData) => {
      const res = await fetch(`/api/workers/${workerId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Failed to submit worker");
      }

      const { now } = body;

      // Update local state
      setWorkers((prev) =>
        prev.map((w) =>
          w.id === workerId
            ? { ...w, ...formData, status: "submitted" as const, last_submitted_at: now, updated_at: now }
            : w
        )
      );
    },
    []
  );

  const unenrichWorker = useCallback(
    async (workerId: string) => {
      const res = await fetch(`/api/workers/${workerId}/unenrich`, {
        method: "POST",
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Failed to unenrich worker");
      }

      const { now } = body;

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
    []
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
