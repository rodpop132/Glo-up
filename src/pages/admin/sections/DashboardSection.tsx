import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { MessageCircle, Sparkles, TrendingUp, Users } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { SectionHeader } from "../components/SectionHeader";
import { formatCurrency, formatDateOnly, metricLabels } from "../utils";
import {
  AdminMetric,
  AdminSummary,
  PlanAudienceCount,
  SubscriptionSummary,
  AdminUser,
  TimeSeriesMap,
} from "../types";
import { adminMetrics } from "../mock-data";

interface DashboardSectionProps {
  summary: AdminSummary;
  metric: AdminMetric;
  onMetricChange: (metric: AdminMetric) => void;
  planCounts: PlanAudienceCount;
  users: AdminUser[];
  subscriptions: SubscriptionSummary[];
  timeSeries: TimeSeriesMap;
}

export const DashboardSection = ({
  summary,
  metric,
  onMetricChange,
  planCounts,
  users,
  subscriptions,
  timeSeries,
}: DashboardSectionProps) => {
  const latestUsers = [...users]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  const activeSubscriptions = subscriptions.filter((sub) => sub.status === "active").slice(0, 4);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Dashboard operacional"
        description="KPIs, graficos e eventos recentes que alimentam o modulo admin."
        endpoints={[
          { method: "GET", path: "/admin/stats/summary" },
          { method: "GET", path: "/admin/stats/timeseries" },
        ]}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Utilizadores totais"
          value={summary.total_users.toLocaleString("pt-PT")}
          helper={`+${summary.new_users_today} hoje`}
        />
        <StatCard
          icon={Sparkles}
          label="Analises hoje"
          value={summary.analyses_today.toString()}
          helper="Limite FREE atingido em 23% dos utilizadores"
        />
        <StatCard
          icon={MessageCircle}
          label="Mensagens IA hoje"
          value={summary.chat_messages_today.toString()}
          helper="Engajamento 16% acima da media"
        />
        <StatCard
          icon={TrendingUp}
          label="MRR estimado"
          value={formatCurrency(summary.mrr_estimate)}
          helper="Ultimo mes +8%"
        />
      </div>

      <Card className="bg-surface-card/80 border-border/50">
        <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>Tendencias principais</CardTitle>
            <CardDescription>{metricLabels[metric]}</CardDescription>
          </div>
          <Tabs value={metric} onValueChange={(value) => onMetricChange(value as AdminMetric)} className="w-full lg:w-auto">
            <TabsList className="flex w-full flex-wrap gap-1 bg-transparent">
              {adminMetrics.map((item) => (
                <TabsTrigger
                  key={item}
                  value={item}
                  className="rounded-full bg-muted/30 px-4 py-1 text-xs data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
                >
                  {metricLabels[item].split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-[280px] w-full"
            config={{
              value: { label: metricLabels[metric], color: "hsl(var(--glow-gold))" },
            }}
          >
            <AreaChart data={timeSeries[metric]}>
              <defs>
                <linearGradient id="metricGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--glow-gold))" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="hsl(var(--glow-gold))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" />
              <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--glow-gold))" strokeWidth={2} fill="url(#metricGradient)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-surface-card/70 border-border/40">
          <CardHeader>
            <CardTitle>Distribuicao de planos</CardTitle>
            <CardDescription>FREE vs PRO em tempo real (GET /admin/users)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[220px]"
              config={{
                FREE: { label: "FREE", color: "hsl(var(--muted-foreground))" },
                PRO: { label: "PRO", color: "hsl(var(--secondary))" },
              }}
            >
              <BarChart data={[{ plan: "FREE", value: planCounts.FREE }, { plan: "PRO", value: planCounts.PRO }]}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border) / 0.4)" />
                <XAxis dataKey="plan" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
            <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">FREE</p>
                <p>{planCounts.FREE} utilizadores</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">PRO</p>
                <p>{planCounts.PRO} assinaturas ativas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-surface-card/70 border-border/40">
          <CardHeader>
            <CardTitle>Ultimas subscricoes PRO</CardTitle>
            <CardDescription>Dados vindos de GET /admin/payments/subscriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeSubscriptions.map((sub) => (
              <div key={sub.stripe_subscription_id} className="flex items-center justify-between rounded-xl border border-border/40 bg-surface-card/50 p-3 text-sm">
                <div>
                  <p className="font-semibold">{sub.user_email}</p>
                  <p className="text-xs text-muted-foreground">Renova em {formatDateOnly(sub.current_period_end)}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {sub.period === "monthly" ? "Mensal" : "Anual"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-surface-card/70 border-border/40">
        <CardHeader>
          <CardTitle>Ultimos utilizadores</CardTitle>
          <CardDescription>Lista rapida para suporte e onboarding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {latestUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-lg border border-border/30 p-3 text-sm">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Badge variant={user.plan === "PRO" ? "default" : "outline"} className="text-xs">
                  {user.plan}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
