"use client";

import { useState } from "react";
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Dados de exemplo das mentorias
const mentoriasData: any = {
  "2024-01-15": [
    {
      id: 1,
      titulo: "Introdução ao React Hooks",
      tipo: "Sessão de Mentoria",
      hora: "14:00",
      duracao: 60,
      mentor: "João Silva",
      status: "Confirmado",
    },
    {
      id: 2,
      titulo: "Revisão de Código React",
      tipo: "Sessão de Mentoria",
      hora: "16:00",
      duracao: 45,
      mentor: "João Silva",
      status: "Confirmado",
    },
  ],
  "2024-01-16": [
    {
      id: 3,
      titulo: "APIs REST com Express",
      tipo: "Sessão de Mentoria",
      hora: "16:30",
      duracao: 90,
      mentor: "Maria Santos",
      status: "Confirmado",
    },
  ],
  "2024-01-17": [
    {
      id: 4,
      titulo: "Reunião de Planejamento",
      tipo: "Reunião",
      hora: "09:00",
      duracao: 30,
      mentor: "Equipe",
      status: "Pendente",
    },
  ],
  "2024-01-18": [],
  "2024-01-19": [],
  "2024-01-20": [],
  "2024-01-22": [
    {
      id: 5,
      titulo: "Carreira em Tech",
      tipo: "Sessão de Mentoria",
      hora: "15:00",
      duracao: 60,
      mentor: "Pedro Costa",
      status: "Confirmado",
    },
  ],
};

// Datas disponíveis para agendamento (sem mentorias marcadas)
const datasDisponiveis = [
  "2024-01-18",
  "2024-01-19",
  "2024-01-20",
  "2024-01-23",
  "2024-01-24",
  "2024-01-25",
  "2024-01-26",
  "2024-01-29",
  "2024-01-30",
  "2024-01-31",
];

function CustomCalendar({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0, 1)); // Janeiro 2024

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

  const getDayIndicators = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dateKey = formatDateKey(date);

    const hasMentorias =
      mentoriasData[dateKey] && mentoriasData[dateKey].length > 0;
    const isAvailable = datasDisponiveis.includes(dateKey);

    return { hasMentorias, isAvailable };
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
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Com mentorias</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Disponível</span>
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
          {/* Espaços vazios para o início do mês */}
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="p-2"></div>
          ))}

          {/* Dias do mês */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const { hasMentorias, isAvailable } = getDayIndicators(day);

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

                  {/* Indicadores */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {hasMentorias && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    {isAvailable && !hasMentorias && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 15)); // 15 de Janeiro

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const selectedDateKey = formatDateKey(selectedDate);
  const mentoriasDodia = mentoriasData[selectedDateKey] || [];
  const isAvailableDay = datasDisponiveis.includes(selectedDateKey);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie seus compromissos
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendário */}
        <CustomCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        {/* Lista de mentorias do dia */}
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
              {mentoriasDodia.length > 0
                ? `${mentoriasDodia.length} evento(s) agendado(s)`
                : isAvailableDay
                ? "Dia disponível para agendamentos"
                : "Nenhum evento agendado"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mentoriasDodia.length > 0 ? (
              <div className="space-y-4">
                {mentoriasDodia.map((evento: any) => (
                  <div key={evento.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{evento.titulo}</h3>
                      <Badge
                        variant={
                          evento.status === "Confirmado"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {evento.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {evento.hora} ({evento.duracao} min)
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {evento.tipo} • {evento.mentor}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        Acessar
                      </Button>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : isAvailableDay ? (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Dia disponível</h3>
                <p className="text-muted-foreground mb-4">
                  Este dia está disponível para novos agendamentos
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Agendar Mentoria
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum evento</h3>
                <p className="text-muted-foreground">
                  Não há eventos agendados para este dia
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
