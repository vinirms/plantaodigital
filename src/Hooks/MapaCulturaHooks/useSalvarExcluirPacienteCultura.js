import { useState } from "react";
import axios from "axios";
import api from "../../Services/Api";

const useSalvarExcluirPacienteCultura = (modalMode) => {
  const [
    erroSalvarEditExcluirPacienteCultura,
    setErroSalvarEditExcluirPacienteCultura,
  ] = useState();
  const [notificacao, setNotificacao] = useState({
    aberto: false,
    tipo: "success", // success | error | warning
    mensagem: "",
  });
  const mostrarNotificacao = (tipo, mensagem) => {
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

  
  const salvarPaciente = async (form) => {

  
    try {
      if (modalMode === "create") {
        await api.post(`/api/MapaCulturas`, form);

        mostrarNotificacao("success", "Paciente cadastrado com sucesso");
      }

      if (modalMode === "edit") {
        await api.put(`/api/MapaCulturas/${form.nomePaciente}`, form);
        mostrarNotificacao("success", "Paciente atualizado com sucesso");
      }

      return true

    } catch (error) {
      // console.log(error);
      // setErroSalvarEditExcluirPacienteCultura(error.response?.data);
      // console.log(error.response?.status);
      // mostrarNotificacao("error", "Erro ao salvar paciente"); // ✅ avisa o usuário
      console.log("❌ Erro status:", error.response?.status);
      console.log("❌ Resposta da API:", JSON.stringify(error.response?.data, null, 2)); // 👈 e aqui
      setErroSalvarEditExcluirPacienteCultura(error.response?.data);
      mostrarNotificacao("error", "Erro ao salvar paciente");
      
      return false

    }
  };

  const excluirPaciente = async (dados) => {
    // console.log(dados.nomePaciente)
    try {
      await api.delete(`/api/MapaCulturas/${dados.id}`);

      mostrarNotificacao("success", "Paciente excluido com sucesso");
      
      return true
    } catch (error) {
      console.error(error);
      console.error(error.response?.data);

      setErroSalvarEditExcluirPacienteCultura(error.response?.data);
      mostrarNotificacao("error", "Erro ao excluir paciente");
      return false

    } finally {
    }
  };

  return {
    notificacao,
    salvarPaciente,
    excluirPaciente,
    setNotificacao,
    mostrarNotificacao,
  };
};

export default useSalvarExcluirPacienteCultura;
