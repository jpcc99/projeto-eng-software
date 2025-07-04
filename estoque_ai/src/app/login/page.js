"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { api } from "../../../lib/api";


export default function LoginPage() {
    const router = useRouter();

    const [loginError, setError] = useState('');
    const [loading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
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
            const userData = await api.login(formData.email, formData.senha);
            // Em produção, armazena o token JWT
            localStorage.setItem('usuario', JSON.stringify(userData));
            router.push("/usuario");
        } catch (err) {
            setError(err.message || "Erro ao fazer login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                    type="password"
                    name="senha"
                    placeholder="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>
                    Entrar
                </button>

            </form>
        </div>
    );
}
