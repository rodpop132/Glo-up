import { Button } from "@/components/ui/button";
import { Smartphone, Download, Shield, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const DownloadPage = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    // O link do APK será adicionado aqui
    const link = document.createElement('a');
    link.href = '/glowmax.apk'; // Caminho para o APK
    link.download = 'Glowmax.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      <div className="relative z-10 max-w-2xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <img 
            src={logo} 
            alt="Glowmax Logo" 
            className="w-32 h-32 mx-auto mb-6 drop-shadow-2xl"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Descarregar{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Glowmax
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Começa a tua transformação agora
          </p>
        </div>

        <div className="bg-surface-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl animate-scale-in">
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">100% Seguro</h3>
                <p className="text-muted-foreground">Aplicação verificada e protegida</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Rápido e Leve</h3>
                <p className="text-muted-foreground">Instalação rápida, tamanho reduzido</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Avaliação 5 Estrelas</h3>
                <p className="text-muted-foreground">Milhares de utilizadores satisfeitos</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleDownload}
            variant="default" 
            size="lg" 
            className="w-full text-lg shadow-glow mb-4"
          >
            <Download className="mr-2" />
            Descarregar App
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Compatível com Android 6.0 ou superior
          </p>

          <div className="mt-6 pt-6 border-t border-border/50">
            <button 
              onClick={() => navigate('/')}
              className="text-primary hover:text-primary/80 transition-colors text-sm w-full"
            >
              ← Voltar ao site
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Ao descarregar, aceitas os nossos{" "}
            <a href="#" className="text-primary hover:underline">Termos de Uso</a>
            {" "}e{" "}
            <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
