"use client";

import type React from "react";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

// Tipos para disponibilidade
interface DisponibilidadeSlot {
  id: string;
  horaInicio: string;
  horaFim: string;
  titulo?: string;
  descricao?: string;
  recorrencia?: {
    tipo: "diaria" | "semanal" | "mensal";
    diasSemana?: number[]; // 0 = domingo, 1 = segunda, etc.
    intervalo?: number; // a cada X semanas/meses
    dataFim?: string;
  };
}

// Dados de exemplo de disponibilidade
const disponibilidadeData: Record<string, DisponibilidadeSlot[]> = {
  "2024-01-15": [
    {
      id: "1",
      horaInicio: "09:00",
      horaFim: "10:00",
      titulo: "Mentoria React",
      descricao: "Disponível para mentorias de React e Frontend",
    },
    {
      id: "2",
      horaInicio: "14:00",
      horaFim: "15:00",
      titulo: "Mentoria Geral",
      descricao: "Disponível para qualquer tipo de mentoria",
    },
    {
      id: "3",
      horaInicio: "16:00",
      horaFim: "17:00",
      titulo: "Mentoria Backend",
      descricao: "Foco em Node.js e APIs",
    },
  ],
  "2024-01-16": [
    {
      id: "4",
      horaInicio: "10:00",
      horaFim: "11:00",
      titulo: "Mentoria React",
      descricao: "Disponível para mentorias de React e Frontend",
    },
    {
      id: "5",
      horaInicio: "15:00",
      horaFim: "16:00",
      titulo: "Mentoria Geral",
      descricao: "Disponível para qualquer tipo de mentoria",
    },
  ],
  "2024-01-17": [
    {
      id: "6",
      horaInicio: "09:00",
      horaFim: "10:00",
      titulo: "Mentoria React",
      descricao: "Disponível para mentorias de React e Frontend",
    },
    {
      id: "7",
      horaInicio: "11:00",
      horaFim: "12:00",
      titulo: "Mentoria Carreira",
      descricao: "Orientação de carreira em tecnologia",
    },
  ],
  "2024-01-18": [
    {
      id: "8",
      horaInicio: "14:00",
      horaFim: "15:00",
      titulo: "Mentoria Backend",
      descricao: "Foco em Node.js e APIs",
    },
  ],
};

function DisponibilidadeCalendar({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0, 1));

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const today = new Date();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const hasDisponibilidade = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dateKey = formatDateKey(date);
    return (
      disponibilidadeData[dateKey] && disponibilidadeData[dateKey].length > 0
    );
  };

  const isSelected = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return formatDateKey(date) === formatDateKey(selectedDate);
  };

  const isToday = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return formatDateKey(date) === formatDateKey(today);
  };

  const handleDateClick = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onDateSelect(date);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </CardTitle>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Com disponibilidade</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="p-2"></div>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const hasSlots = hasDisponibilidade(day);

            return (
              <div key={day} className="relative">
                <button
                  onClick={() => handleDateClick(day)}
                  className={`
                    w-full p-2 text-sm rounded-md transition-colors relative
                    ${
                      isSelected(day)
                        ? "bg-primary text-primary-foreground"
                        : isToday(day)
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                  `}
                >
                  {day}
                  {hasSlots && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function NovaDisponibilidadeDialog({ selectedDate }: { selectedDate: Date }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    horaInicio: "",
    horaFim: "",
    recorrencia: {
      tipo: "unica" as "unica" | "diaria" | "semanal" | "mensal",
      diasSemana: [] as number[],
      intervalo: 1,
      dataFim: "",
    },
  });

  const diasSemanaOptions = [
    { value: 0, label: "Domingo" },
    { value: 1, label: "Segunda-feira" },
    { value: 2, label: "Terça-feira" },
    { value: 3, label: "Quarta-feira" },
    { value: 4, label: "Quinta-feira" },
    { value: 5, label: "Sexta-feira" },
    { value: 6, label: "Sábado" },
  ];

  const handleDiaSemanaChange = (dia: number, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      recorrencia: {
        ...prev.recorrencia,
        diasSemana: checked
          ? [...prev.recorrencia.diasSemana, dia]
          : prev.recorrencia.diasSemana.filter((d) => d !== dia),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    // Aqui você implementaria a lógica para salvar a disponibilidade
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Disponibilidade
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Disponibilidade</DialogTitle>
          <DialogDescription>
            Defina seus horários disponíveis para{" "}
            {selectedDate.toLocaleDateString("pt-BR")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, titulo: e.target.value }))
                }
                placeholder="Ex: Mentoria React"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo-recorrencia">Tipo de Recorrência</Label>
              <Select
                value={formData.recorrencia.tipo}
                onValueChange={(value: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    recorrencia: { ...prev.recorrencia, tipo: value },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unica">Única vez</SelectItem>
                  <SelectItem value="diaria">Diária</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, descricao: e.target.value }))
              }
              placeholder="Descreva o tipo de mentoria disponível..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hora-inicio">Hora de Início</Label>
              <Input
                id="hora-inicio"
                type="time"
                value={formData.horaInicio}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    horaInicio: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hora-fim">Hora de Fim</Label>
              <Input
                id="hora-fim"
                type="time"
                value={formData.horaFim}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, horaFim: e.target.value }))
                }
                required
              />
            </div>
          </div>

          {formData.recorrencia.tipo === "semanal" && (
            <div className="space-y-2">
              <Label>Dias da Semana</Label>
              <div className="grid grid-cols-2 gap-2">
                {diasSemanaOptions.map((dia) => (
                  <div key={dia.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dia-${dia.value}`}
                      checked={formData.recorrencia.diasSemana.includes(
                        dia.value
                      )}
                      onCheckedChange={(checked) =>
                        handleDiaSemanaChange(dia.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`dia-${dia.value}`} className="text-sm">
                      {dia.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(formData.recorrencia.tipo === "semanal" ||
            formData.recorrencia.tipo === "mensal") && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="intervalo">
                  Repetir a cada{" "}
                  {formData.recorrencia.tipo === "semanal"
                    ? "semana(s)"
                    : "mês(es)"}
                </Label>
                <Input
                  id="intervalo"
                  type="number"
                  min="1"
                  value={formData.recorrencia.intervalo}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      recorrencia: {
                        ...prev.recorrencia,
                        intervalo: Number.parseInt(e.target.value),
                      },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data-fim">Data de Fim (opcional)</Label>
                <Input
                  id="data-fim"
                  type="date"
                  value={formData.recorrencia.dataFim}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      recorrencia: {
                        ...prev.recorrencia,
                        dataFim: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Criar Disponibilidade</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function DisponibilidadePage() {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 15));

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const selectedDateKey = formatDateKey(selectedDate);
  const slotsDodia = disponibilidadeData[selectedDateKey] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Disponibilidade</h1>
          <p className="text-muted-foreground">
            Gerencie seus horários disponíveis para mentorias
          </p>
        </div>
        <NovaDisponibilidadeDialog selectedDate={selectedDate} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendário */}
        <DisponibilidadeCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        {/* Lista de disponibilidade do dia */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate.toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
            <CardDescription>
              {slotsDodia.length > 0
                ? `${slotsDodia.length} horário(s) disponível(is)`
                : "Nenhum horário disponível"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {slotsDodia.length > 0 ? (
              <div className="space-y-4">
                {slotsDodia.map((slot) => (
                  <div key={slot.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{slot.titulo}</h3>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {slot.horaInicio} - {slot.horaFim}
                      </div>
                      {slot.descricao && <p>{slot.descricao}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Nenhum horário disponível
                </h3>
                <p className="text-muted-foreground mb-4">
                  Crie novos horários disponíveis para este dia
                </p>
                <NovaDisponibilidadeDialog selectedDate={selectedDate} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resumo de recorrências ativas */}
      <Card>
        <CardHeader>
          <CardTitle>Recorrências Ativas</CardTitle>
          <CardDescription>
            Padrões de disponibilidade configurados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Mentoria React - Seg, Qua, Sex</h4>
                <p className="text-sm text-muted-foreground">
                  09:00 - 10:00 • Semanal
                </p>
              </div>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Mentoria Geral - Ter, Qui</h4>
                <p className="text-sm text-muted-foreground">
                  14:00 - 15:00 • Semanal
                </p>
              </div>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
