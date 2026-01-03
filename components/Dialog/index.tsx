"use client";
import { handleCreateChallenge } from "@/app/actions/create-challenge";
import { CalendarComponent } from "../Calendar";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { CreatedChallenges } from "@/@types/rali/get-rali";

export const FormDialog = ({ id, name }: CreatedChallenges) => {
  const [requiresPhoto, setRequiresPhoto] = useState(false);
  const [requiresText, setRequiresText] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <DialogContent className="max-h-[70vh] max-w-91.25 flex flex-col overflow-hidden">
      <DialogHeader className="shrink-0">
        <DialogTitle>Criar novo desafio</DialogTitle>
        <DialogDescription>
          Preencha os campos com as informações do desafio que deseja criar.
        </DialogDescription>
      </DialogHeader>

      <form action={handleCreateChallenge} className="flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* Área com scroll - IMPORTANTE: overflow-x-hidden */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-1">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" name="description" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="points">Pontos</Label>
              <Input type="number" id="points" name="points" required />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="requiresPhoto"
                  checked={requiresPhoto}
                  onCheckedChange={setRequiresPhoto}
                />
                <Label htmlFor="requiresPhoto" className="cursor-pointer">
                  Comprovar com foto
                </Label>
                <input
                  type="hidden"
                  name="requiresPhoto"
                  value={requiresPhoto.toString()}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="requiresText"
                  checked={requiresText}
                  onCheckedChange={setRequiresText}
                />
                <Label htmlFor="requiresText" className="cursor-pointer">
                  Comprovar texto
                </Label>
                <input
                  type="hidden"
                  name="requiresText"
                  value={requiresText.toString()}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <CalendarComponent
                calendarLabel="Data inicial"
                timerLabel="Horário"
                name="startDate"
                value={startDate}
                onChange={setStartDate}
              />
            </div>
            <div className="grid gap-2">
              <CalendarComponent
                calendarLabel="Data final"
                timerLabel="Horário"
                name="endDate"
                value={endDate}
                onChange={setEndDate}
              />
            </div>
            
            {/* Campo hidden para rallyId */}
            <input type="hidden" name="rallyId" value={id} />
          </div>
        </div>

        {/* Footer fixo */}
        <DialogFooter className="shrink-0 pt-4 border-t mt-4">
          <div className="flex gap-3 w-full">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="flex-1">
                Cancelar
              </Button>
            </DialogClose>
            <Button className="flex-1 bg-[#9E2221]" type="submit">
              Criar desafio
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};