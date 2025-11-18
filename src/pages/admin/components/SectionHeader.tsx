import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export type EndpointDefinition = { method: string; path: string };

export const EndpointBadge = ({ method, path }: EndpointDefinition) => (
  <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-tight">
    {method} {path}
  </Badge>
);

interface SectionHeaderProps {
  title: string;
  description: string;
  endpoints: EndpointDefinition[];
}

export const SectionHeader = ({ title, description, endpoints }: SectionHeaderProps) => (
  <div className="space-y-3">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {endpoints.map((endpoint) => (
          <EndpointBadge key={`${endpoint.method}-${endpoint.path}`} {...endpoint} />
        ))}
      </div>
    </div>
    <Separator className="bg-border/50" />
  </div>
);
