"use client";

import { useState, useCallback, useEffect } from "react";
import { JobSpecialisation } from "@/lib/types";
import { createClient } from "@/lib/supabase";

export function useJobSpecialisations() {
  const [specialisations, setSpecialisations] = useState<JobSpecialisation[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchSpecialisations = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("job_specialisations")
        .select("*")
        .order("code", { ascending: true });

      if (error) throw error;
      setSpecialisations((data as JobSpecialisation[]) || []);
    } catch (err) {
      console.error("Error fetching job specialisations:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchSpecialisations();
  }, [fetchSpecialisations]);

  const addSpecialisation = useCallback(
    async (code: string, title: string) => {
      const { data, error } = await supabase
        .from("job_specialisations")
        .insert({ code, title })
        .select()
        .single();

      if (error) throw error;

      setSpecialisations((prev) =>
        [...prev, data as JobSpecialisation].sort((a, b) => a.code.localeCompare(b.code))
      );

      return data as JobSpecialisation;
    },
    [supabase]
  );

  return { specialisations, loading, addSpecialisation };
}
