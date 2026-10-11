const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5111/api";

export type SignInData = {
  email: string;
  senha: string;
};

export type SignUpData = {
  name: string;
  email: string;
  senha: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthResponse = {
  token?: string;
  user?: AuthUser;
};

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : "Erro ao conectar com a API";
    throw new Error(message);
  }

  return data as T;
}

export async function GetMe(token : string) {
  return request<AuthUser>("/user/me", {
    method:"GET",
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })
}

export async function SignIn({ email, senha }: SignInData) {
  return request<AuthResponse>("/user/login", {
    method: "POST",
    body: JSON.stringify({ email: email, password: senha }),
  });
}

export async function SignUp({ name, email, senha }: SignUpData) {
  return request<AuthResponse>("/user", {
    method: "POST",
    body: JSON.stringify({ name: name, email: email, password: senha }),
  });
}
