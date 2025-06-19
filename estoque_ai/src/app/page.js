"use client";

import { useRouter } from "next/navigation";
import styles from "./home.module.css";

export default function Home(){
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login")
  };

  const goToCadastro = () => {
    router.push("/cadastro")
  };

  return(
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo ao Estoque_ai</h1>
      <p>Escolha uma opção abaixo:</p>
      <div className={styles.buttons}>
        <button onClick={goToLogin} className={styles.button}>
          Login
        </button>
        <button onClick={goToCadastro} className={styles.button}>
          Cadastro
        </button>
      </div>
    </div>
  )
}