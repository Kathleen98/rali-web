/* eslint-disable @typescript-eslint/no-unused-vars */

import { ChallengesGrid } from "@/components/ChallengesGrid";
import { FlashMissionsAlert } from "@/components/FlashMissionsAlert";
import { GroupStatusCard } from "@/components/GroupStatusCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { raliAPI } from "@/lib/axios/rali-api";
import { ChallengesProps } from "@/@types/challenges/get-all-challenges";
import { AllFlashMissionProps } from "@/@types/flash-missions/get-all-flash-missions";
import { AllGroupsProps } from "@/@types/groups/get-all-groups";
import { RaliProps } from "@/@types/rali/get-rali";


const getRali = async () => {
  const { data } = await raliAPI.get('/rali')

  return data as RaliProps
}

const getAllGroups = async () => {
  const { data } = await raliAPI.get('/groups')

  return data as AllGroupsProps
}

const getFlashMissions = async () => {
  const { data } = await raliAPI.get('/flash-missions')

  return data as AllFlashMissionProps
}

const getAllChallenges = async () => {
  const { data } = await raliAPI.get('/challenge')

  return data as ChallengesProps
}

export default async function Home() {
  const [ralis, groups, flashMissions, challenges] = await Promise.all([
    getRali(),
    getAllGroups(),
    getFlashMissions(),
    getAllChallenges()
  ])

  return (

    <div className="flex flex-col gap -2 w-full min-h-screen bg-[#141a2f] justify-center p-6 ">
      <div className="w-full flex flex-col gap-2">
      
      </div>

      <div className="mt-2">
        <FlashMissionsAlert allFlashMissions={flashMissions.allFlashMissions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Ativos </TabsTrigger>
              <TabsTrigger value="pending">Aguardando </TabsTrigger>
              <TabsTrigger value="completed">Concluídos </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              {challenges.challenges.filter((challe) => challe.status === 'ACTIVE').map((challenge) => (
                <ChallengesGrid
                  id={challenge.id}
                  description={challenge.description}
                  endDate={challenge.endDate}
                  points={challenge.points}
                  requiresPhoto={challenge.requiresPhoto}
                  requiresText={challenge.requiresText}
                  status={challenge.status}
                  title={challenge.title}
                  key={challenge.id}

                />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              {challenges.challenges.filter((challe) => challe.status === 'PENDING').map((challenge) => (
                <ChallengesGrid
                  id={challenge.id}
                  description={challenge.description}
                  endDate={challenge.endDate}
                  points={challenge.points}
                  requiresPhoto={challenge.requiresPhoto}
                  requiresText={challenge.requiresText}
                  status={challenge.status}
                  title={challenge.title}
                  key={challenge.id}

                />
              ))}
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              {challenges.challenges.filter((challe) => challe.status === 'COMPLETED').map((challenge) => (
                <ChallengesGrid
                  id={challenge.id}
                  description={challenge.description}
                  endDate={challenge.endDate}
                  points={challenge.points}
                  requiresPhoto={challenge.requiresPhoto}
                  requiresText={challenge.requiresText}
                  status={challenge.status}
                  title={challenge.title}
                  key={challenge.id}

                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
