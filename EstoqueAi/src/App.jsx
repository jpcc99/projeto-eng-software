import { BrowserRouter, Routes, Route,} from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Estoque from "./pages/Estoque";


function App() {
  const [estoque, setEstoque] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route
          path="/estoque"
          element={<Estoque estoque={estoque} setEstoque={setEstoque}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
