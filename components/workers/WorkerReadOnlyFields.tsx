"use client";

import { Worker } from "@/lib/types";
import { Label } from "@/components/ui/label";

interface WorkerReadOnlyFieldsProps {
  worker: Worker;
}

export function WorkerReadOnlyFields({ worker }: WorkerReadOnlyFieldsProps) {
  const fields = [
    { label: "OAPASS ID", value: worker.oapass_id },
    { label: "First Name", value: worker.first_name },
    { label: "Last Name", value: worker.last_name },
    { label: "Email", value: worker.email },
    { label: "Start Date", value: worker.start_date },
    { label: "Store Name", value: worker.store_name },
    { label: "Sys ID", value: worker.sys_id },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map((field) => (
        <div key={field.label} className="space-y-1">
          <Label className="text-xs text-muted-foreground">{field.label}</Label>
          <p className="text-sm font-medium">{field.value}</p>
        </div>
      ))}
    </div>
  );
}
