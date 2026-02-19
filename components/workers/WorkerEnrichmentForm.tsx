"use client";

import { useState } from "react";
import { Worker, EnrichmentFormData } from "@/lib/types";
import { useJobSpecialisations } from "@/hooks/useJobSpecialisations";
import { useEmployeeGroupNames } from "@/hooks/useEmployeeGroupNames";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { WorkerReadOnlyFields } from "./WorkerReadOnlyFields";
import { ComboboxWithFreeText } from "./ComboboxWithFreeText";

interface WorkerEnrichmentFormProps {
  worker: Worker;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (workerId: string, data: EnrichmentFormData) => Promise<void>;
}

export function WorkerEnrichmentForm({
  worker,
  open,
  onOpenChange,
  onSubmit,
}: WorkerEnrichmentFormProps) {
  const { specialisations } = useJobSpecialisations();
  const { groupNames } = useEmployeeGroupNames();

  const [formData, setFormData] = useState<EnrichmentFormData>({
    pay_rate: worker.pay_rate || 0,
    pay_type: worker.pay_type || "",
    job_title: worker.job_title || "",
    job_specialisation_code: worker.job_specialisation_code || "",
    employee_group_name: worker.employee_group_name || "",
    is_full_time: worker.is_full_time || false,
    contract_hours: worker.contract_hours || 0,
    payroll_user_id: worker.payroll_user_id || "",
  });

  const [submitting, setSubmitting] = useState(false);

  const specOptions = specialisations.map((s) => ({
    value: s.code,
    label: `${s.code} - ${s.title}`,
  }));

  const groupOptions = groupNames.map((g) => ({
    value: g.name,
    label: g.name,
  }));

  const isValid =
    formData.pay_rate > 0 &&
    formData.pay_type !== "" &&
    formData.job_title !== "" &&
    formData.job_specialisation_code !== "" &&
    formData.employee_group_name !== "" &&
    formData.contract_hours > 0 &&
    formData.payroll_user_id !== "";

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    try {
      await onSubmit(worker.id, formData);
      onOpenChange(false);
    } catch (err) {
      console.error("Error submitting:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Enrich Worker: {worker.first_name} {worker.last_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Read-only fields */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Worker Information
            </h3>
            <WorkerReadOnlyFields worker={worker} />
          </div>

          <hr />

          {/* Editable fields */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Enrichment Data
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Pay Rate */}
              <div className="space-y-2">
                <Label htmlFor="pay_rate">Pay Rate *</Label>
                <Input
                  id="pay_rate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.pay_rate || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pay_rate: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>

              {/* Pay Type */}
              <div className="space-y-2">
                <Label htmlFor="pay_type">Pay Type *</Label>
                <Select
                  value={formData.pay_type}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, pay_type: val }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pay type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hourly">Hourly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title *</Label>
                <Input
                  id="job_title"
                  value={formData.job_title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      job_title: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Job Specialisation Code */}
              <div className="space-y-2">
                <Label>Specialisation Code *</Label>
                <ComboboxWithFreeText
                  options={specOptions}
                  value={formData.job_specialisation_code}
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      job_specialisation_code: val,
                    }))
                  }
                  placeholder="Select specialisation..."
                />
              </div>

              {/* Employee Group Name */}
              <div className="space-y-2">
                <Label>Employee Group *</Label>
                <ComboboxWithFreeText
                  options={groupOptions}
                  value={formData.employee_group_name}
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      employee_group_name: val,
                    }))
                  }
                  placeholder="Select group..."
                />
              </div>

              {/* Contract Hours */}
              <div className="space-y-2">
                <Label htmlFor="contract_hours">Contract Hours *</Label>
                <Input
                  id="contract_hours"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.contract_hours || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contract_hours: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>

              {/* Payroll User ID */}
              <div className="space-y-2">
                <Label htmlFor="payroll_user_id">Payroll/User ID *</Label>
                <Input
                  id="payroll_user_id"
                  value={formData.payroll_user_id}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      payroll_user_id: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Is Full Time */}
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="is_full_time"
                  checked={formData.is_full_time}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      is_full_time: checked === true,
                    }))
                  }
                />
                <Label htmlFor="is_full_time">Full Time</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!isValid || submitting}>
              {submitting ? "Submitting..." : "Submit to Aesop"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
