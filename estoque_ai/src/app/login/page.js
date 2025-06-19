"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";


export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        senha: "",
    });
    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        //login sucessido
        if(formData.email && formData.senha){
            console.log("Login realizado:", formData);
            alert("Login realizado com sucesso!");

            //redirecionar para pagina usuario
            router.push("/usuario")
        } else{
            alert("Preencha todos os campos");
        }
    };

    return(
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
