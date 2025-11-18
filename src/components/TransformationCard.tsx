import { Star } from "lucide-react";

interface TransformationCardProps {
  image: string;
  name: string;
  testimonial: string;
  rating: number;
  timeframe: string;
}

const TransformationCard = ({ 
  image, 
  name, 
  testimonial, 
  rating,
  timeframe 
}: TransformationCardProps) => {
  return (
    <div className="group relative bg-surface-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow">
      {/* Transformation Image with Before/After Labels */}
      <div className="relative overflow-hidden p-6">
        <div className="relative overflow-hidden rounded-xl">
          {/* Before Label - Left Side */}
          <div className="absolute top-6 left-6 z-10 bg-muted/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-foreground">
            ANTES
          </div>
          
          {/* After Label - Right Side */}
          <div className="absolute top-6 right-6 z-10 bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-full text-sm font-semibold text-primary-foreground">
            DEPOIS
          </div>
          
          <img 
            src={image} 
            alt={`Transformação de ${name}`}
            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
      
      {/* Testimonial Content */}
      <div className="p-6 pt-0 space-y-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted'}`}
            />
          ))}
        </div>
        
        <p className="text-muted-foreground italic leading-relaxed">
          "{testimonial}"
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{timeframe}</p>
          </div>
          <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            ✓ Verificado
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformationCard;
