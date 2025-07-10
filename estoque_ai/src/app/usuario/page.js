"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import styles from "./usuario.module.css";

export default function UsuarioPage() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getUsuarios(); // essa função deve existir no lib/api
        setUsuarios(data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Usuários Cadastrados</h1>
      <ul className={styles.list}>
        {usuarios.map((u) => (
          <li key={u.id} className={styles.item}>
            <strong>{u.nome}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
