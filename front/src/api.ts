const baseURL = process.env.API_URL ?? "http://localhost:5000";

export interface Subject {
  id?: string;
  name: string;
  totalTime: number;
  actualTime: number;
}

// Função para pegar o token do localStorage e montar o header Authorization
function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (email: string, password: string, name: string) => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    return response.json();
  },
};

export const api = {
  get: async () => {
    const response = await fetch(`${baseURL}/subjects`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  post: async (data: Subject) => {
    const response = await fetch(`${baseURL}/subjects`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  put: async (data: Subject, id: string) => {
    const response = await fetch(`${baseURL}/subjects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${baseURL}/subjects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

export default api;
