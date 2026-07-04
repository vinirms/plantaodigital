// ─────────────────────────────────────────────────────────────
// api.js — instância global do axios com refresh token automático
// Importe este arquivo em vez de usar axios diretamente
//
// Uso:
//   import api from './api';
//   const response = await api.get('/api/qualquerRota');
// ─────────────────────────────────────────────────────────────

import axios from "axios";

const UrlApi = import.meta.env.VITE_REACT_APP_API_URL; // ou sua variável de ambiente

const api = axios.create({
  baseURL: UrlApi,
  withCredentials: true, // ✅ envia e recebe cookies HttpOnly automaticamente
});

// ✅ Interceptor de resposta — renova o access token automaticamente quando expira
// api.interceptors.response.use(
//   (response) => response, // resposta OK — passa direto

//   async (error) => {
//     const requisicaoOriginal = error.config;

//     // Se recebeu 401 e ainda não tentou o refresh (evita loop infinito)
//     if (error.response?.status === 401 && !requisicaoOriginal._retry) {
//       requisicaoOriginal._retry = true;

//       try {
//         // Chama o endpoint de refresh — o cookie refresh_token vai automaticamente
//         await api.post("/api/auth/refresh");

//         // ✅ Repete a requisição original com o novo access token no cookie
//         return api(requisicaoOriginal);
//       } catch {
//         // Refresh também falhou (sessão de 12h expirou) — redireciona pro login
//         window.location.href = "/";
//       }
//     }

//     return Promise.reject(error);
//   },
// );
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const requisicaoOriginal = error.config;

    // ✅ Ignora rotas de autenticação — não tenta refresh nelas
    const isAuthRoute =
      requisicaoOriginal.url.includes("/api/auth/login") ||
      requisicaoOriginal.url.includes("/api/auth/refresh");

    if (error.response?.status === 401 && !requisicaoOriginal._retry && !isAuthRoute) {
      requisicaoOriginal._retry = true;

      try {
        await api.post("/api/auth/refresh");
        return api(requisicaoOriginal);
      } catch {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
