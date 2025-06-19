"use client";

import { useState } from "react";
import styles from "./materiais.module.css";

const materiaisPossiveis = [
  "Piloto",
  "Apagador",
  "Caixa de som",
  "Fitas",
  "Caneta",
];

const statusPossiveis = [
  "Pendente",
  "Novo",
  "Entregue",
];

export default function MateriaisPage() {
  const [materiais, setMateriais] = useState([]);

  const [formData, setFormData] = useState({
    nome: materiaisPossiveis[0],
    quantidade: "",
    status: statusPossiveis[0],
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nome = formData.nome;
    const quantidade = parseInt(formData.quantidade);
    const status = formData.status;

    if (!nome || isNaN(quantidade) || quantidade < 0 || !status) {
      alert("Preencha corretamente todos os campos");
      return;
    }

    if (editId !== null) {
      setMateriais((prev) =>
        prev.map((mat) =>
          mat.id === editId ? { ...mat, nome, quantidade, status } : mat
        )
      );
      setEditId(null);
    } else {
      const novoId = materiais.length
        ? Math.max(...materiais.map((m) => m.id)) + 1
        : 1;
      setMateriais((prev) => [...prev, { id: novoId, nome, quantidade, status }]);
    }

    setFormData({
      nome: materiaisPossiveis[0],
      quantidade: "",
      status: statusPossiveis[0],
    });
  };

  const handleEdit = (id) => {
    const mat = materiais.find((m) => m.id === id);
    if (mat) {
      setFormData({
        nome: mat.nome,
        quantidade: mat.quantidade.toString(),
        status: mat.status,
      });
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Tem certeza que quer excluir este material?")) {
      setMateriais((prev) => prev.filter((m) => m.id !== id));
      if (editId === id) {
        setEditId(null);
        setFormData({
          nome: materiaisPossiveis[0],
          quantidade: "",
          status: statusPossiveis[0],
        });
      }
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({
      nome: materiaisPossiveis[0],
      quantidade: "",
      status: statusPossiveis[0],
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Materias </h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Material:
          <select
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={styles.select}
          >
            {materiaisPossiveis.map((mat) => (
              <option key={mat} value={mat}>
                {mat}
              </option>
            ))}
          </select>
        </label>

        <label>
          Quantidade:
          <input
            type="number"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            min="0"
            required
            className={styles.input}
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.select}
          >
            {statusPossiveis.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className={styles.button}>
          {editId !== null ? "Salvar" : "Adicionar"}
        </button>

        {editId !== null && (
          <button type="button" onClick={handleCancel} className={styles.buttonCancel}>
            Cancelar
          </button>
        )}
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Material</th>
            <th>Quantidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {materiais.map((mat) => (
            <tr key={mat.id}>
              <td>{mat.id}</td>
              <td>{mat.nome}</td>
              <td>{mat.quantidade}</td>
              <td>{mat.status}</td>
              <td>
                <button onClick={() => handleEdit(mat.id)} className={styles.buttonSmall}>
                  Editar
                </button>
                <button onClick={() => handleDelete(mat.id)} className={styles.buttonSmallDelete}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {materiais.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Nenhum material cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
