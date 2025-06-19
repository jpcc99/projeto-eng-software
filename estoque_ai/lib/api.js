const API_URL = "http://localhost:3001";

export const api = {
    login: async (email, senha) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, senha}),
        });
        return response.json();
    },

    registar: async (
        nome,
        matricula,
        cpf,
        email,
        senha,
    ) => {
        const response = await fetch(`${API_URL}/registrar`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                matricula,
                nome,
                cpf,
                email,
                senha
            })
        });
        return response.json();
    }
}