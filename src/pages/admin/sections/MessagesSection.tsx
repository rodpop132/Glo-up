import { FormEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Inbox, Send } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import {
  AdminUser,
  BroadcastFormState,
  BroadcastMessage,
  DirectMessage,
  DirectMessageFormState,
} from "../types";
import { formatDateTime } from "../utils";

interface MessagesSectionProps {
  users: AdminUser[];
  broadcasts: BroadcastMessage[];
  directMessages: DirectMessage[];
  broadcastForm: BroadcastFormState;
  directMessageForm: DirectMessageFormState;
  onBroadcastChange: (partial: Partial<BroadcastFormState>) => void;
  onBroadcastSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDirectMessageChange: (partial: Partial<DirectMessageFormState>) => void;
  onDirectMessageSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const MessagesSection = ({
  users,
  broadcasts,
  directMessages,
  broadcastForm,
  directMessageForm,
  onBroadcastChange,
  onBroadcastSubmit,
  onDirectMessageChange,
  onDirectMessageSubmit,
}: MessagesSectionProps) => (
  <div className="space-y-8">
    <SectionHeader
      title="Mensagens internas e broadcast"
      description="Comunica atualizacoes com todos os utilizadores ou envia suporte 1:1."
      endpoints={[
        { method: "POST", path: "/admin/messages/broadcast" },
        { method: "POST", path: "/admin/users/{id}/message" },
        { method: "GET", path: "/admin/messages" },
      ]}
    />
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="bg-surface-card/80 border-border/40">
        <CardHeader>
          <CardTitle>Broadcast segmentado</CardTitle>
          <CardDescription>Envia para todos, apenas FREE ou apenas PRO</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onBroadcastSubmit}>
            <Select
              value={broadcastForm.target_plan}
              onValueChange={(value) => onBroadcastChange({ target_plan: value as BroadcastFormState["target_plan"] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Audiencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="FREE">FREE</SelectItem>
                <SelectItem value="PRO">PRO</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Titulo"
              value={broadcastForm.title}
              onChange={(event) => onBroadcastChange({ title: event.target.value })}
              required
            />
            <Textarea
              placeholder="Mensagem"
              value={broadcastForm.body}
              rows={4}
              onChange={(event) => onBroadcastChange({ body: event.target.value })}
              required
            />
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" /> Enviar broadcast
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-surface-card/80 border-border/40">
        <CardHeader>
          <CardTitle>Mensagem 1:1</CardTitle>
          <CardDescription>Ideal para suporte VIP, onboarding e retencao</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onDirectMessageSubmit}>
            <Select
              value={directMessageForm.user_id.toString()}
              onValueChange={(value) => onDirectMessageChange({ user_id: Number(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Utilizador" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.name} - {user.plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Assunto"
              value={directMessageForm.title}
              onChange={(event) => onDirectMessageChange({ title: event.target.value })}
              required
            />
            <Textarea
              placeholder="Mensagem personalizada"
              value={directMessageForm.body}
              rows={4}
              onChange={(event) => onDirectMessageChange({ body: event.target.value })}
              required
            />
            <Button type="submit" className="w-full" variant="secondary">
              <Inbox className="mr-2 h-4 w-4" />
              Enviar mensagem
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="bg-surface-card/80 border-border/40">
        <CardHeader>
          <CardTitle>Historico de broadcasts</CardTitle>
          <CardDescription>GET /admin/messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {broadcasts.map((broadcast) => (
            <div key={broadcast.id} className="rounded-xl border border-border/30 p-3 text-sm">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{broadcast.title}</p>
                <Badge variant="outline" className="text-[11px]">
                  {broadcast.target_plan ?? "Todos"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{formatDateTime(broadcast.created_at)}</p>
              <p className="mt-2 text-muted-foreground">{broadcast.body}</p>
              <div className="mt-2 text-[11px] text-muted-foreground">
                {broadcast.sent_by} - {broadcast.audience_count} utilizadores
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="bg-surface-card/80 border-border/40">
        <CardHeader>
          <CardTitle>Mensagens individuais</CardTitle>
          <CardDescription>/admin/users/{id}/messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {directMessages.map((message) => (
            <div key={message.id} className="rounded-xl border border-border/30 p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{message.user_name}</p>
                <Badge variant={message.status === "sent" ? "outline" : "destructive"} className="text-[11px]">
                  {message.status === "sent" ? "Enviado" : "Agendado"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{message.title}</p>
              <p className="mt-2 text-muted-foreground">{message.body}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">{formatDateTime(message.created_at)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);
