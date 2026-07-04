import { useState } from "react";
import api from "../../Services/Api";

const useBuscarLogsAdmin = () => {
  const [resultadosBuscaLogs, setResultadosBuscaLogs] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const buscarLogsSystem = async (paginaAtual = 1) => {
    try {
      const response = await api.get(`/api/Admin/Logs`, {
        params: { pagina: paginaAtual, itensPorPagina: 20 }
      });

      setResultadosBuscaLogs(response.data.dados);
      setTotalPaginas(response.data.totalPaginas);
      setPagina(paginaAtual);
    } catch (error) {
      console.error(error.data);
    }
  };

  return {
    resultadosBuscaLogs,
    setResultadosBuscaLogs,
    buscarLogsSystem,
    pagina,
    totalPaginas,
  };
};

export default useBuscarLogsAdmin;