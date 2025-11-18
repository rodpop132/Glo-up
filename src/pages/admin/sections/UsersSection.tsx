import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { SectionHeader } from "../components/SectionHeader";
import { Timeline } from "../components/Timeline";
import {
  AdminFilters,
  AdminLimitsConfig,
  AdminUser,
  PlanTier,
} from "../types";
import { formatDateTime, isUserOnline } from "../utils";

interface UsersSectionProps {
  users: AdminUser[];
  filteredUsers: AdminUser[];
  selectedUser?: AdminUser;
  filters: AdminFilters;
  onFilterChange: (filters: Partial<AdminFilters>) => void;
  onSelectUser: (userId: number) => void;
  onPlanChange: (userId: number, plan: PlanTier) => void;
  onToggleUser: (userId: number, key: "is_active" | "is_admin") => void;
  limits: AdminLimitsConfig;
}

const relativeFormatter = new Intl.RelativeTimeFormat("pt-PT", { numeric: "auto" });

const getRelativeHours = (timestamp: string) => {
  const diffHours = Math.round((new Date(timestamp).getTime() - Date.now()) / (1000 * 60 * 60));
  return relativeFormatter.format(diffHours, "hour");
};

export const UsersSection = ({
  users,
  filteredUsers,
  selectedUser,
  filters,
  onFilterChange,
  onSelectUser,
  onPlanChange,
  onToggleUser,
  limits,
}: UsersSectionProps) => (
  <div className="space-y-8">
    <SectionHeader
      title="Gestao de utilizadores"
      description="Pesquisa, filtros avancados e acoes administrativas."
      endpoints={[
        { method: "GET", path: "/admin/users" },
        { method: "GET", path: "/admin/users/{id}" },
        { method: "PATCH", path: "/admin/users/{id}" },
      ]}
    />
    <Card className="bg-surface-card/80 border-border/50">
      <CardHeader>
        <CardTitle>Pesquisa avancada</CardTitle>
        <CardDescription>Filtra por plano, estado, atividade e nome/email</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-4">
        <Input
          placeholder="Pesquisar por nome ou email"
          value={filters.search}
          onChange={(event) => onFilterChange({ search: event.target.value })}
        />
        <Select value={filters.plan} onValueChange={(value) => onFilterChange({ plan: value as PlanTier | "all" })}>
          <SelectTrigger>
            <SelectValue placeholder="Plano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os planos</SelectItem>
            <SelectItem value="FREE">FREE</SelectItem>
            <SelectItem value="PRO">PRO</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange({ status: value as AdminFilters["status"] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer estado</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="blocked">Bloqueado</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.activity}
          onValueChange={(value) => onFilterChange({ activity: value as AdminFilters["activity"] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Atividade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer atividade</SelectItem>
            <SelectItem value="online">Online (<=5 min)</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>

    <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
      <Card className="bg-surface-card/80 border-border/50 overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Lista de utilizadores</CardTitle>
            <CardDescription>{filteredUsers.length} resultados filtrados</CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            GET /admin/users
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilizador</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Estado</TableHead>
                  <TableHead>Ultima atividade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className={cn("cursor-pointer hover:bg-muted/20", { "bg-muted/20": user.id === selectedUser?.id })}
                  onClick={() => onSelectUser(user.id)}
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.plan === "PRO" ? "default" : "outline"} className="text-xs">
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-1">
                    <Badge variant={user.is_active ? "outline" : "destructive"} className="text-xs">
                      {user.is_active ? "Ativo" : "Bloqueado"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        isUserOnline(user.last_activity_at) ? "text-green-400 border-green-400/40" : "text-muted-foreground",
                      )}
                    >
                      {isUserOnline(user.last_activity_at) ? "Online" : "Offline"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{getRelativeHours(user.last_activity_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedUser && (
        <Card className="bg-surface-card/80 border-border/50">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-primary/20 text-primary">
                <AvatarFallback>{selectedUser.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{selectedUser.name}</CardTitle>
                <CardDescription>{selectedUser.email}</CardDescription>
                <p className="text-xs text-muted-foreground">Ultimo login: {formatDateTime(selectedUser.last_login_at)}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedUser.plan} onValueChange={(value) => onPlanChange(selectedUser.id, value as PlanTier)}>
                <SelectTrigger className="h-8 w-32 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FREE">FREE</SelectItem>
                  <SelectItem value="PRO">PRO</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => onToggleUser(selectedUser.id, "is_active")}>
                {selectedUser.is_active ? "Bloquear" : "Desbloquear"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => onToggleUser(selectedUser.id, "is_admin")}>
                {selectedUser.is_admin ? "Remover admin" : "Promover admin"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-xl border border-border/40 p-3">
              <p className="text-xs text-muted-foreground">Uso hoje</p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xl font-semibold">{selectedUser.usage.today.analysis_count}</p>
                    <p className="text-xs text-muted-foreground">Analises</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">{selectedUser.usage.today.chat_count}</p>
                  <p className="text-xs text-muted-foreground">Chat</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">{selectedUser.usage.today.meal_count}</p>
                    <p className="text-xs text-muted-foreground">Refeicoes</p>
                </div>
              </div>
              <Progress
                value={(selectedUser.usage.today.chat_count / limits.free.max_chat_per_day) * 100}
                className="mt-3"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                Limite FREE atual: {limits.free.max_chat_per_day} mensagens/dia
              </p>
            </div>
            <div className="rounded-xl border border-border/40 p-3">
              <p className="text-xs text-muted-foreground">Uso por dia</p>
              <ChartContainer
                className="h-[160px] w-full"
                config={{
                  chat_count: { label: "Chat", color: "hsl(var(--secondary))" },
                  analysis_count: { label: "Analises", color: "hsl(var(--glow-gold))" },
                  meal_count: { label: "Refeicoes", color: "hsl(var(--muted-foreground))" },
                }}
              >
                <LineChart data={selectedUser.usage.perDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.3)" />
                  <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="analysis_count" stroke="hsl(var(--glow-gold))" />
                  <Line type="monotone" dataKey="chat_count" stroke="hsl(var(--secondary))" />
                  <Line type="monotone" dataKey="meal_count" stroke="hsl(var(--muted-foreground))" />
                </LineChart>
              </ChartContainer>
            </div>
            <div>
              <Tabs defaultValue="analises" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="analises">Analises</TabsTrigger>
                  <TabsTrigger value="rotinas">Rotinas</TabsTrigger>
                  <TabsTrigger value="refeicoes">Refeicoes</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                </TabsList>
                <TabsContent value="analises">
                  <Timeline items={selectedUser.last_analyses} />
                </TabsContent>
                <TabsContent value="rotinas">
                  <Timeline items={selectedUser.last_routines} />
                </TabsContent>
                <TabsContent value="refeicoes">
                  <Timeline items={selectedUser.last_meals} />
                </TabsContent>
                <TabsContent value="chat">
                  <Timeline items={selectedUser.last_chat_messages} />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  </div>
);
