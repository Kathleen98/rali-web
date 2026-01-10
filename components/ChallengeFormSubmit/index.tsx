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

export const ChallengeFormSubmit = () => {
  const { userInfo } = useUser();
  const groupId = userInfo?.groupId;

  const {data: getAllMembers} = useQuery({
    queryKey: ["get-all-members", groupId],
    queryFn: () =>  getMembersAction(groupId!),
    enabled: !!groupId
  });

  console.log(getAllMembers)

  return (
    <DialogContent className="max-h-[70vh] max-w-91.25 flex flex-col overflow-hidden">
      <DialogHeader className="shrink-0">
        <DialogTitle>Enviar Desafio</DialogTitle>
        <DialogDescription>
          Preencha os campos com as informações que deseja enviar.
        </DialogDescription>
      </DialogHeader>

      <form
        // action={handleSubmit}
        // ref={formRef}
        className="flex flex-col flex-1 min-h-0 overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-1">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Nome do Desafio</Label>
              <p></p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <p></p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Membro que realizou o desafio</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o membro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Enviar foto</Label>
              <Input type="file" id="file" name="file" required />
            </div>

            <input type="hidden" name="rallyId" />
          </div>
        </div>

        <DialogFooter className="shrink-0 pt-4 border-t mt-4">
          <div className="flex gap-3 w-full">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="flex-1">
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
