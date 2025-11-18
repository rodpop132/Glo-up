import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Glowmax Logo" className="w-10 h-10" />
            <span className="text-2xl font-bold text-foreground">Glowmax</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('features')} className="text-foreground hover:text-primary transition-colors">
              Funcionalidades
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-foreground hover:text-primary transition-colors">
              Como Funciona
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-foreground hover:text-primary transition-colors">
              Planos
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-foreground hover:text-primary transition-colors">
              FAQ
            </button>
            <Button 
              variant="default" 
              className="shadow-glow"
              onClick={() => navigate('/download')}
            >
              Download App
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button onClick={() => scrollToSection('features')} className="block w-full text-left text-foreground hover:text-primary transition-colors">
              Funcionalidades
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-foreground hover:text-primary transition-colors">
              Como Funciona
            </button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-foreground hover:text-primary transition-colors">
              Planos
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-foreground hover:text-primary transition-colors">
              FAQ
            </button>
            <Button 
              variant="default" 
              className="w-full shadow-glow"
              onClick={() => navigate('/download')}
            >
              Download App
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
