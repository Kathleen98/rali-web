import { Crown } from "lucide-react";
import { AllGroup } from "@/@types/groups/get-all-groups";
import Image from "next/image";

interface PodiumCardProps extends AllGroup {
  position: number; // 1, 2 ou 3
}

export const PodiumCard = ({ image, color, name, points, position }: PodiumCardProps) => {
  
  const podiumConfig = {
    1: { 
      height: 'h-40', 
      medal: 'bg-yellow-400 border-yellow-500',
      medalIcon: 'text-yellow-900 fill-yellow-900',
      label: '1º'
    },
    2: { 
      height: 'h-36', 
      medal: 'bg-gray-300 border-gray-400',
      medalIcon: 'text-gray-700 fill-gray-700',
      label: '2º'
    },
    3: { 
      height: 'h-28', 
      medal: 'bg-amber-600 border-amber-700',
      medalIcon: 'text-amber-900 fill-amber-900',
      label: '3º'
    }
  };

  const config = podiumConfig[position as keyof typeof podiumConfig];

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar com formato de losango */}
      <div className="relative">
        <div 
          className="relative w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0   flex items-center justify-center">
            <Image 
              width={120} 
              height={120} 
              src={image} 
              alt={name}
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Coroa apenas para 1º lugar */}
        {position === 1 && (
          <div className="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-2 shadow-lg border-2 border-yellow-500 animate-pulse">
            <Crown className="w-5 h-5 text-yellow-900 fill-yellow-900" />
          </div>
        )}
      </div>

      {/* Nome e Pontuação */}
      <div className="text-center">
        <div className="text-white font-bold text-base">{name}</div>
        <div className="text-gray-300 text-sm font-semibold">{points} pts</div>
      </div>

      {/* Base do pódio com altura variável */}
      <div 
        className={`w-25 ${config.height} rounded-t-2xl border-t-4 flex flex-col items-center justify-start pt-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg`}
        style={{ 
          backgroundColor: color,
          borderTopColor: color,
          filter: 'brightness(0.85)'
        }}
      >
        {/* Medalha */}
        <div className={`${config.medal} rounded-full p-2 mb-2 border-2 shadow-md`}>
          <Crown className={`w-6 h-6 ${config.medalIcon}`} />
        </div>
        
        {/* Posição */}
        <div className="text-3xl font-black text-white drop-shadow-lg">
          {config.label}
        </div>
      </div>
    </div>
  );
};