import { AllFlashMissionProps } from "@/@types/flash-missions/get-all-flash-missions";
import { FlashMissionsAlert } from "@/components/FlashMissionsAlert";
import { Button } from "@/components/ui/button";
import { raliAPI } from "@/lib/axios/rali-api";
import { Zap } from "lucide-react";

const getAllFlashMission = async () => {
  const { data } = await raliAPI.get("/flash-missions");
  return data as AllFlashMissionProps;
};

export default async function FlashMissionPage() {
  const [getFlashMissins] = await Promise.all([getAllFlashMission()]);

  return (
    <div className="flex flex-col gap-3">
      <Button className="bg-[#9E2221] w-full">
        Criar Missão <Zap className="w-5 h-5 mb-1" />{" "}
      </Button>
      {getFlashMissins?.allFlashMissions.map((flashMission) => (
        <FlashMissionsAlert
          endDate={flashMission.endDate}
          startDate={flashMission.startDate}
          id={flashMission.id}
          points={flashMission.points}
          requiresPhoto={flashMission.requiresPhoto}
          requiresText={flashMission.requiresText}
          title={flashMission.title}
          key={flashMission.id}
          description={flashMission.description}
        />
      ))}
    </div>
  );
}
