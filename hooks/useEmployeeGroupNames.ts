"use client";

import { useState, useCallback, useEffect } from "react";
import { EmployeeGroupName } from "@/lib/types";
import { createClient } from "@/lib/supabase";

export function useEmployeeGroupNames() {
  const [groupNames, setGroupNames] = useState<EmployeeGroupName[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchGroupNames = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("employee_group_names")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      setGroupNames((data as EmployeeGroupName[]) || []);
    } catch (err) {
      console.error("Error fetching employee group names:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchGroupNames();
  }, [fetchGroupNames]);

  const addGroupName = useCallback(
    async (name: string) => {
      const { data, error } = await supabase
        .from("employee_group_names")
        .insert({ name })
        .select()
        .single();

      if (error) throw error;

      setGroupNames((prev) =>
        [...prev, data as EmployeeGroupName].sort((a, b) => a.name.localeCompare(b.name))
      );

      return data as EmployeeGroupName;
    },
    [supabase]
  );

  return { groupNames, loading, addGroupName };
}
