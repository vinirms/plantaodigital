import { useState } from "react";
import axios from "axios";
import api from "../../Services/Api";

const useSalvarExcluirPacientesHome = (UrlApi) => {
  const [notificacaoHook, setNotificacao] = useState({
    aberto: false,
    tipo: "success", // success | error | warning
    mensagem: "",
  });
  const mostrarNotificacaoHook = (tipo, mensagem) => {
    setNotificacao({
      aberto: true,
      tipo,
      mensagem,
    });

    // fecha sozinho após 2.5s
    setTimeout(() => {
      setNotificacao((n) => ({ ...n, aberto: false }));
    }, 2500);
  };

  const salvarPacienteHome = async (dados, modalMode) => {
    try {
      if (modalMode === "create") {
        await api.post(`/api/Paciente`, dados);
      }
      if (modalMode === "edit") {
        await api.put(`/api/Paciente/${dados.id}`, dados);
      }

      mostrarNotificacaoHook("success", "Salvo com sucesso!");
      
      return true; // ✅ sucesso
    } catch (error) {
      const data = error.response?.data;
      // console.log("data:", error.response?.data);
      console.log("errors:", error.response?.data?.errors);
      console.log("tipo:", typeof error.response?.data?.errors);
      if (data) {
        const primeiraMensagem = Object.values(data)[0]?.[0];
        if (primeiraMensagem) {
          mostrarNotificacaoHook("error", primeiraMensagem);
          return false;
        }
      }

      mostrarNotificacaoHook("error", "Erro ao salvar paciente.");
      return false;
    }
  };

  const excluirPacienteHome = async (id) => {
    try {
      await api.delete(`/api/Paciente/${id}`);

      mostrarNotificacaoHook("success", "Paciente excluido com sucesso");
      return true; // ✅ sucesso

    } catch (error) {
      console.error(error);
          return false;

    }
  };

  const salvarPacienteHomeNutri = async (dados, modalMode) => {
      console.log(dados,modalMode)

    try {
        //await api.post(`/api/Paciente/Nutricao`, dados);

     if (modalMode === "create") {
        await api.post(`/api/Paciente/Nutricao`, dados);
      }

      if (modalMode === "edit") {
        await api.put(`/api/Paciente/Nutricao/${dados.nomePaciente}`, dados);
      }
      mostrarNotificacaoHook("success", "Salvo com sucesso!");

      return true; // ✅ sucesso

    } catch (error) {
      
     const data = error.response?.data;
      console.log("data:", error.response?.data);
      console.log("errors:", error.response?.data?.errors);
      console.log("tipo:", typeof error.response?.data?.errors);
      if (data) {
        const primeiraMensagem = Object.values(data)[0]?.[0];
        if (primeiraMensagem) {
          mostrarNotificacaoHook("error", primeiraMensagem);
          return false;
        }
      }

      mostrarNotificacaoHook("error", "Erro ao salvar paciente.");
      return false;
    
    }

  };
  return {
    salvarPacienteHome,
    salvarPacienteHomeNutri,
    notificacaoHook,
    mostrarNotificacaoHook,
    excluirPacienteHome,
  };
};

export default useSalvarExcluirPacientesHome;
