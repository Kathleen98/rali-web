// components/calendar-component.tsx
"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "../ui/input";

interface CalendarComponentProps {
  calendarLabel: string;
  timerLabel: string;
  name: string;
  value?: string; // ISO string
  onChange?: (value: string) => void;
}

export function CalendarComponent({
  calendarLabel,
  timerLabel,
  name,
  value = "",
  onChange,
}: CalendarComponentProps) {
  const [open, setOpen] = React.useState(false);
  
  // Extrai date e time do value (ISO string)
  const [date, setDate] = React.useState<Date | undefined>(() => {
    return value ? new Date(value) : undefined;
  });
  
  const [time, setTime] = React.useState<string>(() => {
    if (!value) return "10:30:00";
    const d = new Date(value);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  });

  // Atualiza quando date ou time mudam
  React.useEffect(() => {
    if (!date) {
      onChange?.("");
      return;
    }
    
    const [hours, minutes, seconds] = time.split(':');
    const combined = new Date(date);
    combined.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds || '0'));
    
    onChange?.(combined.toISOString());
  }, [date, time, onChange]);

  return (
    <>
      <input type="hidden" name={name} value={value} />
      
      <div className="flex justify-between ">
        <div className="flex flex-col gap-3">
          <Label htmlFor={`${name}-date`} className="px-1">
            {calendarLabel}
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={`${name}-date`}
                type="button"
                className="w-auto justify-between font-normal"
              >
                {date ? date.toLocaleDateString('pt-BR') : "Selecione uma data"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor={`${name}-time`} className="px-1">
            {timerLabel}
          </Label>
          <Input
            type="time"
            id={`${name}-time`}
            step="1"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-background"
          />
        </div>
      </div>
    </>
  );
}