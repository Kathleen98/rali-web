export interface SubmissionsProps {
  submissions: Submission[]
}

export interface Submission {
  id: string
  description: string | null
  photoUrl: string
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED"
  feedback: string | null
  groupId: string
  memberId: string
  submittedById: string
  challengeId: string
  flashMissionId: string | null
  submittedAt: string
  reviewedAt: string
  updatedAt: string
  title: string
  memberName: string
  groupName: string
}