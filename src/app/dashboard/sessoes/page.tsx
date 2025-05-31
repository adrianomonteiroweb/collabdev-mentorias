import { Plus, Clock, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sessoes = [
  {
    id: 1,
    titulo: "Introdução ao React Hooks",
    mentoria: "React para Iniciantes",
    mentor: "João Silva",
    data: "2024-01-15 14:00",
    duracao: 60,
    participantes: 8,
    status: "Agendada",
  },
  {
    id: 2,
    titulo: "APIs REST com Express",
    mentoria: "Node.js Avançado",
    mentor: "Maria Santos",
    data: "2024-01-16 16:30",
    duracao: 90,
    participantes: 6,
    status: "Agendada",
  },
  {
    id: 3,
    titulo: "Como se destacar em entrevistas",
    mentoria: "Carreira em Tech",
    mentor: "Pedro Costa",
    data: "2024-01-14 10:00",
    duracao: 45,
    participantes: 12,
    status: "Concluída",
  },
];

export default function SessoesPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Agendada":
        return "default";
      case "Em andamento":
        return "destructive";
      case "Concluída":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sessões</h1>
          <p className="text-muted-foreground">
            Gerencie suas sessões de mentoria
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Sessão
        </Button>
      </div>

      <div className="grid gap-4">
        {sessoes.map((sessao) => (
          <Card key={sessao.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{sessao.titulo}</CardTitle>
                  <CardDescription>
                    {sessao.mentoria} • {sessao.mentor}
                  </CardDescription>
                </div>
                <Badge variant={getStatusColor(sessao.status)}>
                  {sessao.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {new Date(sessao.data).toLocaleString("pt-BR")}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {sessao.participantes} participantes
                  </div>
                  <span>{sessao.duracao} min</span>
                </div>
                <div className="flex space-x-2">
                  {sessao.status === "Agendada" && (
                    <Button variant="outline" size="sm">
                      Iniciar
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
