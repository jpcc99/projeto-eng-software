"use client";

import styles from "./usuario.module.css";
import { useRouter } from "next/navigation";

export default function UsuarioPage(){
    
    const router = useRouter();

    const handleGoToMateriais = () => {
        router.push("/materias")
    };

    return (
        <div className= {styles.container}>
            <h1 className={styles.title}> Bem vindo, Usúario!</h1>
            <p> jaja tem mais</p>
            <button className={styles.button} onClick={handleGoToMateriais}>
                materias
            </button>
        </div>
    )
}