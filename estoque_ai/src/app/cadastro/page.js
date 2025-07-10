"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";
import styles from "./cadastro.module.css";


export default function RegistrarPage() {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
    cpf: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.registrar(
        formData.nome,
        formData.matricula,
        formData.cpf,
        formData.email,
        formData.senha
      );
      router.push("/login");
    } catch (err) {
      setErro(err.message);
    }
  };

 return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="nome" placeholder="Nome" onChange={handleChange} className={styles.input} />
        <input name="matricula" placeholder="Matrícula" onChange={handleChange} className={styles.input} />
        <input name="cpf" placeholder="CPF" onChange={handleChange} className={styles.input} />
        <input name="email" placeholder="Email" onChange={handleChange} className={styles.input} />
        <input name="senha" placeholder="Senha" type="password" onChange={handleChange} className={styles.input} />
        <button type="submit" className={styles.button}>Registrar</button>
        {erro && <p className={styles.erro}>{erro}</p>}
      </form>
    </div>
  );
}
