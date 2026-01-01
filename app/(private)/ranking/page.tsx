
import { raliAPI } from "@/lib/axios/rali-api";
import { AllGroupsProps } from "@/@types/groups/get-all-groups";
import { PodiumCard } from "@/components/Ranking/Podium/PodiumCard";
import { ListRanking } from "@/components/Ranking/RankingList/ListRanking";


const getAllGroups = async () => {
  const { data } = await raliAPI.get("/groups");
  return data as AllGroupsProps;
};

export default async function RankingPage() {
  const groups = await getAllGroups();

  const sortedGroups = groups.allGroups.sort((a, b) => b.points - a.points);

  const topThree = sortedGroups.slice(0, 3);

  const [first, second, third] = topThree;
  const podiumOrder = [second, first, third].filter(Boolean);
  const positions = [2, 1, 3];

  const remainingGroups = sortedGroups.slice(3);

  return (
    <div className="w-full max-w-2xl">
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
            <h3 className="text-white font-semibold mb-4 font-sans">
              Outros Grupos
            </h3>
            <div className="space-y-3">
              {remainingGroups.map((group, index) => (
                <ListRanking
                  key={group.id}
                  id={group.id}
                  image={group.image}
                  name={group.name}
                  points={group.points}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
  );
}
