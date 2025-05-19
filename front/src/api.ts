const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export interface Subject {
  id?: string;
  name: string;
  totalTime: number;
  actualTime: number;
}

export const api = {
  get: async () => {
    const response = await fetch(`${baseURL}/subjects`);
    return response.json();
  },

  post: async (data: Subject) => {
    const response = await fetch(`${baseURL}/subjects`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },

  put: async (data: Subject, id: string) => {
    const response = await fetch(`${baseURL}/subjects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${baseURL}/subjects/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

export default api;
