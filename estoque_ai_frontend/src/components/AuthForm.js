'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Formulários de autenticação
 *
 * Formuário reusável para login e cadastro
 * Lida com submits, validações e mostra erros
 * 
 * @param {Object} props - As props do Component
 * @param {boolean} props.isLogin
 * @param {string} props.apiEndpoint
 * @param {string} props.redirectPath - Path pra redirecionar após conseguir fazer um submit
 * @param {string} props.successMessage - Caso seja sucesso, essa é a mensagem
 */
export default function AuthForm({ isLogin, apiEndpoint, redirectPath, successMessage }) {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  /**
   * Lida com o submit do form
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = {
      email: email,
      senha: senha,
    };

    if (!isLogin) {
      formData.nome = nome;
      formData.matricula = matricula;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Alguma coisa deu errado");
      }

      // Pro login, vamos armazenar o token JWT 
      if (isLogin) {
        const ONE_HOUR = 3600000;
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('token_expire', new Date().getTime() + ONE_HOUR);
      }

      // Mostra a mensagem de sucesso e redireciona a página
      const UM_SEGUNDO_E_MEIO = 1500;
      setSuccess(successMessage || "Sucesso! Redirecionando...");
      setTimeout(() => {
        router.push(redirectPath || '/');
      }, UM_SEGUNDO_E_MEIO);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2x1 font-bold text-center mb-6">
        {isLogin ? 'Login' : 'Cadastro'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="mb-4">
              <label htmlFor="nome" className="block text-gray-700 mb-2">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                className=
                "w-full px-3 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="matricula" className="block text-gray-700 mb-2">
                Matrícula
              </label>
              <input
                type="text"
                id="matricula"
                name="matricula"
                value={matricula}
                onChange={e => setMatricula(e.target.value)}
                className=
                "w-full px-3 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className=
            "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="senha" className="block text-gray-700 mb-2">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className=
            "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            minLength="8"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className=
          "w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Processando..." : isLogin ? "Fazer Login" : "Cadastrar"}
        </button>
      </form>

      <div className="mt-4 text-center">
        {isLogin ? (
          <p className="text-gray-600">
            Não possui uma conta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Cadastre-se aqui!
            </a>
          </p>
        ) : (
          <p className="text-gray-600">
            Já tem uma conta?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Faça o Login aqui!
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
