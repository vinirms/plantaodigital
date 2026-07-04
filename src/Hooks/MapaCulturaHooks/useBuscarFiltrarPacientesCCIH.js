import { useState } from "react";
import axios from "axios";
import api from "../../Services/Api";

const useBuscarPacientesCCIH = (UrlApi) => {
  const [resultadosBuscaFiltroCCIH, setResultadosBuscaFiltroCCIH] = useState(
    [],
  );
  const [erroBuscaCCIH, setErroBuscaCCIH] = useState(null);
  const [erroFiltroCCIH, setErroFiltroCCIH] = useState(null);

  const buscarTodosPacientesCCCIH = async () => {
    setErroBuscaCCIH(null);

    try {
      const response = await api.get(`/api/MapaCulturas`);

      setResultadosBuscaFiltroCCIH(response.data);
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
      console.log(error.response?.data);

      setErroBuscaCCIH(error);
    }
  };

 const buscarPacientesSetorCCCIH = async (setor) => {
    setErroBuscaCCIH(null);

    try {
      const response = await api.get(`/api/MapaCulturas/setor/${setor}`);

      setResultadosBuscaFiltroCCIH(response.data);
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
      console.log(error.response?.data);

      setErroBuscaCCIH(error);
    }
  };
  const filtrarPacienteCCIH = async ({ enfLeito, nomePaciente,setor }) => {
    // console.log(enfLeito,nomePaciente)
    setErroBuscaCCIH(null);

    try {
      const res = await api.get(`/api/MapaCulturas/filtrar`, {
        params: {
          enfLeito: enfLeito || null,
          nome: nomePaciente || null,
          setor: setor || null,
        },
      });
      // console.log(res.data)
      setResultadosBuscaFiltroCCIH(res.data);
      return true
    } catch (err) {
      console.error("Erro ao buscar paciente:", err);
      setErroFiltroCCIH(err);
    }
  };

  const buscaModalListaPacientes = async (formPaciente) => {
    setErroBuscaCCIH(null);
    try {
      const res = await api.get(`/api/MapaCulturas/Busca/`, {
        params: {
          enfLeito: formPaciente.enfLeito || null,
          nome: formPaciente.nomePaciente || null,
        },
      });

      setResultadosBuscaFiltroCCIH(res.data);
    } catch (err) {
      console.error("Erro ao buscar paciente:", err);
    } finally {
    }
  };

  return {
    resultadosBuscaFiltroCCIH,
    erroBuscaCCIH,
    buscarTodosPacientesCCCIH,
    buscarPacientesSetorCCCIH,
    erroFiltroCCIH,
    filtrarPacienteCCIH,
    buscaModalListaPacientes,
    setResultadosBuscaFiltroCCIH,
  };
};

export default useBuscarPacientesCCIH;
