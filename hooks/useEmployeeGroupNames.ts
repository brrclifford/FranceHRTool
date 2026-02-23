"use client";

import { useState, useCallback, useEffect } from "react";
import { EmployeeGroupName } from "@/lib/types";

export function useEmployeeGroupNames() {
  const [groupNames, setGroupNames] = useState<EmployeeGroupName[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGroupNames = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/employee-group-names");
      if (!res.ok) throw new Error("Failed to load group names");
      const data = await res.json();
      setGroupNames(data as EmployeeGroupName[]);
    } catch (err) {
      console.error("Error fetching employee group names:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroupNames();
  }, [fetchGroupNames]);

  const addGroupName = useCallback(
    async (name: string) => {
      const res = await fetch("/api/employee-group-names", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to add group name");
      }

      const data = await res.json() as EmployeeGroupName;

      setGroupNames((prev) =>
        [...prev, data].sort((a, b) => a.name.localeCompare(b.name))
      );

      return data;
    },
    []
  );

  return { groupNames, loading, addGroupName };
}
