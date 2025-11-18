import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const TOKEN_KEY = "glowmax_admin_token";
const PROFILE_KEY = "glowmax_admin_profile";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@teuapp.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const loginBody = new URLSearchParams();
      loginBody.append("username", email);
      loginBody.append("password", password);

      const loginResponse = await fetch(`${API_BASE}/auth/login`, {
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
      const meResponse = await fetch(`${API_BASE}/users/me`, {
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
      setError(err instanceof Error ? err.message : "Erro inesperado no login.");
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
            <p className="text-xs text-muted-foreground text-center">
              A API usada e {API_BASE || "a mesma origem do site"}. Atualiza a variavel VITE_API_URL para apontar para
              producao.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
