"use server";

import { type changeStatusSubmission } from "@/@types/submissions/get-all-submissions";
import { raliAPI } from "@/lib/axios/rali-api";
import { revalidatePath } from "next/cache";

export async function changeStatusSubmission({
  challengeId,
  flashMissionId,
  status,
}: changeStatusSubmission) {
  await raliAPI.post("/submissions", {
    challengeId,
    flashMissionId,
    status,
  });

  if (status === "REJECTED") {
    return {
      message: challengeId ? `Desafio não aceito!` : `Missão não aceita`,
    };
  }

  if (status === "APPROVED") {
    return {
      message: challengeId
        ? `Desafio aceito com sucesso!`
        : `Missão aceita com sucesso!`,
    };
  }

  revalidatePath("/submissions");
}
