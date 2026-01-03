import { ChallengesProps } from "@/@types/challenges/get-all-challenges";
import { RaliProps } from "@/@types/rali/get-rali";
import { ChallengeForm } from "@/components/ChallengeForm";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { raliAPI } from "@/lib/axios/rali-api";
import { format } from "date-fns";
import { Flame, Trophy, Users } from "lucide-react";

const GetAllChallenges = async () => {
  const { data } = await raliAPI.get("/challenge");

  return data as ChallengesProps;
};

const GetraliActive = async () => {
  const { data } = await raliAPI.get("/rali");

  return data as RaliProps;
};

export default async function ChallengesPage() {
  const [allChallenges, raliActive] = await Promise.all([
    GetAllChallenges(),
    GetraliActive(),
  ]);

  const rali = raliActive.Allrali.filter((rali) => rali.status === "ACTIVE")[0];

  return (
    <div className="w-full flex flex-col gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#9E2221] w-full">
            Criar desafio <Flame className="w-5 h-5 mb-1" />{" "}
          </Button>
        </DialogTrigger>
        <div className="w-[80vw]">
          <ChallengeForm id={rali.id} name={rali.name} />
        </div>
      </Dialog>

      {allChallenges.challenges
        .filter((chall) => chall.status === "ACTIVE")
        .map((challenge, index) => (
          <Card
            key={challenge.id}
            className={`p-3 gap-1 w-full bg-[#4a4f63] text-white ${
              index === 0 ? "mt-0" : "mt-5"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-2 text-lg font-bold ">{challenge.title}</p>

                <h2 className="text-3 text-sm font-bold">Descrição</h2>
                <p className=" text-sm  mt-1">
                  {challenge.description}
                </p>
              </div>
              <Trophy className="w-6 h-6 opacity-80" />
            </div>

            <p className="text-blue-100 text-xs">
              - Criado em{" "}
              {challenge.createdAt
                ? format(challenge.createdAt, "dd/MM/yyyy 'às' HH:mm")
                : null}
            </p>
            <p className="text-blue-100 text-xs ">
              - Início em{" "}
              {challenge.startDate
                ? format(challenge.startDate, "dd/MM/yyyy 'às' HH:mm")
                : null}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-3">
                <Users className="w-5 h-5 mb-1" />
                <p className="text-xs text-blue-100">
                  Desafio ativo até{" "}
                  {format(challenge.endDate as string, "dd/MM/yyyy 'às' HH:mm")}
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <Flame className="w-5 h-5 mb-1" />
                <p className="text-xs text-blue-100">Pontos</p>
                <p className="text-sm font-semibold">{challenge.points}</p>
              </div>
            </div>
            <Button className="mt-3">Enviar desafio</Button>
          </Card>
        ))}
    </div>
  );
}
