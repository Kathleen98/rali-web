'use client'
import { changeStatusSubmission } from "@/app/actions/submission-change-status";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { findStatusChange } from "@/@types/submissions/get-all-submissions";

export function SubmissionActions({
  challengeId,
  flashMissionId,
}: 
  findStatusChange
) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      await changeStatusSubmission({
        status,
        challengeId,
        flashMissionId,
      });
    });
  };

  return (
    <div className="flex gap-1 justify-end">
      <Button
        onClick={() => handleStatusChange("REJECTED")}
        disabled={isPending}
      >
        Não aceito
      </Button>
      <Button
        onClick={() => handleStatusChange("APPROVED")}
        disabled={isPending}
      >
        Aceito
      </Button>
    </div>
  );
}
