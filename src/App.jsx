import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing.jsx";
import Home from "./pages/Home/Home.jsx";
import RotaPrivada from "../src/Componentes/Rotas/RotaPrivada.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="https://hfapassagemdeplantao.netlify.app/" element={<Landing />} />

        <Route
          path="/Home"
          element={
            <RotaPrivada>
              <Home />
            </RotaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
