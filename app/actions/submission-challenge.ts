"use server";

import { raliAPI } from "@/lib/axios/rali-api";
import { cookies } from "next/headers";

export async function submissionChallegeAction(formData: FormData) {
  try {
    const cookie = await cookies();
    const userInfosFromCookies = cookie.get("user_infos")?.value;

    const userInfos = userInfosFromCookies
      ? JSON.parse(userInfosFromCookies)
      : {};

    const data = {
      memberId: formData.get("memberId"),
      groupId: userInfos.groupId,
      fileChallenge: formData.get("fileChallenge"),
      rallyId: "8b42b166-2f96-4ec2-b2d9-7e79f806551d",
      challengeId: formData.get("challengeId"),
      submittedBy: userInfos?.id,
    };

    console.log(data)

    const submited = await raliAPI.post("/challenge/submit", data);

    return {
      message: "Desafio enviado com sucesso!",
      success: true,
    };
  } catch (e) {
    console.error("❌ Erro ao enviar desafio:", e);
    return {
      message: "Erro ao enviar desafio. Tente novamente.",
      error: false,
    };
  }
}
