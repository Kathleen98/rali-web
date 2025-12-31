import React from "react";
import { PodiumCard } from "../RankingList";
import { raliAPI } from "@/lib/axios/rali-api";
import { AllGroupsProps } from "@/@types/groups/get-all-groups";
import Image from "next/image";

const getAllGroups = async () => {
  const { data } = await raliAPI.get("/groups");
  return data as AllGroupsProps;
};

export default async function PodiumRanking() {
  const groups = await getAllGroups();

  // Ordena todos os grupos por pontos
  const sortedGroups = groups.allGroups.sort((a, b) => b.points - a.points);
  
  // Pega os 3 primeiros
  const topThree = sortedGroups.slice(0, 3);
  
  // Reorganiza para ordem do pódio: [2º, 1º, 3º]
  const [first, second, third] = topThree;
  const podiumOrder = [second, first, third].filter(Boolean);
  const positions = [2, 1, 3]; // Posições reais correspondentes
  
  // Pega os grupos restantes (do 4º em diante)
  const remainingGroups = sortedGroups.slice(3);

  return (
    <div className="min-h-screen mb-10 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl uppercase font-bold text-white text-center mb-12 ">
          Ranking 🏆
        </h1>

        {/* Pódio dos 3 primeiros */}
        <div className="flex items-end justify-center gap-8">
          {podiumOrder.map((group, index) => (
            <PodiumCard
              key={group.id}
              image={group.image}
              color={group.color}
              name={group.name}
              points={group.points}
              id={group.id}
              position={positions[index]} // Passa 2, 1, 3
            />
          ))}
        </div>

        {/* Lista de outros grupos (4º em diante) */}
        {remainingGroups.length > 0 && (
          <div className="mt-12 bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Outros Grupos</h3>
            <div className="space-y-3">
              {remainingGroups.map((group, index) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3 hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-medium w-6">
                      {index + 4}º
                    </span>
                    <div className="flex items-center gap-2">
                      <Image className="rounded-full" src={group.image} width={60} height={60} alt="logo dos grupos" />
                      <span className="text-white">{group.name}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{group.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}