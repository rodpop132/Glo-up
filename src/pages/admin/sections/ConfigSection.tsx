import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "../components/SectionHeader";
import { AdminLimitsConfig } from "../types";
import { Sparkles } from "lucide-react";

interface ConfigSectionProps {
  limitsDraft: AdminLimitsConfig;
  limitsConfig: AdminLimitsConfig;
  onChange: (plan: keyof AdminLimitsConfig, field: keyof AdminLimitsConfig["free"], value: number) => void;
  onSave: () => void;
  onReset: () => void;
}

export const ConfigSection = ({ limitsDraft, limitsConfig, onChange, onSave, onReset }: ConfigSectionProps) => (
  <div className="space-y-8">
    <SectionHeader
      title="Limites e configuracoes globais"
      description="Controla o comportamento dos planos FREE e PRO."
      endpoints={[
        { method: "GET", path: "/admin/config/limits" },
        { method: "PUT", path: "/admin/config/limits" },
      ]}
    />
    <div className="grid gap-6 lg:grid-cols-2">
      {(["free", "pro"] as const).map((plan) => (
        <Card key={plan} className="bg-surface-card/80 border-border/40">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="uppercase">{plan} plan</CardTitle>
              <CardDescription>
                Em producao: {limitsConfig[plan].max_analyses} analises / {limitsConfig[plan].max_chat_per_day} chats
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              {plan === "free" ? "FREE" : "PRO"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Max. analises/mes</p>
              <Input
                type="number"
                value={limitsDraft[plan].max_analyses}
                onChange={(event) => onChange(plan, "max_analyses", Number(event.target.value))}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Chat IA/dia</p>
              <Input
                type="number"
                value={limitsDraft[plan].max_chat_per_day}
                onChange={(event) => onChange(plan, "max_chat_per_day", Number(event.target.value))}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Refeicoes analisadas/dia</p>
              <Input
                type="number"
                value={limitsDraft[plan].max_meals_per_day}
                onChange={(event) => onChange(plan, "max_meals_per_day", Number(event.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="flex flex-wrap gap-3">
      <Button onClick={onSave} className="flex-1 min-w-[180px]">
        <Sparkles className="mr-2 h-4 w-4" /> Guardar limites
      </Button>
      <Button variant="outline" onClick={onReset} className="flex-1 min-w-[180px]">
        Repor valores
      </Button>
    </div>
  </div>
);
