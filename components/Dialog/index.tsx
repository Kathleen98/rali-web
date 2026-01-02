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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

export const FormDialog = () => {


  return (
    <form >
      <DialogContent className=" max-h-[70vh] overflow-y-auto">
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
            <CalendarComponent
              calendarLabel="Data incial"
              timerLabel="horário"
            />
          </div>
          <div className="grid gap-3">
            <CalendarComponent
              calendarLabel="Data final"
              timerLabel="horário"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="rallyId">Rali</Label>
            <Select>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Selecione o rali" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <div className="flex gap-3 ">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button className="flex-1 bg-[#9E2221]" type="submit">
              Criar desafio
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </form>
  );
};
