import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
            <CardDescription>
              Configurações básicas do sistema de mentorias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome-sistema">Nome do Sistema</Label>
                <Input id="nome-sistema" defaultValue="Sistema de Mentorias" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-admin">Email do Administrador</Label>
                <Input id="email-admin" defaultValue="admin@mentoria.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                defaultValue="Plataforma de gerenciamento de mentorias online com integração ao Google Meet"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Sessões</CardTitle>
            <CardDescription>
              Configure o comportamento das sessões de mentoria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duracao-padrao">Duração Padrão (minutos)</Label>
                <Input id="duracao-padrao" type="number" defaultValue="60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="antecedencia">
                  Antecedência Mínima (horas)
                </Label>
                <Input id="antecedencia" type="number" defaultValue="24" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notificacoes" defaultChecked />
              <Label htmlFor="notificacoes">
                Enviar notificações por email
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>
              Configure as notificações do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Lembrete de sessão</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar lembrete 1 hora antes da sessão
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Nova mentoria</Label>
                <p className="text-sm text-muted-foreground">
                  Notificar quando uma nova mentoria for criada
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cancelamento de sessão</Label>
                <p className="text-sm text-muted-foreground">
                  Notificar quando uma sessão for cancelada
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar Configurações</Button>
        </div>
      </div>
    </div>
  );
}
