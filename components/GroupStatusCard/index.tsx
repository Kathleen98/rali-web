import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { AllGroup } from "@/@types/groups/get-all-groups"
import { Trophy, Users, Flame } from "lucide-react"

export function GroupStatusCard({ color, coordinatorId, createdAt, description, id, name, points, rallyId, updatedAt, ranking }: AllGroup,) {
  return (
    <Card className="p-3 gap-1 w-full bg-[#F3A108] text-white">
      <div className="flex items-start justify-between">
        <div>
          <Badge className="mb-2" style={{ backgroundColor: color }}>
            {name}
          </Badge>
          <h2 className="text-3 font-bold">{points} pontos</h2>
          <p className="text-blue-100 mt-1">
            #{ranking}º lugar no ranking
          </p>
        </div>
        <Trophy className="w-6 h-6 opacity-80" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white/10 rounded-lg p-3">
          <Users className="w-5 h-5 mb-1" />
          <p className="text-xs text-blue-100">Membros</p>
          {/* <p className="text-xl font-semibold">{members.length}</p> */}
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <Flame className="w-5 h-5 mb-1" />
          <p className="text-xs text-blue-100">Próximo desafio</p>
          <p className="text-sm font-semibold">12h</p>
        </div>
      </div>
    </Card>
  )
}