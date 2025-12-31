import { Crown } from "lucide-react";
import { AllGroup } from "@/@types/groups/get-all-groups";
import Image from "next/image";

interface PodiumCardProps extends AllGroup {
  position: number; // 1, 2 ou 3
}

export const PodiumCard = ({ image, color, name, points, position }: PodiumCardProps) => {
  
  const podiumConfig = {
    1: { 
      height: 'h-26', 
      medal: 'bg-yellow-400 border-yellow-500',
      medalIcon: 'text-yellow-900 fill-yellow-900',
      label: '1º'
    },
    2: { 
      height: 'h-24', 
      medal: 'bg-gray-300 border-gray-400',
      medalIcon: 'text-gray-700 fill-gray-700',
      label: '2º'
    },
    3: { 
      height: 'h-22', 
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
          className="relative w-16 h-16 rounded-full border-2 border-white shadow-xl overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0   flex items-center justify-center">
            <Image 
              width={100} 
              height={100} 
              src={image} 
              alt={name}
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Coroa apenas para 1º lugar */}
        {position === 1 && (
          <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 shadow-lg border-2 border-yellow-500 animate-pulse">
            <Crown className="w-3 h-3 text-yellow-900 fill-yellow-900" />
          </div>
        )}
      </div>

      {/* Nome e Pontuação */}
      <div className="text-center">
        <div className="font-sans font-bold text-base">{name}</div>
        <div className="text-gray-500 text-sm font-semibold">{points} pts</div>
      </div>

      {/* Base do pódio com altura variável */}
      <div 
        className={`w-23 ${config.height} rounded-t-2xl border-t-4 border-l border-r flex flex-col items-center justify-start pt-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg`}
        style={{ 
          // backgroundColor: color,
          borderTopColor: color,
          borderLeftColor: color,
          borderRightColor: color,
          filter: 'brightness(0.85)'
        }}
      >
        {/* Medalha */}
        <div className={`${config.medal} rounded-full p-1 mb-2 border-2 shadow-md`}>
          <Crown className={`w-3 h-3 ${config.medalIcon}`} />
        </div>
        
        {/* Posição */}
        <div className="text-2xl font-bold drop-shadow-lg">
          {config.label}
        </div>
      </div>
    </div>
  );
};