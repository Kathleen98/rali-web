import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Clock, Zap } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { AllFlashMissionProps } from "@/@types/flash-missions/get-all-flash-missions"


export const FlashMissionsAlert = ({allFlashMissions } : AllFlashMissionProps) => {
  return(
    <Alert className="border-amber-500 bg-amber-50">
      <Zap className="h-5 w-5 text-amber-600" />
      <AlertTitle className="text-amber-900 font-bold">
        {allFlashMissions.length} Missão(ões) Relâmpago Ativa(s)!
      </AlertTitle>
      <AlertDescription>
        <div className="space-y-3 mt-3">
          {allFlashMissions.map((mission) => (
            <div key={mission.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-amber-900">{mission.title}</p>
                <p className="text-sm text-amber-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Termina {formatDistanceToNow(new Date(mission.deadline), { 
                    addSuffix: true, 
                    locale: ptBR 
                  })}
                </p>
              </div>
              <Button size="sm" variant="default" className="bg-amber-600">
                {mission.points} pts
              </Button>
            </div>
          ))}
        </div>
      </AlertDescription>
    </Alert>
  )
}