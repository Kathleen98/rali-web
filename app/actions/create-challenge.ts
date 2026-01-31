"use server";

import { RaliProps } from "@/@types/rali/get-rali";
import { raliAPI } from "@/lib/axios/rali-api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const GetraliActive = async () => {
  const { data } = await raliAPI.get('/rali');
  return data as RaliProps;
};

export async function handleCreateChallenge(formData: FormData) {
  const [raliActive] = await Promise.all([GetraliActive()]);
  const rali = raliActive.Allrali.filter((rali) => rali.status === 'ACTIVE')[0];

  try {
    const cookie = await cookies();
    const userInfosFromCookies = cookie.get('user_infos')?.value;
    const userInfos = userInfosFromCookies ? JSON.parse(userInfosFromCookies) : {};

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      points: Number(formData.get("points")),
      requiresPhoto: formData.get("requiresPhoto") === "true",
      requiresText: formData.get("requiresText") === "true",
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      rallyId: rali.id,
      createdById: userInfos.id,
      status: "ACTIVE",
    };

    console.log("📝 Dados recebidos:", data);

    if (!data.startDate || !data.endDate) {
      return { 
        success: false, 
        error: "Datas são obrigatórias" 
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await raliAPI.post("/challenge", data);

    revalidatePath("/challenges");

    return { 
      success: true, 
      message: "Desafio criado com sucesso!" 
    };
  } catch (error) {
    console.error("❌ Erro:", error);
    return { 
      success: false, 
      error: "Erro ao criar desafio. Tente novamente." 
    };
  }
}