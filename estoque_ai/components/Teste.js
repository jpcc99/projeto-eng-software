import { useEffect, useState } from "react";

export default function Test() {
    const [msg, setMsg] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);


    useEffect(() => {
        fetch(`http://localhost:5000`)
            .then(res => res.json())
            .catch(err => {
            console.error(err);
        setHasError(true);
        })
        .then(data => {
            console.log(data);
            setLoading(false);
            setMsg(data);
        });
    }, []);

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (hasError) {
    return <p>Algo não saiu como esperado! Erro: {hasError}</p>
  }

  return (
    <div>
        <p>Mensagem: {msg}</p>
    </div>
  )
}