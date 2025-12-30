import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera, FileText, Calendar } from "lucide-react"
import { Challenge } from "@/@types/challenges/get-all-challenges"

export function ChallengesGrid({ id, status, points, endDate , requiresPhoto, description , requiresText ,title } : Challenge) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     <Card key={id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge variant={
                status === 'ACTIVE' ? 'default' : 
                status === 'COMPLETED' ? 'secondary' : 
                'outline'
              }>
                {status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
            
            <div className="flex gap-2 mt-4">
              {requiresPhoto && (
                <Badge variant="outline" className="gap-1">
                  <Camera className="w-3 h-3" />
                  Foto
                </Badge>
              )}
              {requiresText && (
                <Badge variant="outline" className="gap-1">
                  <FileText className="w-3 h-3" />
                  Texto
                </Badge>
              )}
            </div>

            {endDate && (
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Até {new Date(endDate).toLocaleDateString('pt-BR')}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <span className="text-2xl font-bold text-primary">
              {points} pts
            </span>
            <Button>Enviar Comprovação</Button>
          </CardFooter>
        </Card>
    </div>
  )
}