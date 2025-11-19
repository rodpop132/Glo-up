import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

const resolveApiBase = () => {
  const envBase = import.meta.env.VITE_API_URL?.trim();
  const hasWindow = typeof window !== "undefined";
  const fallback = "/api";

  if (!envBase) {
    return { base: fallback, note: fallback };
  }

  const sanitized = envBase.endsWith("/") ? envBase.slice(0, -1) : envBase;
  const usesHttp = sanitized.startsWith("http://");

  if (hasWindow && window.location.protocol === "https:" && usesHttp) {
    console.warn(
      `[AdminLogin] VITE_API_URL (${sanitized}) usa HTTP numa pagina HTTPS. A request sera feita via proxy ${fallback}.`,
    );
    return { base: fallback, note: sanitized };
  }

  return { base: sanitized, note: sanitized };
};

const { base: API_BASE, note: API_NOTE } = resolveApiBase();
const buildUrl = (path: string) => `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
const TOKEN_KEY = "glowmax_admin_token";
const PROFILE_KEY = "glowmax_admin_profile";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@teuapp.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"idle" | "checking" | "ok" | "error">("idle");
  const [apiStatusMessage, setApiStatusMessage] = useState("");

  useEffect(() => {
    const checkHealth = async () => {
      setApiStatus("checking");
      setApiStatusMessage("");
      try {
        const res = await fetch(buildUrl("/health"));
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const payload = await res.json();
        setApiStatus("ok");
        setApiStatusMessage(`API online (timestamp ${payload?.timestamp ?? "desconhecido"})`);
      } catch (err) {
        setApiStatus("error");
        setApiStatusMessage(
          `Healthcheck falhou em ${buildUrl("/health")}: ${
            err instanceof Error ? err.message : "erro desconhecido"
          }`,
        );
      }
    };

    checkHealth();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const loginBody = new URLSearchParams();
      loginBody.append("username", email);
      loginBody.append("password", password);

      const loginResponse = await fetch(buildUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: loginBody,
      });

      if (!loginResponse.ok) {
        throw new Error("Credenciais invalidas ou API indisponivel.");
      }

      const loginData = await loginResponse.json();
      if (!loginData?.access_token) {
        throw new Error("Resposta invalida do servidor.");
      }

      const token = loginData.access_token as string;
      const meResponse = await fetch(buildUrl("/users/me"), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!meResponse.ok) {
        throw new Error("Nao foi possivel verificar o utilizador.");
      }

      const profile = await meResponse.json();
      if (!profile?.is_admin) {
        throw new Error("Esta conta nao tem permissao de admin.");
      }

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      toast({ title: "Bem-vindo", description: "Sessao admin iniciada com sucesso." });
      navigate("/admin/dashboard");
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Erro inesperado no login.";
      setError(`${detail} (endpoint: ${buildUrl("/auth/login")}, origem configurada: ${API_NOTE})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border/50 bg-surface-card/90">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-2xl font-semibold">Login Admin</CardTitle>
          <CardDescription>
            Usa as tuas credenciais do endpoint /auth/login. Apenas contas com is_admin = 1 conseguem entrar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "A validar..." : "Entrar"}
            </Button>
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>
                Health:{" "}
                <span
                  className={
                    apiStatus === "ok"
                      ? "text-green-400"
                      : apiStatus === "error"
                        ? "text-destructive"
                        : "text-muted-foreground"
                  }
                >
                  {apiStatus === "checking"
                    ? "a verificar..."
                    : apiStatusMessage || "sem dados"}
                </span>
              </p>
            </div>
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>
                A API usada e {API_NOTE}. {API_BASE === "/api" ? "Requests passam pelo proxy /api para evitar mixed content." : null}
              </p>
              <p>Atualiza VITE_API_URL para um endpoint HTTPS ou mantem vazio para usar o proxy.</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
