import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing.jsx";
import Home from "./pages/Home/Home.jsx";
import RotaPrivada from "../src/Componentes/Rotas/RotaPrivada.jsx";
import MapaCultura from "./pages/MapaCultura/MapaCultura.jsx";
import Admin from "./pages/Admin/Admin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/MapaCulturas"
          element={
            <RotaPrivada>
              <MapaCultura />
            </RotaPrivada>
          }
        ></Route>

        <Route
          path="/Home"
          element={
            <RotaPrivada>
              <Home />
            </RotaPrivada>
          }
        />
        <Route
          path="/PainelAdmin"
          element={
            <RotaPrivada>
              <Admin />
            </RotaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
