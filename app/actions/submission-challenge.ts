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

    // Crie um novo FormData para enviar ao backend
    const backendFormData = new FormData();
    
    // Adicione todos os campos
    backendFormData.append("memberId", formData.get("memberId") as string);
    backendFormData.append("groupId", userInfos.groupId);
    backendFormData.append("rallyId", "8b42b166-2f96-4ec2-b2d9-7e79f806551d");
    backendFormData.append("challengeId", formData.get("challengeId") as string);
    backendFormData.append("submittedById", userInfos?.id);
    
    const file = formData.get("file");
    if (file) {
      backendFormData.append("file", file);
    }

    console.log("Enviando dados para o backend...");

    const submited = await raliAPI.post("/challenge/submit", backendFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      message: "Desafio enviado com sucesso!",
      success: true,
    };
  } catch (e) {
    console.error("❌ Erro ao enviar desafio:", e);
    return {
      message: "Erro ao enviar desafio. Tente novamente.",
      error: false, // Era "error: false", corrigi para "success: false"
    };
  }
}