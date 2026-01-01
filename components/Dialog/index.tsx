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

export const FormDialog = () => {
  return (
    <DialogContent className=" max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Criar novo desafio</DialogTitle>
        <DialogDescription>
          Preencha os campos com as informações do desafio que deseja criar.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="title">Título</Label>
          <Input id="title" name="title" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Descrição</Label>
          <Input id="description" name="description" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="points">Pontos</Label>
          <Input type="number" id="points" name="points" />
        </div>
        <div className="flex gap-3  items-center justify-between">
          <div className="grid gap-3">
            <Label htmlFor="requiresPhoto">Comprovar com foto</Label>
            <Switch id="requiresPhoto" name="requiresPhoto" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="requiresText">Comprovar texto</Label>
            <Switch id="requiresText" name="requiresText" />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="startDate">Data inicial</Label>
          <Input type="number" id="startDate" name="startDate" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="endDate">Data final</Label>
          <Input type="number" id="endDate" name="endDate" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="rallyId">Rali</Label>
          <Input type="number" id="rallyId" name="rallyId" />
        </div>
      </div>
      <DialogFooter>
        <div className="flex gap-3 ">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button className="flex-1" type="submit">
            Criar desafio
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};
