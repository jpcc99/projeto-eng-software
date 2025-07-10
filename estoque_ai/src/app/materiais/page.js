"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import styles from "./materiais.module.css";

export default function MateriaisPage() {
  const [materiais, setMateriais] = useState([]);
  const [form, setForm] = useState({ nome: "", quantidade: "" });

  useEffect(() => {
    carregarMateriais();
  }, []);

  const carregarMateriais = async () => {
    try {
      const data = await api.getMateriais(); // precisa estar definido no lib/api
      setMateriais(data);
    } catch (err) {
      console.error("Erro ao carregar materiais:", err.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.criarMaterial({ ...form, status: "disponível" });
      setForm({ nome: "", quantidade: "" });
      carregarMateriais();
    } catch (err) {
      console.error("Erro ao criar material:", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Materiais</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          name="quantidade"
          placeholder="Quantidade"
          value={form.quantidade}
          onChange={handleChange}
          type="number"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Adicionar</button>
      </form>

      <ul className={styles.list}>
        {materiais.map((m) => (
          <li key={m.id} className={styles.item}>
            {m.nome} — {m.quantidade} unidades — <em>{m.status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
