"use client";

import { useWorkers } from "@/hooks/useWorkers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UnenrichedWorkerList } from "@/components/workers/UnenrichedWorkerList";
import { SubmittedWorkerList } from "@/components/workers/SubmittedWorkerList";
import { toast } from "sonner";
import { EnrichmentFormData } from "@/lib/types";

export default function DashboardPage() {
  const {
    unenrichedWorkers,
    submittedWorkers,
    loading,
    error,
    submitWorker,
    unenrichWorker,
  } = useWorkers();

  const handleSubmit = async (workerId: string, data: EnrichmentFormData) => {
    await submitWorker(workerId, data);
    toast.success("Submission confirmed");
  };

  const handleUnenrich = async (workerId: string) => {
    await unenrichWorker(workerId);
    toast.success("Worker moved back to unenriched");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading workers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="unenriched">
      <TabsList>
        <TabsTrigger value="unenriched" className="gap-2">
          Unenriched Workers
          <Badge variant="secondary">{unenrichedWorkers.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="submitted" className="gap-2">
          Submitted Workers
          <Badge variant="secondary">{submittedWorkers.length}</Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="unenriched" className="mt-4">
        <UnenrichedWorkerList
          workers={unenrichedWorkers}
          onSubmit={handleSubmit}
        />
      </TabsContent>

      <TabsContent value="submitted" className="mt-4">
        <SubmittedWorkerList
          workers={submittedWorkers}
          onSubmit={handleSubmit}
          onUnenrich={handleUnenrich}
        />
      </TabsContent>
    </Tabs>
  );
}
