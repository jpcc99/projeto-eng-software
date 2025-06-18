import EntradaDeItem from "../components/EntradaDeItem";

import { Link } from "react-router-dom";

function Estoque({ estoque, setEstoque }) {
  return (
    <div>
      <header>
        <h1>EstoqueAi - Controle de Estoque</h1>
        <nav>
          <Link to="/">Sair</Link>
        </nav>
      </header>

      <section>
        <h2>Entrada de Itens</h2>
        <EntradaDeItem estoque={estoque} setEstoque={setEstoque} />
      </section>

      <hr />

      <section>
        <h2>Saída de Itens</h2>
        <SaidaDeItem estoque={estoque} setEstoque={setEstoque} />
      </section>

      <hr />

      <section>
        <h2>Estoque Atual</h2>
        <EstoqueAtual estoque={estoque} />
      </section>
    </div>
  );
}

export default Estoque;
