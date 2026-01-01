import { AllGroup } from "@/@types/groups/get-all-groups";
import Image from "next/image";

interface ListRankingProps extends AllGroup{
    index : number
}

export const ListRanking = ({ id, image, name, points, index }: ListRankingProps) => {
  return (
    <div
      key={id}
      className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3 hover:bg-slate-700/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-400 font-medium w-6">{index + 4}º</span>
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src={image}
            width={60}
            height={60}
            alt="logo dos grupos"
          />
          <span className="text-white">{name}</span>
        </div>
      </div>
      <span className="text-gray-400 text-sm">{points} pts</span>
    </div>
  );
};
