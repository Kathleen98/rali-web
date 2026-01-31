import {
  SubmissionsProps
} from "@/@types/submissions/get-all-submissions";
import { SubmissionActions } from "@/components/Submissions/submission-actions";
import { Card } from "@/components/ui/card";
import { raliAPI } from "@/lib/axios/rali-api";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

const getAllSubmissions = async () => {
  const { data } = await raliAPI.get<SubmissionsProps>("/submissions");
  return data;
};

export default async function SubmissionsPage() {
  const allSubmissions = await getAllSubmissions();

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Desafios e Missões Enviadas
      </h1>
      <div className="">
        {allSubmissions.submissions.filter((sub) => sub.status === "PENDING").map((submission) => (
          <Card
            key={submission.id}
            className="p-3 gap-1 w-full bg-[#4a4f63] text-white "
          >
            <h2 className="text-xl font-semibold mb-2">
              {submission.flashMissionId
                ? `Missão: ${submission.title}`
                : `Desafio: ${submission.title}`}
            </h2>
            <p>
              Grupo:{" "}
              <span className="font-bold text-md">{submission.groupName}</span>
            </p>
            <p>
              Desafio Realizado por:{" "}
              <span className="font-bold text-md">{submission.memberName}</span>
            </p>
            <p>
              Enviado em:{" "}
              <span className="font-bold text-md">
                {formatDate(submission.submittedAt, "dd/MM/yyyy", {
                  locale: ptBR,
                })}{" "}
                às {formatDate(submission.submittedAt, "HH:mm")}
              </span>{" "}
            </p>
            <p>{submission.description}</p>
            <Image
              src={submission.photoUrl}
              width={500}
              height={600}
              alt="Foto de comprovação desafio"
            />
            <p>{submission.description}</p>
            <div className="flex gap-1 justify-end">
              <SubmissionActions  challengeId={submission.challengeId} flashMissionId={submission.flashMissionId} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
