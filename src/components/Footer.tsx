import { Instagram, Twitter, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-surface-dark border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Glowmax Logo" className="w-10 h-10" />
              <span className="text-xl font-bold text-foreground">Glowmax</span>
            </div>
            <p className="text-muted-foreground">
              A tua transformação começa aqui.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Funcionalidades</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Planos</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacidade</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Suporte</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Parcerias</a></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-muted-foreground flex flex-col items-center gap-2">
          <p>&copy; 2024 Glowmax. Todos os direitos reservados.</p>
          <a
            href="/admin"
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
          >
            admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
