"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [LoginScreen, setLoginScreen] = useState(true);


  const [signInEmail, setSignInEmail] = useState("");
  const [signInSenha, setSignInSenha] = useState("");
  const [signUpNome, setSignUpNome] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpSenha, setSignUpSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ClassScreen = LoginScreen ? "LoginScreen" : "LoginScreen active";

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(signInEmail, signInSenha);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signUp(signUpNome, signUpEmail, signUpSenha);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-row w-full h-screen relative">
      <header className="fixed z-20 p-5">
        <Link
          href="/"
          className="shrink-0 font-display text-lg leading-none tracking-wide transition hover:text-gold sm:text-2xl"
          style={{ color: LoginScreen ? "#000" : "#fff" }}
        >
          PONTO DA FARRA
        </Link>
      </header>
      <div className="flex w-1/2 h-full items-center justify-center">
        <form
          onSubmit={handleSignIn}
          className="flex flex-col max-w-2xl font-bold gap-4"
        >
          <label htmlFor="signin-email">Digite seu email</label>
          <input
            className="w-72 h-12 rounded-xl"
            id="signin-email"
            type="email"
            placeholder="exemplo@exemplo.com"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            required
          />
          <label htmlFor="signin-senha">Digite sua senha</label>
          <input
            className="w-72 h-12 rounded-xl"
            id="signin-senha"
            type="password"
            placeholder="Senha"
            value={signInSenha}
            onChange={(e) => setSignInSenha(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className="h-10 gold-gradient rounded-xl disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <input
            className="text-sm opacity-50 hover:opacity-70"
            type="button"
            value="Não tenho uma conta"
            onClick={() => {
              setLoginScreen((prev) => !prev);
            }}
          />
        </form>
      </div>
      <div className={`absolute z-10 w-1/2 h-full bg-black ${ClassScreen}`} />
      <div className="flex w-1/2 h-full items-center justify-center">
        <form
          onSubmit={handleSignUp}
          className="flex flex-col max-w-2xl font-bold gap-4"
        >
          <label htmlFor="signup-name">Digite seu nome</label>
          <input
            className="w-72 h-12 rounded-xl"
            id="signup-name"
            type="text"
            placeholder="Nome"
            value={signUpNome}
            onChange={(e) => setSignUpNome(e.target.value)}
            required
          />
          <label htmlFor="signup-email">Digite seu email</label>
          <input
            className="w-72 h-12 rounded-xl"
            id="signup-email"
            type="email"
            placeholder="exemplo@exemplo.com"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            required
          />
          <label htmlFor="signup-senha">Digite sua senha</label>
          <input
            className="w-72 h-12 rounded-xl"
            id="signup-senha"
            type="password"
            placeholder="Senha"
            value={signUpSenha}
            onChange={(e) => setSignUpSenha(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className="h-10 gold-gradient rounded-xl disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar"}
          </button>
          <input
            className="text-sm opacity-50 hover:opacity-70"
            type="button"
            value="Já tenho uma conta"
            onClick={() => {
              setLoginScreen((prev) => !prev);
            }}
          />
        </form>
      </div>
      {error && (
        <p className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-xl bg-red-500 px-4 py-2 font-bold text-white">
          {error}
        </p>
      )}
    </main>
  );
}
