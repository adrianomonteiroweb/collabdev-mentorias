import { Plus, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 99999-9999",
    role: "mentor",
    status: "Ativo",
    mentorias: 3,
    sessoes: 24,
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    telefone: "(11) 88888-8888",
    role: "mentor",
    status: "Ativo",
    mentorias: 2,
    sessoes: 18,
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro@email.com",
    telefone: "(11) 77777-7777",
    role: "mentee",
    status: "Ativo",
    mentorias: 0,
    sessoes: 12,
  },
  {
    id: 4,
    nome: "Ana Lima",
    email: "ana@email.com",
    telefone: "(11) 66666-6666",
    role: "mentee",
    status: "Inativo",
    mentorias: 0,
    sessoes: 5,
  },
];

export default function UsuariosPage() {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "mentor":
        return "default";
      case "mentee":
        return "secondary";
      case "admin":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie mentores e mentorados
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {usuarios.map((usuario) => (
          <Card key={usuario.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{getInitials(usuario.nome)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{usuario.nome}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getRoleColor(usuario.role)}>
                      {usuario.role === "mentor" ? "Mentor" : "Mentorado"}
                    </Badge>
                    <Badge
                      variant={
                        usuario.status === "Ativo" ? "default" : "secondary"
                      }
                    >
                      {usuario.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  {usuario.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  {usuario.telefone}
                </div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-4">
                <span>Mentorias: {usuario.mentorias}</span>
                <span>Sessões: {usuario.sessoes}</span>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
