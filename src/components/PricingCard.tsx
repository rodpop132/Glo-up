import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price?: string;
  features: PricingFeature[];
  isPro?: boolean;
  ctaText: string;
}

const PricingCard = ({ title, price, features, isPro = false, ctaText }: PricingCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className={`relative p-8 ${isPro ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-primary shadow-glow' : 'bg-surface-card border-border/50'} transition-all duration-300 hover:scale-105`}>
      {isPro && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1 rounded-full text-sm font-bold shadow-glow">
          RECOMENDADO
        </div>
      )}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        {price && (
          <div className="text-4xl font-bold text-primary mt-4">{price}</div>
        )}
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            {feature.included ? (
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
            ) : (
              <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            )}
            <span className={feature.included ? 'text-foreground' : 'text-muted-foreground line-through'}>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      <Button 
        variant={isPro ? "default" : "outline"} 
        className={`w-full ${isPro ? 'shadow-glow' : ''}`}
        size="lg"
        onClick={() => navigate('/download')}
      >
        {ctaText}
      </Button>
    </Card>
  );
};

export default PricingCard;
