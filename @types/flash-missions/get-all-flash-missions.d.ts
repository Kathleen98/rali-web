export interface AllFlashMissionProps {
  allFlashMissions: AllFlashMission[];
}

export interface AllFlashMission {
  id: string;
  title: string;
  description: string;
  points: number;
  status: string;
  requiresPhoto: boolean;
  requiresText: boolean;
  deadline: string;
  rallyId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
}

export type FlashMissionProps = Pick<
  AllFlashMission,
  | "id"
  | "title"
  | "points"
  | "startDate"
  | "endDate"
  | "requiresPhoto"
  | "requiresText"
  | "startDate"
  | "endDate"
  | "description"
>;
