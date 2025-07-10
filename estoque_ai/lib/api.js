const API_URL = "http://localhost:3001/api";

export const api = {
  login: async (email, senha) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao fazer login");
    }

    return response.json();
  },

  registrar: async (nome, matricula, cpf, email, senha) => {
    const response = await fetch(`${API_URL}/auth/cadastro`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, matricula, cpf, email, senha }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao registrar");
    }

    return response.json();
  },

  // 👇👇👇 ADICIONAR ISSO ABAIXO

  getUsuarios: async () => {
    const response = await fetch(`${API_URL}/usuario`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao carregar usuários");
    }
    return response.json();
  },

  getMateriais: async () => {
    const response = await fetch(`${API_URL}/material`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao carregar materiais");
    }
    return response.json();
  },

  criarMaterial: async (material) => {
    const response = await fetch(`${API_URL}/material`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(material),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao criar material");
    }
    return response.json();
  },
};
