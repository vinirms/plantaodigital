import { useState } from "react";
import api from "../../Services/Api";

const useBuscarFiltrarPacientesHome = () => {
  const [resultadosBuscaFiltroHome, setResultadosBuscaFiltroHome] = useState(
    [],
  );
  // const setor = localStorage.getItem("setor");

  const buscarPacientesIniciaisHome = async (setor) => {
    if (setor !== "CCIH") {
      try {
        const response = await api.get(`/api/Paciente/setor/${encodeURIComponent(setor)}`);

        setResultadosBuscaFiltroHome(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filtrarPacientesHome = async ({ enfLeito, nomePaciente, setor }) => {
    try {
      const response = await api.get(`/api/Paciente/filtrar`, {
        params: {
          enfLeito: enfLeito || null,
          nome: nomePaciente || null,
          setorLogin: setor,
        },
      });

      setResultadosBuscaFiltroHome(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setResultadosBuscaFiltroHome([]); // lista vazia
      } else {
        console.error(error);
        setErroBuscaFiltroHome(error);
      }
    }
  };
  return {
    buscarPacientesIniciaisHome,
    resultadosBuscaFiltroHome,
    filtrarPacientesHome,
  };
};

export default useBuscarFiltrarPacientesHome;
