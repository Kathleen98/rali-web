export interface SubmissionsProps {
  submissions: Submission[]
}

export interface Submission {
  id: string
  description: string | null
  photoUrl: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "REVISION"
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

export type changeStatusSubmission = Pick<Submission, "status"> & 
  Partial<Pick<Submission, "flashMissionId" | "challengeId">>

export type findStatusChange = Partial<Pick<Submission, "flashMissionId" | "challengeId">>