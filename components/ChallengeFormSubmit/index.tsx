"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useQuery } from "@tanstack/react-query";
import { getMembersAction } from "@/app/actions/get-all-members";
import { useUser } from "@/contexts/UserInfoContext";
import { submissionChallegeAction } from "@/app/actions/submission-challenge";
import { toast } from "sonner";
import { useRef, useState } from "react";

interface ChallengeFormSubmitProps{
  title: string,
  description: string,
  challengeId: string
}

export const ChallengeFormSubmit = ({title, description, challengeId} : ChallengeFormSubmitProps) => {
  const { userInfo } = useUser();
  const groupId = userInfo?.groupId;
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: getAllMembers } = useQuery({
    queryKey: ["get-all-members", groupId],
    queryFn: () => getMembersAction(groupId!),
    enabled: !!groupId,
  });

  const allmembers = getAllMembers?.members;

  const handleSubmit = async (formData: FormData) =>{
     const resetForm = () => {
      formRef.current?.reset();
      
    };

    setIsSubmitting(true);

    try {
      const result = await submissionChallegeAction(formData);

      if (result.success) {
        toast.success("✅ Sucesso!", {
          description: result.message,
        });
        resetForm();
         closeButtonRef.current?.click();
      } else {
        toast.error("❌ Erro", {
          description: result.error,
        });
      }
    } catch (error) {
      toast.error("❌ Erro", {
        description: "Erro inesperado ao criar desafio",
      });
      console.error(error)
    } 
  }

  return (
    <DialogContent className="max-h-[70vh] max-w-91.25 flex flex-col overflow-hidden">
      <DialogHeader className="shrink-0">
        <DialogTitle>Enviar Desafio</DialogTitle>
        <DialogDescription>
          Preencha os campos com as informações que deseja enviar.
        </DialogDescription>
      </DialogHeader>

      <form
      ref={formRef}
      action={handleSubmit}
        // action={handleSubmit}
        // ref={formRef}
        className="flex flex-col flex-1 min-h-0 overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-1">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Nome do Desafio</Label>
              <p>{title}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <p>{description}</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Membro que realizou o desafio</Label>
              <Select disabled={isSubmitting} name="memberId" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o membro" />
                </SelectTrigger>
                <SelectContent>
                  {allmembers?.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Enviar foto</Label>
              <Input disabled={isSubmitting} type="file" id="file" name="file" required />
            </div>

            <Input className="hidden" name={'challengeId'} value={challengeId} />

          </div>
        </div>

        <DialogFooter className="shrink-0 pt-4 border-t mt-4">
          <div className="flex gap-3 w-full">
            <DialogClose asChild>
              <Button ref={closeButtonRef} variant="outline" type="button" className="flex-1">
                Cancelar
              </Button>
            </DialogClose>
            <Button className="flex-1 bg-[#9E2221]" type="submit">
              Enviar Desafio
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
