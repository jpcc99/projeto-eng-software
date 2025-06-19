"use client";
import { useState } from "react";
import styles from "./cadastro.module.css";

export default function CadastroPage() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        matricula: "",
        senha: "",
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados cadastrados:", formData)
        alert("Cadastro realizado com sucesso!")

        //limpa o form
        setFormData({
            nome: "",
            email: "",
            matricula: "",
            senha: "",
        });
    };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
            type = "text"
            name = "nome"
            placeholder="Nome"
            value = {formData.nome}
            onChange = {handleChange}
            required
            className={styles.input}
        />
        <input
            type = "email"
            name = "email"
            placeholder="E-mail"
            value={formData.email}
            onChange = {handleChange}
            required
            className={styles.input}
        />
        <input
            type="text"
            name = "matricula"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={handleChange}
            required
            className={styles.input}

        />
        <input
            type="password"
            name = "senha"
            placeholder="Senha"
            value={formData.senha}
            onChange = {handleChange}
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
