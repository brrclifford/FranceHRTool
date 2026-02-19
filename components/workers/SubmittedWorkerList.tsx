"use client";

import { useState } from "react";
import { Worker, EnrichmentFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { WorkerEnrichmentForm } from "./WorkerEnrichmentForm";

interface SubmittedWorkerListProps {
  workers: Worker[];
  onSubmit: (workerId: string, data: EnrichmentFormData) => Promise<void>;
  onUnenrich: (workerId: string) => Promise<void>;
}

export function SubmittedWorkerList({
  workers,
  onSubmit,
  onUnenrich,
}: SubmittedWorkerListProps) {
  const [filterOapassId, setFilterOapassId] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
  const [unenrichWorker, setUnenrichWorker] = useState<Worker | null>(null);
  const [unenriching, setUnenriching] = useState(false);

  const filtered = workers.filter((w) => {
    const matchOapass =
      !filterOapassId ||
      w.oapass_id.toLowerCase().includes(filterOapassId.toLowerCase());
    const matchEmail =
      !filterEmail ||
      w.email.toLowerCase().includes(filterEmail.toLowerCase());
    return matchOapass && matchEmail;
  });

  const handleUnenrich = async () => {
    if (!unenrichWorker) return;
    setUnenriching(true);
    try {
      await onUnenrich(unenrichWorker.id);
      setUnenrichWorker(null);
    } catch (err) {
      console.error("Error unenriching:", err);
    } finally {
      setUnenriching(false);
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Filter by OAPASS ID..."
          value={filterOapassId}
          onChange={(e) => setFilterOapassId(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Filter by email..."
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No submitted workers found.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>OAPASS ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Last Submitted</TableHead>
              <TableHead className="w-[160px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell className="font-mono text-sm">
                  {worker.oapass_id}
                </TableCell>
                <TableCell>
                  {worker.first_name} {worker.last_name}
                </TableCell>
                <TableCell>{worker.email}</TableCell>
                <TableCell>{worker.store_name}</TableCell>
                <TableCell>
                  {worker.last_submitted_at
                    ? new Date(worker.last_submitted_at).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingWorker(worker)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setUnenrichWorker(worker)}
                    >
                      Unenrich
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Edit dialog */}
      {editingWorker && (
        <WorkerEnrichmentForm
          worker={editingWorker}
          open={!!editingWorker}
          onOpenChange={(open) => {
            if (!open) setEditingWorker(null);
          }}
          onSubmit={onSubmit}
        />
      )}

      {/* Unenrich confirmation dialog */}
      <Dialog
        open={!!unenrichWorker}
        onOpenChange={(open) => {
          if (!open) setUnenrichWorker(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Unenrich</DialogTitle>
            <DialogDescription>
              This will clear all enrichment data for{" "}
              <strong>
                {unenrichWorker?.first_name} {unenrichWorker?.last_name}
              </strong>{" "}
              and move them back to the Unenriched Workers tab. This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUnenrichWorker(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleUnenrich}
              disabled={unenriching}
            >
              {unenriching ? "Processing..." : "Unenrich"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
