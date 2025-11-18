import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import StepCard from "@/components/StepCard";
import PricingCard from "@/components/PricingCard";
import FAQItem from "@/components/FAQItem";
import heroMockup from "@/assets/hero-mockup.png";
import transformation1 from "@/assets/transformation-1.jpg";
import transformation2 from "@/assets/transformation-2.jpg";
import transformation3 from "@/assets/transformation-3.jpg";
import transformation4 from "@/assets/transformation-4.jpg";
import TransformationCard from "@/components/TransformationCard";
import { 
  Scan, 
  Brain, 
  MessageCircle, 
  Camera, 
  TrendingUp, 
  UserCircle, 
  Smartphone,
  Users,
  Target,
  Sparkles,
  Zap
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                O teu manual de{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Glow Up
                </span>{" "}
                alimentado por IA
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Analisa. Aprende. Evolui. O Glowmax cria um plano completo baseado na tua própria imagem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="text-lg"
                  onClick={() => navigate('/download')}
                >
                  <Smartphone className="mr-2" />
                  Download App
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img 
                src={heroMockup} 
                alt="Glowmax App Mockup" 
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-surface-card">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            O que é o Glowmax?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            O Glowmax é o primeiro aplicativo português de Glow Up com Inteligência Artificial que 
            analisa o teu rosto, identifica oportunidades de melhoria e cria um plano de evolução 
            completo — desde pele, corpo, sono, alimentação, postura e estilo.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <StepCard 
              number={1}
              icon={UserCircle}
              title="Cria Conta"
              description="Login simples com email, Google ou Apple. Rápido e seguro."
            />
            <StepCard 
              number={2}
              icon={Scan}
              title="Faz o Scan Facial"
              description="Envia uma foto frontal. Fotos adicionais melhoram a precisão."
            />
            <StepCard 
              number={3}
              icon={Brain}
              title="Análise por IA"
              description="A IA avalia proporcionalidade, simetria, pele, harmonia e glow."
            />
            <StepCard 
              number={4}
              icon={TrendingUp}
              title="Recebe o teu Plano"
              description="Rotinas personalizadas de skincare, treino, alimentação e hábitos."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-surface-card">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">
            Funcionalidades Principais
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Scan}
              title="Análise Facial IA"
              description="Avaliação detalhada da tua face com notas e gráficos circulares para cada categoria."
            />
            <FeatureCard 
              icon={Sparkles}
              title="Rotina Personalizada"
              description="Plano diário atualizado conforme a tua evolução em skincare, treino e alimentação."
            />
            <FeatureCard 
              icon={MessageCircle}
              title="Chatbot IA"
              description="Tira dúvidas sobre exercícios, alimentação, pele e hábitos diretamente no app."
            />
            <FeatureCard 
              icon={Camera}
              title="Foto-Nutrição"
              description="Tira foto da refeição e a IA analisa calorias e impacto no teu Glow Up."
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Reavaliações"
              description="Envia novas fotos e acompanha o teu progresso visual ao longo do tempo."
            />
            <FeatureCard 
              icon={Zap}
              title="Gamificação"
              description="Checklist diário gamificado para manter-te motivado na tua jornada."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-6">
            Escolhe o teu Plano
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Começa grátis ou desbloqueia todo o potencial com o plano PRO
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard 
              title="FREE"
              price="Grátis"
              ctaText="Começar Grátis"
              features={[
                { name: "1 análise facial básica", included: true },
                { name: "Notas simples (baixa precisão)", included: true },
                { name: "Rotina personalizada", included: false },
                { name: "Chatbot completo", included: false },
                { name: "Foto-Nutrição", included: false },
                { name: "Reavaliações ilimitadas", included: false },
                { name: "Progress tracking", included: false },
              ]}
            />
            <PricingCard 
              title="PRO"
              price="R$ 14,99/mês"
              isPro
              ctaText="Atualizar para PRO"
              features={[
                { name: "Análises faciais ilimitadas", included: true },
                { name: "IA avançada (precisão máxima)", included: true },
                { name: "Rotina completa e personalizada", included: true },
                { name: "Chatbot total", included: true },
                { name: "Foto-Nutrição", included: true },
                { name: "Reavaliações ilimitadas", included: true },
                { name: "Progress tracking", included: true },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Transformations Section */}
      <section className="py-20 px-4 bg-surface-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Transformações Reais
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vê os resultados incríveis de quem seguiu o plano Glowmax
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <TransformationCard 
              image={transformation1}
              name="Miguel R."
              testimonial="Incrível! A minha pele melhorou drasticamente e a confiança disparou. O Glowmax mudou completamente a minha rotina e os resultados são visíveis."
              rating={5}
              timeframe="Transformação em 6 meses"
            />
            
            <TransformationCard 
              image={transformation2}
              name="João P."
              testimonial="Nunca pensei que seria possível. A análise facial da IA foi precisa e o plano personalizado funcionou perfeitamente para mim."
              rating={5}
              timeframe="Transformação em 8 meses"
            />
            
            <TransformationCard 
              image={transformation3}
              name="André S."
              testimonial="O antes e depois fala por si. Segui religiosamente as rotinas de skincare e alimentação. Valeu cada segundo!"
              rating={5}
              timeframe="Transformação em 5 meses"
            />
            
            <TransformationCard 
              image={transformation4}
              name="Ricardo M."
              testimonial="De não me reconhecer no espelho a receber elogios todos os dias. O Glowmax é o melhor investimento que fiz em mim."
              rating={5}
              timeframe="Transformação em 12 meses"
            />
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">
            Para quem é o Glowmax?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Quem quer melhorar a aparência</h3>
              <p className="text-muted-foreground">Transformação visual baseada em ciência e IA</p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Quem busca mais confiança</h3>
              <p className="text-muted-foreground">Eleva a tua autoestima com um plano estruturado</p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Homens e mulheres</h3>
              <p className="text-muted-foreground">Glow Up completo para todos os tipos de rosto</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <FAQItem 
              value="item-1"
              question="A IA é segura?"
              answer="Sim, totalmente segura. Utilizamos encriptação de ponta a ponta e não partilhamos as tuas fotos com terceiros. Todos os dados são processados de forma confidencial."
            />
            <FAQItem 
              value="item-2"
              question="Como são armazenadas as fotos?"
              answer="As tuas fotos são armazenadas de forma segura em servidores encriptados. Apenas tu tens acesso às tuas imagens e podes apagá-las a qualquer momento."
            />
            <FAQItem 
              value="item-3"
              question="Posso mudar de plano?"
              answer="Sim! Podes atualizar para PRO ou cancelar a qualquer momento. Não há contratos de permanência."
            />
            <FAQItem 
              value="item-4"
              question="O Glowmax funciona para todos os tipos de rosto?"
              answer="Sim, a nossa IA foi treinada com diversidade em mente e funciona para todos os tipos de rosto, tons de pele e características faciais."
            />
            <FAQItem 
              value="item-5"
              question="Quanto tempo demora para ver resultados?"
              answer="Os resultados variam, mas a maioria dos utilizadores nota melhorias visíveis em 4-6 semanas seguindo o plano personalizado."
            />
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Pronto para a tua transformação?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junta-te a milhares de pessoas que já estão a evoluir com o Glowmax
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg"
              onClick={() => navigate('/download')}
            >
              <Smartphone className="mr-2" />
              Download App
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
