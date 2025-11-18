import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  adminMetrics,
  adminMockBroadcasts,
  adminMockDirectMessages,
  adminMockLimits,
  adminMockSubscriptions,
  adminMockSummary,
  adminMockTimeSeries,
  adminMockUsers,
} from "./mock-data";
import {
  AdminFilters,
  AdminMetric,
  AdminUser,
  BroadcastFormState,
  BroadcastMessage,
  DirectMessage,
  DirectMessageFormState,
  PlanAudienceCount,
  PlanTier,
} from "./types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { ShieldCheck, Sparkles, LayoutDashboard, Users, MessageCircle, CreditCard, Settings } from "lucide-react";
import { DashboardSection } from "./sections/DashboardSection";
import { UsersSection } from "./sections/UsersSection";
import { MessagesSection } from "./sections/MessagesSection";
import { PaymentsSection } from "./sections/PaymentsSection";
import { ConfigSection } from "./sections/ConfigSection";
import { isUserOnline } from "./utils";

const navItems = [
  { id: "dashboard", label: "Dashboard", description: "KPIs", icon: LayoutDashboard },
  { id: "users", label: "Utilizadores", description: "Gestao completa", icon: Users },
  { id: "messages", label: "Mensagens", description: "Broadcast & 1:1", icon: MessageCircle },
  { id: "payments", label: "Pagamentos", description: "Stripe & receita", icon: CreditCard },
  { id: "config", label: "Configuracoes", description: "Limites globais", icon: Settings },
] as const;

const defaultFilters: AdminFilters = {
  search: "",
  plan: "all",
  status: "all",
  activity: "all",
};

const createId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));

const filterUsers = (users: AdminUser[], filters: AdminFilters) =>
  users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesPlan = filters.plan === "all" ? true : user.plan === filters.plan;
    const matchesStatus = filters.status === "all" ? true : filters.status === "active" ? user.is_active : !user.is_active;
    const matchesActivity =
      filters.activity === "all"
        ? true
        : filters.activity === "online"
          ? isUserOnline(user.last_activity_at)
          : !isUserOnline(user.last_activity_at);
    return matchesSearch && matchesPlan && matchesStatus && matchesActivity;
  });

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<(typeof navItems)[number]["id"]>("dashboard");
  const [metric, setMetric] = useState<AdminMetric>(adminMetrics[0]);
  const [users, setUsers] = useState(adminMockUsers);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(adminMockUsers[0]?.id ?? null);
  const [filters, setFilters] = useState<AdminFilters>(defaultFilters);
  const [broadcasts, setBroadcasts] = useState(adminMockBroadcasts);
  const [directMessages, setDirectMessages] = useState(adminMockDirectMessages);
  const [limitsDraft, setLimitsDraft] = useState(adminMockLimits);
  const [limitsConfig, setLimitsConfig] = useState(adminMockLimits);
  const [broadcastForm, setBroadcastForm] = useState<BroadcastFormState>({ title: "", body: "", target_plan: "all" });
  const [directMessageForm, setDirectMessageForm] = useState<DirectMessageFormState>({
    user_id: adminMockUsers[0]?.id ?? 1,
    title: "",
    body: "",
  });

  const filteredUsers = useMemo(() => filterUsers(users, filters), [filters, users]);

  useEffect(() => {
    const token = localStorage.getItem("glowmax_admin_token");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedUserId && !filteredUsers.some((user) => user.id === selectedUserId)) {
      setSelectedUserId(filteredUsers[0]?.id ?? null);
    }
  }, [filteredUsers, selectedUserId]);

  const selectedUser = filteredUsers.find((user) => user.id === selectedUserId) ?? filteredUsers[0];

  const planCounts: PlanAudienceCount = useMemo(
    () => ({
      FREE: users.filter((user) => user.plan === "FREE").length,
      PRO: users.filter((user) => user.plan === "PRO").length,
    }),
    [users],
  );

  const handleFilterChange = (partial: Partial<AdminFilters>) => setFilters((prev) => ({ ...prev, ...partial }));

  const handlePlanChange = (userId: number, plan: PlanTier) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, plan } : user)));
    toast({ title: "Plano atualizado", description: `Utilizador #${userId} agora esta em ${plan}` });
  };

  const handleToggleUser = (userId: number, key: "is_active" | "is_admin") => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, [key]: !user[key] } : user)));
    toast({ title: "Alteracoes guardadas", description: `Campo ${key} atualizado para o utilizador #${userId}` });
  };

  const handleBroadcastSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const audience =
      broadcastForm.target_plan === "PRO"
        ? planCounts.PRO
        : broadcastForm.target_plan === "FREE"
          ? planCounts.FREE
          : users.length;
    const payload: BroadcastMessage = {
      id: createId(),
      title: broadcastForm.title,
      body: broadcastForm.body,
      target_plan: broadcastForm.target_plan === "all" ? null : broadcastForm.target_plan,
      created_at: new Date().toISOString(),
      sent_by: "Rodrigo",
      audience_count: audience,
    };
    setBroadcasts((prev) => [payload, ...prev]);
    setBroadcastForm({ title: "", body: "", target_plan: "all" });
    toast({ title: "Broadcast enviada", description: "A mensagem foi alinhada com o endpoint POST /admin/messages/broadcast." });
  };

  const handleDirectMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = users.find((user) => user.id === directMessageForm.user_id);
    if (!target) return;
    const payload: DirectMessage = {
      id: createId(),
      user_id: target.id,
      user_name: target.name,
      title: directMessageForm.title,
      body: directMessageForm.body,
      created_at: new Date().toISOString(),
      status: "sent",
    };
    setDirectMessages((prev) => [payload, ...prev]);
    setDirectMessageForm({ user_id: target.id, title: "", body: "" });
    toast({ title: "Mensagem enviada", description: `Mensagem interna entregue para ${target.name}` });
  };

  const handleLimitsChange = (plan: keyof typeof limitsDraft, field: keyof (typeof limitsDraft)["free"], value: number) => {
    setLimitsDraft((prev) => ({ ...prev, [plan]: { ...prev[plan], [field]: value } }));
  };

  const handleLimitsSave = () => {
    setLimitsConfig(limitsDraft);
    toast({ title: "Limites salvos", description: "Os valores podem agora ser enviados via PUT /admin/config/limits." });
  };

  const handleLimitsReset = () => {
    setLimitsDraft(adminMockLimits);
    toast({ title: "Limites restaurados", description: "Voltaste para os valores oficiais." });
  };

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return (
          <UsersSection
            users={users}
            filteredUsers={filteredUsers}
            selectedUser={selectedUser}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSelectUser={setSelectedUserId}
            onPlanChange={handlePlanChange}
            onToggleUser={handleToggleUser}
            limits={limitsConfig}
          />
        );
      case "messages":
        return (
          <MessagesSection
            users={users}
            broadcasts={broadcasts}
            directMessages={directMessages}
            broadcastForm={broadcastForm}
            directMessageForm={directMessageForm}
            onBroadcastChange={(partial) => setBroadcastForm((prev) => ({ ...prev, ...partial }))}
            onBroadcastSubmit={handleBroadcastSubmit}
            onDirectMessageChange={(partial) => setDirectMessageForm((prev) => ({ ...prev, ...partial }))}
            onDirectMessageSubmit={handleDirectMessageSubmit}
          />
        );
      case "payments":
        return <PaymentsSection planCounts={planCounts} subscriptions={adminMockSubscriptions} summary={adminMockSummary} />;
      case "config":
        return (
          <ConfigSection
            limitsDraft={limitsDraft}
            limitsConfig={limitsConfig}
            onChange={handleLimitsChange}
            onSave={handleLimitsSave}
            onReset={handleLimitsReset}
          />
        );
      default:
        return (
          <DashboardSection
            summary={adminMockSummary}
            metric={metric}
            onMetricChange={setMetric}
            planCounts={planCounts}
            users={users}
            subscriptions={adminMockSubscriptions}
            timeSeries={adminMockTimeSeries}
          />
        );
    }
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-border/40">
        <SidebarHeader className="border-b border-border/40">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Glowmax</p>
            <p className="text-lg font-bold">Admin HUB</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Modulos</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeSection === item.id}
                      className="justify-start gap-3"
                      onClick={() => setActiveSection(item.id)}
                    >
                      <item.icon className="h-4 w-4" />
                      <div className="flex flex-col items-start">
                        <span>{item.label}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-border/40">
          <div className="flex items-center gap-3 rounded-lg border border-border/30 bg-surface-card/80 p-3">
            <div>
              <p className="text-sm font-semibold">Rodrigo</p>
              <p className="text-xs text-muted-foreground">Super admin</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex w-full items-center justify-between border-b border-border/30 bg-background/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div>
              <p className="text-sm text-muted-foreground">Modulo admin</p>
              <h1 className="text-2xl font-semibold">Painel de controlo</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="font-mono text-xs">
              GET /users/me -> is_admin
            </Badge>
            <Button size="sm" variant="secondary">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Sessao segura
            </Button>
          </div>
        </header>
        <ScrollArea className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-6xl">{renderSection()}</div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPanel;
