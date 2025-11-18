import { Badge } from "@/components/ui/badge";
import { TimelineItem } from "../types";
import { formatDateTime } from "../utils";

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => (
  <div className="space-y-4">
    {items.map((item) => (
      <div key={item.id} className="rounded-xl border border-border/40 bg-surface-card/70 p-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{item.title}</p>
          <span className="text-xs text-muted-foreground">{formatDateTime(item.timestamp)}</span>
        </div>
        <p className="text-xs text-muted-foreground">{item.meta}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {item.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    ))}
  </div>
);
