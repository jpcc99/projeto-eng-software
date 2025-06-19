"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./cadastro.module.css";
import { api } from "../../../lib/api";

export default function CadastroPage() {
    const router = useRouter();

    const [loading, setIsLoading] = useState(false);
    const [registroError, setError] = useState("");
    const [formData, setFormData] = useState({
        nome: "",
        matricula: "",
        cpf: "",
        email: "",
        senha: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.senha) {
            setError("Preencha todos os campos");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Por favor, insira um e-mail válido");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const userData = await api.registar(
                formData.nome,
                formData.matricula,
                formData.cpf,
                formData.email,
                formData.senha,
            );
            router.push("/login");
        } catch (err) {
            setError(err.message || "Erro ao fazer cadastro");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cadastro</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    name="matricula"
                    placeholder="Matrícula"
                    value={formData.matricula}
                    onChange={handleChange}
                    required
                    className={styles.input}

                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>
                    Cadastrar
                </button>

            </form>
        </div>
    );
}
