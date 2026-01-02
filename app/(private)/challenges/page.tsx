import { ChallengesProps } from "@/@types/challenges/get-all-challenges";
import { FormDialog } from "@/components/Dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { raliAPI } from "@/lib/axios/rali-api";
import { Flame, Trophy, Users } from "lucide-react";

const GetAllChallenges = async () => {
  const { data } = await raliAPI.get("/challenge");

  return data as ChallengesProps;
};

export default async function ChallengesPage() {
  const [allChallenges] = await Promise.all([GetAllChallenges()]);
  return (
    <div className="w-full flex flex-col gap-3">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="bg-[#9E2221] w-full">
              Criar desafio <Flame className="w-5 h-5 mb-1" />{" "}
            </Button>
          </DialogTrigger>
        </form>
        <FormDialog />
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
                <Badge className="mb-2" style={{ backgroundColor: "#FF2B3D" }}>
                  {challenge.title}
                </Badge>
                <h2 className="text-3 font-bold">Descrição</h2>
                <p className="text-blue-100 text-sm  mt-1">
                  {challenge.description}
                </p>
              </div>
              <Trophy className="w-6 h-6 opacity-80" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-3">
                <Users className="w-5 h-5 mb-1" />
                <p className="text-xs text-blue-100">
                  Desafio ativo até 03/01/2026
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
