import { LucideIcon } from "lucide-react";

interface StepCardProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const StepCard = ({ number, icon: Icon, title, description }: StepCardProps) => {
  return (
    <div className="relative flex flex-col items-center text-center space-y-4 group">
      <div className="absolute -top-4 -left-4 text-8xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-300">
        {number}
      </div>
      <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
        <Icon className="w-10 h-10 text-primary-foreground" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mt-4">{title}</h3>
      <p className="text-muted-foreground max-w-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default StepCard;
