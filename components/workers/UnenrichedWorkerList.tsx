"use client";

import { useState } from "react";
import { Worker, EnrichmentFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WorkerEnrichmentForm } from "./WorkerEnrichmentForm";

interface UnenrichedWorkerListProps {
  workers: Worker[];
  onSubmit: (workerId: string, data: EnrichmentFormData) => Promise<void>;
}

export function UnenrichedWorkerList({
  workers,
  onSubmit,
}: UnenrichedWorkerListProps) {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  if (workers.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No unenriched workers found.
      </p>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OAPASS ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Store</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workers.map((worker) => (
            <TableRow key={worker.id}>
              <TableCell className="font-mono text-sm">
                {worker.oapass_id}
              </TableCell>
              <TableCell>
                {worker.first_name} {worker.last_name}
              </TableCell>
              <TableCell>{worker.email}</TableCell>
              <TableCell>{worker.store_name}</TableCell>
              <TableCell>{worker.start_date}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => setSelectedWorker(worker)}
                >
                  Enrich
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedWorker && (
        <WorkerEnrichmentForm
          worker={selectedWorker}
          open={!!selectedWorker}
          onOpenChange={(open) => {
            if (!open) setSelectedWorker(null);
          }}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
