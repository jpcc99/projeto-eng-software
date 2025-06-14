import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Cadastro.module.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("Matrícula:", matricula);
    alert("Cadastro realizado (simulado)");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Nome:</label>
          <input
            type="text"
            className={styles.input}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Senha:</label>
          <input
            type="password"
            className={styles.input}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Matrícula:</label>
          <input
            type="text"
            className={styles.input}
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Cadastrar</button>
        <div className={styles.link}>
          <p>Já tem conta? <Link to="/">Faça login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;

