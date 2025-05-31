"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Plus, Calendar, Users, UserPlus, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useServerData from "@/hooks/useServerData";
import { getUserMentorships } from "@/actions/user-mentorships";
import LoadingComponent from "@/components/app/loading-logo";

interface Mentoria {
  id: number;
  status: "pending" | "confirmed" | "in progress" | "done" | "cancelled";
  mentorship: {
    id: number;
    title: string;
    mentorship_id: string;
    category: string;
    price: number | null;
    type: "group" | "single";
    description: string;
    min_participants: number;
    max_participants: number;
    current_participants: number;
    start_date: string; // ISO date string
    end_date: string; // ISO date string
    duration: number; // in hours
    next_session?: string; // ISO date string
    tags: string[];
    date: string; // ISO date string
    time: string; // HH:mm format
  };
  user: {
    id: number;
    name: string;
    email: string;
  };
}

function NewMentorshipDialog() {
  const [open, setOpen] = useState(false);
  const [type, setTipo] = useState<"group" | "single">("group");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    min_participants: 5,
    max_participants: 15,
    price: 0,
    duration: 10,
    start_date: "",
    end_date: "",
    type: "group",
  });

  useEffect(() => {
    if (type === "single") {
      setFormData((prev) => ({
        ...prev,
        min_participants: 1,
        max_participants: 1,
        price: 50 * formData.duration,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        min_participants: 5,
        max_participants: 15,
        price: 0,
      }));
    }
  }, [type, formData.duration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Mentoria
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Mentoria</DialogTitle>
          <DialogDescription>
            Preencha as informações da nova mentoria
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Fullstack">Fullstack</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Carreira">Carreira</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Mentoria</Label>
            <RadioGroup
              defaultValue={type}
              onValueChange={(value) => {
                setTipo(value as "group" | "single");
                setFormData((prev) => ({
                  ...prev,
                  type: value as "group" | "single",
                }));
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="group" id="group" />
                <Label htmlFor="group">Grupo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single">Individual</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-participantes">Mínimo de Participantes</Label>
              <Input
                id="min-participantes"
                type="number"
                min="1"
                value={formData.min_participants}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    min_participants: Number.parseInt(e.target.value),
                  }))
                }
                required
                disabled={type === "single"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-participantes">Máximo de Participantes</Label>
              <Input
                id="max-participantes"
                type="number"
                min="1"
                value={formData.max_participants}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    max_participants: Number.parseInt(e.target.value),
                  }))
                }
                required
                disabled={type === "single"}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: Number.parseFloat(e.target.value),
                  }))
                }
                disabled={type === "group"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duração (horas)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => {
                  const duration = Number.parseInt(e.target.value);
                  setFormData((prev) => ({ ...prev, duration: duration }));
                }}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data-inicio">Data de Início</Label>
              <Input
                id="data-inicio"
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    start_date: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="data-fim">Data de Fim</Label>
              <Input
                id="data-fim"
                type="date"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, end_date: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Criar Mentoria</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function MentorshipDetailsDialog({
  user_mentorship,
}: {
  user_mentorship: Mentoria;
}) {
  const [open, setOpen] = useState(false);

  const progressoParticipantes =
    (user_mentorship.mentorship.current_participants /
      user_mentorship.mentorship.max_participants) *
    100;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{user_mentorship.mentorship.title}</DialogTitle>
          <DialogDescription>
            Informações detalhadas da mentoria
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Mentor</Label>
              <p className="text-sm text-muted-foreground">
                {user_mentorship.user.name}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Badge
                variant={
                  user_mentorship.status === "confirmed"
                    ? "default"
                    : user_mentorship.status === "pending"
                    ? "secondary"
                    : user_mentorship.status === "in progress"
                    ? "destructive"
                    : "outline"
                }
              >
                {getStatus(user_mentorship.status)}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium">Preço</Label>
              <p className="text-sm text-muted-foreground">Gratuita</p>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Descrição</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {user_mentorship.mentorship.description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Participantes</Label>
              <span className="text-sm text-muted-foreground">
                {user_mentorship.mentorship.current_participants} /{" "}
                {user_mentorship.mentorship.max_participants}
              </span>
            </div>

            <Progress value={progressoParticipantes} className="h-2" />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mínimo: {user_mentorship.mentorship.min_participants}</span>
              <span>Máximo: {user_mentorship.mentorship.max_participants}</span>
            </div>

            {user_mentorship.mentorship.current_participants <
              user_mentorship.mentorship.min_participants && (
              <p className="text-xs text-amber-600">
                Faltam{" "}
                {user_mentorship.mentorship.min_participants -
                  user_mentorship.mentorship.current_participants}{" "}
                participantes para confirmar a mentoria
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Data</Label>
              <p className="text-sm text-muted-foreground">
                {new Date(user_mentorship.mentorship.date).toLocaleDateString(
                  "pt-BR"
                )}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Início</Label>
              <p className="text-sm text-muted-foreground">
                {user_mentorship.mentorship.time}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium">Duração Total</Label>
              <p className="text-sm text-muted-foreground">
                {user_mentorship.mentorship.duration} horas
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              Gerenciar Participantes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getStatus(status: string) {
  switch (status) {
    case "confirmed":
      return "Confirmada";
    case "in_progress":
      return "Em Andamento";
    case "done":
      return "Concluída";
    case "cancelled":
      return "Cancelada";
    default:
      return "Pendente";
  }
}

export default function MentorshipPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "in progress":
        return "destructive";
      case "done":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getProgressoParticipantes = (user_mentorship: Mentoria) => {
    return (
      (user_mentorship.mentorship.current_participants /
        user_mentorship.mentorship.max_participants) *
      100
    );
  };

  const getStatusMessage = (user_mentorship: Mentoria) => {
    if (
      user_mentorship.mentorship.current_participants >=
      user_mentorship.mentorship.min_participants
    ) {
      return "Mentoria confirmada";
    }

    const faltam =
      user_mentorship.mentorship.min_participants -
      user_mentorship.mentorship.current_participants;

    return `Faltam ${faltam} participante(s) para confirmar`;
  };

  const { data, loading } = useServerData(getUserMentorships);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!data.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mentorias</h1>
        <p className="text-muted-foreground">
          Você ainda não tem mentorias cadastradas.
        </p>
        <NewMentorshipDialog />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mentorias</h1>
          <p className="text-muted-foreground">
            Gerencie suas mentorias e acompanhe as inscrições
          </p>
        </div>
        <NewMentorshipDialog />
      </div>

      <div className="grid gap-4">
        {data.map((user_mentorship: Mentoria) => (
          <Card key={user_mentorship.mentorship.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{user_mentorship.mentorship.title}</CardTitle>
                  <CardDescription>
                    Mentor: {user_mentorship.user.name}
                    {user_mentorship.mentorship.category} • Gratuita
                  </CardDescription>
                </div>
                <Badge variant={getStatusColor(user_mentorship.status)}>
                  {getStatus(user_mentorship.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progresso de participantes */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Participantes</span>
                    <span className="text-muted-foreground">
                      {user_mentorship.mentorship.current_participants} /{" "}
                      {user_mentorship.mentorship.max_participants}
                    </span>
                  </div>
                  <Progress
                    value={getProgressoParticipantes(user_mentorship)}
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      Mín: {user_mentorship.mentorship.min_participants}
                    </span>
                    <span
                      className={
                        user_mentorship.mentorship.current_participants <
                        user_mentorship.mentorship.min_participants
                          ? "text-amber-600"
                          : "text-green-600"
                      }
                    >
                      {getStatusMessage(user_mentorship)}
                    </span>
                    <span>
                      Máx: {user_mentorship.mentorship.max_participants}
                    </span>
                  </div>
                </div>

                {/* Informações adicionais */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {user_mentorship.mentorship.current_participants}{" "}
                      inscritos
                    </div>
                    {user_mentorship.mentorship.next_session && (
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        Próxima:{" "}
                        {new Date(
                          user_mentorship.mentorship.next_session
                        ).toLocaleString("pt-BR")}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {user_mentorship.mentorship.duration} min
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Participantes
                    </Button>
                    <MentorshipDetailsDialog
                      user_mentorship={user_mentorship}
                    />
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo estatístico */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Mentorias Confirmadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {data.filter((m: any) => m.status === "confirmed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Atingiram o mínimo de participantes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Aguardando Confirmação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {data.filter((m: any) => m.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Precisam de mais participantes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total de Inscritos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600"></div>
            <p className="text-xs text-muted-foreground">
              Em todas as mentorias
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
