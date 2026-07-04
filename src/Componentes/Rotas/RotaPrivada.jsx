import { Navigate } from "react-router-dom";

export default function RotaPrivada({ children }) {
  const setor = localStorage.getItem("setor"); // ✅ setor ainda está no localStorage

  if (!setor) {
    return <Navigate to="/" replace />;
  }

  return children;
}
