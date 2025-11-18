import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "../components/SectionHeader";
import { StatCard } from "../components/StatCard";
import { formatCurrency, formatDateOnly } from "../utils";
import { AdminSummary, PlanAudienceCount, SubscriptionSummary } from "../types";
import { Bell, CreditCard, ShieldCheck } from "lucide-react";

interface PaymentsSectionProps {
  planCounts: PlanAudienceCount;
  subscriptions: SubscriptionSummary[];
  summary: AdminSummary;
}

export const PaymentsSection = ({ planCounts, subscriptions, summary }: PaymentsSectionProps) => {
  const active = subscriptions.filter((sub) => sub.status === "active").length;
  const flagged = subscriptions.filter((sub) => sub.status !== "active").length;

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Planos, Stripe e receita"
        description="Visao financeira do Glowmax e integracoes com o Stripe."
        endpoints={[
          { method: "GET", path: "/admin/payments/subscriptions" },
          { method: "GET", path: "/admin/stats/revenue" },
        ]}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard icon={CreditCard} label="Assinaturas PRO" value={planCounts.PRO.toString()} helper="+12 novos na semana" />
        <StatCard icon={ShieldCheck} label="Subscricoes ativas" value={active.toString()} helper="Stripe em dia" />
        <StatCard icon={Bell} label="Flags de cobranca" value={flagged.toString()} helper="Past due e cancelados" />
      </div>
      <Card className="bg-surface-card/70 border-border/40">
        <CardHeader>
          <CardTitle>Lista de subscricoes</CardTitle>
          <CardDescription>Dados sincronizados via webhooks Stripe</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilizador</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Periodo</TableHead>
                <TableHead>Renovacao</TableHead>
                <TableHead>MRR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.stripe_subscription_id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{sub.user_email}</p>
                      <p className="text-xs text-muted-foreground">{sub.stripe_customer_id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        sub.status === "active" ? "outline" : sub.status === "past_due" ? "destructive" : "secondary"
                      }
                      className="text-xs"
                    >
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{sub.period === "monthly" ? "Mensal" : "Anual"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{formatDateOnly(sub.current_period_end)}</TableCell>
                  <TableCell className="text-sm font-semibold">{formatCurrency(sub.mrr)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Ultima sincronizacao Stripe ha 12 minutos - MRR estimado: {formatCurrency(summary.mrr_estimate)}
        </CardFooter>
      </Card>
    </div>
  );
};
