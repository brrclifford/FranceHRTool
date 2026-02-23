"use client";

import { useState, useCallback, useEffect } from "react";
import { JobSpecialisation } from "@/lib/types";

export function useJobSpecialisations() {
  const [specialisations, setSpecialisations] = useState<JobSpecialisation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSpecialisations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/job-specialisations");
      if (!res.ok) throw new Error("Failed to load specialisations");
      const data = await res.json();
      setSpecialisations(data as JobSpecialisation[]);
    } catch (err) {
      console.error("Error fetching job specialisations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpecialisations();
  }, [fetchSpecialisations]);

  const addSpecialisation = useCallback(
    async (code: string, title: string) => {
      const res = await fetch("/api/job-specialisations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, title }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to add specialisation");
      }

      const data = await res.json() as JobSpecialisation;

      setSpecialisations((prev) =>
        [...prev, data].sort((a, b) => a.code.localeCompare(b.code))
      );

      return data;
    },
    []
  );

  return { specialisations, loading, addSpecialisation };
}
