import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  helper: string;
}

export const StatCard = ({ icon: Icon, label, value, helper }: StatCardProps) => (
  <Card className="bg-surface-card/80 border-border/60 shadow-lg shadow-black/20">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      <div className="rounded-xl bg-primary/10 p-2 text-primary shadow-inner shadow-primary/40">
        <Icon className="h-4 w-4" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{helper}</p>
    </CardContent>
  </Card>
);
