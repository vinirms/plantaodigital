import React, { useEffect, useState, useCallback } from "react";
import {
  Botoes,
  BtnFiltrarPacientesMapaCultura,
  BtnGerarPDFMapaCultura,
  BtnInformacoesPacienteMapaCultura,
  Btnlogout,
  BtnNovoPacienteMapaCultura,
  BtnReloadPacientesMapaCultura,
  CampoFiltroEnfLeito,
  CampoFiltroNome,
  CampoFiltroSetores,
  ContainerFiltros,
  FiltroEnf,
  FiltroNome,
  FlowLista,
  Main,
  MainContainer,
  NavCampos,
  NavDiv,
} from "./MapaCulturaStyle";

import ModalCCIH from "../../Componentes/ModalCCIH/ModalCCIH";
import riosaude from "../../assets/Images/RIOSD.png";
import homeIco from "../../assets/Images/Home.ico";
import logout from "../../assets/Images/Logout.ico";
import busca from "../../assets/Images/Search.ico";
import reload from "../../assets/Images/recarregar.ico";
import { useNavigate } from "react-router-dom";
import ModalLoading from "../../Componentes/ModalLoading/ModalLoading";
import CardCCIH from "../../Componentes/CardCCIH/CardCCIH";
import ModalNotificacao from "../../Componentes/ModalNotificacao/ModalNotificacao";

import useBuscarFiltrarPacientesCCIH from "../../Hooks/MapaCulturaHooks/useBuscarFiltrarPacientesCCIH";
import useSalvarExcluirPacienteCultura from "../../Hooks/MapaCulturaHooks/useSalvarExcluirPacienteCultura";
import ModalSelectPdfMapa from "../../Componentes/ModalSelectPdfMapa/ModalSelectPdfMapa";
import api from "../../Services/Api";
import ModalCCIHInfo from "../../Componentes/ModalCCIHInfo/ModalCCIHInfo";

const MapaCultura = () => {
  const [filtroEnfLeito, setFiltroEnfLeito] = useState("");
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroSetor, setFiltroSetor] = useState("");

  const [modalCcihOpen, setModalCcihOpen] = useState(false);
  const [modalCcihPdfOpen, setModalCcihPdfOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [btnPdfCulturaLoading, setBtnPdfCulturaLoading] = useState(false);
  const setor = localStorage.getItem("setor");
  const profissional = localStorage.getItem("profissional"); // ✅ setor ainda está no localStorage
   // ✅ setor ainda está no localStorage
  const [loading, setLoading] = useState(false);
  const [modalInfoOpen, setmodalInfoOpen] = useState("");

  const navigate = useNavigate();

  const {
    notificacao,
    salvarPaciente,
    excluirPaciente,
    mostrarNotificacao,
    erroSalvarEditExcluirPacienteCultura,
  } = useSalvarExcluirPacienteCultura(modalMode);

  const {
    resultadosBuscaFiltroCCIH,
    erroBuscaCCIH,
    buscarTodosPacientesCCCIH,
    buscarPacientesSetorCCCIH,
    filtrarPacienteCCIH,
  } = useBuscarFiltrarPacientesCCIH();

  // Carrega dados iniciais

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
    if(setor == "CCIH"){

      await buscarTodosPacientesCCCIH();

    } else {
      await buscarPacientesSetorCCCIH(setor);

    }
      setLoading(false);
    };

    carregar();
  }, []);

  // Redireciona em caso de erro
  useEffect(() => {
    if (erroBuscaCCIH) {
      mostrarNotificacao("error", "Erro ao carregar dados");
      navigate("/Home");
    }
  }, [erroBuscaCCIH]);

  // ✅ Otimizado com useCallback
  const handleSalvar = useCallback(
    async (form) => {
      if (
        !form.enfLeito?.trim() ||
        !form.nomePaciente?.trim() ||
        !form.setor?.trim()
      ) {
        mostrarNotificacao("error", "Preencha Enf/Leito, Nome e Setor!");
        return;
      }
      // console.log(form)
      setLoading(true);
      try {
        // console.log(form)
        const payloadBase = {
            ...form,
            chaveComposta: `${form.enfLeito}-${form.setor}`,
        };

        const sucesso =  await salvarPaciente(payloadBase);

        if(sucesso){
            setModalCcihOpen(false);
            buscarTodosPacientesCCCIH();
        }
        
         // Recarrega lista
      } catch (error) {
        mostrarNotificacao("error", error.response?.data);
      } finally {
        setLoading(false);
      }
    },
    [salvarPaciente, mostrarNotificacao],
  );

  const handleFiltrar = async () => {
    setLoading(true);
    try {
      const sucesso = await filtrarPacienteCCIH({
        enfLeito: filtroEnfLeito.trim(),
        nomePaciente: filtroNome.trim(),
        setor: filtroSetor.trim(),
        
      });

      if(sucesso){
        console.log(sucesso)
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async (dados) => {
    if (!window.confirm("Deseja realmente excluir este registro?")) return;

    setLoading(true);
    try {

      const sucesso = await excluirPaciente(dados);

      if(filtroSetor !== "" && sucesso){
        
         buscarPacientesSetorCCCIH(); 
       
       
      }else{
         buscarTodosPacientesCCCIH();
       
      }
       
    } catch (error) {
      mostrarNotificacao("error", "Erro ao excluir");
    } finally {
      setLoading(false);
      setModalCcihOpen(false);
    }
  };

  const handleReset = async () => {
    setFiltroEnfLeito("");
    setFiltroNome("");
    setFiltroSetor("");

    setLoading(true);
    try {
      await buscarTodosPacientesCCCIH();
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("setor");
    navigate("/");
  };

  const abrirDetalhes = (cultura) => {
    setModalMode("edit");
    setModalCcihOpen(true);
    setPacienteSelecionado(cultura);
  };

  const abrirModalAddNovo = () => {
    setModalCcihOpen(true);
    setModalMode("create");
    setPacienteSelecionado(null);
  };
  const abrirModalPDF = () => {
    setModalCcihPdfOpen(true);
  };

  const closeModalPDF = () => {
    setModalCcihPdfOpen(false);
  };

  const handleGerarPdfMapa = async (setor) => {
    const nwSetor = setor.toUpperCase();

    setBtnPdfCulturaLoading(true);

    try {
      if (!nwSetor) {
        alert("Setor não selecionado");
        return;
      }

      const response = await api.get(`/api/MapaCulturas/pdf/${nwSetor}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `MapaCultura_${nwSetor}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      console.log(error.response?.data);

      if (error.response?.status === 404) {
        alert("Nenhum paciente encontrado para este setor");
      } else {
        alert("Erro ao gerar o PDF. Verifique o backend.");
      }
    } finally {
      setBtnPdfCulturaLoading(false);
      setModalCcihPdfOpen(false);
    }
    // setLoading(false);
  };
  const closeModal = () => {
    setModalCcihOpen(false);
    setPacienteSelecionado(null);
  };
   const fecharModalInfo= () => {
    setmodalInfoOpen(false);
  };

  const abrirModalInfo= () => {
    setmodalInfoOpen(true);
  };

const handleMudarSetor = (e) => {
  const novoSetor = e.target.value;
  setFiltroSetor(novoSetor);

};
  return (
    <Main>
      {loading && <ModalLoading />}

      <NavDiv>
        <div className="divLogo">
          <img src={riosaude} alt="RIOSaúde" />
        </div>
        <div className="divTitulo">
          <h1>
            Mapa de Culturas <br /> CCIH
          </h1>
        </div>
        {setor !== "CCIH" ? (
          <Btnlogout onClick={() => navigate("/Home")} title="Home">
            <img src={homeIco} alt="Voltar para Home" />
          </Btnlogout>
        ) : (
          <Btnlogout onClick={handleLogOut} title="Logout">
            <img src={logout} alt="Sair" />
          </Btnlogout>
        )}
      </NavDiv>

      <MainContainer>
        <NavCampos>
          <ContainerFiltros>
            {setor === "CCIH" && (
              <>
              <CampoFiltroEnfLeito>
              <label htmlFor="filtroEnf">Enf/Leito</label>
              <FiltroEnf
                id="filtroEnf"
                type="text"
                maxLength={6}
                value={filtroEnfLeito}
                onChange={(e) => setFiltroEnfLeito(e.target.value)}
              />
            </CampoFiltroEnfLeito>

            <CampoFiltroNome>
              <label htmlFor="filtroNome">Nome</label>
              <FiltroNome
                id="filtroNome"
                type="text"
                $largura="200px"
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
              />
            </CampoFiltroNome>
            
            <CampoFiltroSetores>
              <select
                id="filtroSetor"
                name="filtroSetor"
                value={filtroSetor}
                onChange={handleMudarSetor}

              >
                <option value="">Selecione</option>
                  <option value="Urologia">Urologia</option>
                  <option value="C. Geral">C. Geral</option>
                  <option value="C. Medica3"> 3 - C. Medica </option>
                  <option value="C. Medica7"> 7 - C. Medica </option>
                  <option value="Ortopedia">Ortopedia</option>
                  <option value="Neurologia">Neurologia</option>
                  <option value="C. Plastica">C. Plástica</option>
                  <option value="Pediatria">Pediatria</option>
                  <option value="CTI10">10 - CTI</option>
                  <option value="Trauma">Trauma</option>
                  <option value="CTQIntensivo">CTQ Intensivo</option>
                  <option value="CTQEnfermaria">CTQ Enfermaria</option>
                  <option value="CTISL">CTI-SL</option>
                  <option value="SalaAmarela">Sala Amarela</option>
                  <option value="SalaVermelha">Sala Vermelha</option>
                  {profissional == "ADMINTCR" && (
                    <>
                     <option value="SetorTeste">SetorTeste</option>
                   <option value="SetorOutroTeste">SetorOutroTeste</option>
                  </>
                 

                  )}
              </select>
            </CampoFiltroSetores>

            <BtnFiltrarPacientesMapaCultura
              onClick={handleFiltrar}
              disabled={loading}
              title="Filtrar"
            >
              <img src={busca} alt="Buscar" />
            </BtnFiltrarPacientesMapaCultura>

            <BtnReloadPacientesMapaCultura
              onClick={handleReset}
              disabled={loading}
              title="Limpar filtros"
            >
              <img src={reload} alt="Recarregar" />
            </BtnReloadPacientesMapaCultura>
            
              </>
            )}
            <Botoes>
              {setor === "CCIH" && (
                <BtnNovoPacienteMapaCultura
                  onClick={abrirModalAddNovo}
                  disabled={loading}
                >
                  + Novo
                </BtnNovoPacienteMapaCultura>
              )}

              <BtnInformacoesPacienteMapaCultura onClick={abrirModalInfo}>
                Informações
              </BtnInformacoesPacienteMapaCultura>
              
              <BtnGerarPDFMapaCultura onClick={abrirModalPDF}>
                Gerar PDF
              </BtnGerarPDFMapaCultura>
            </Botoes>
          </ContainerFiltros>
        </NavCampos>

        <FlowLista>
          {resultadosBuscaFiltroCCIH.length > 0 ? (
            resultadosBuscaFiltroCCIH.map((cultura) => (
              <CardCCIH
                key={cultura.id || `${cultura.enfLeito}-${cultura.prontuario}`}
                cultura={cultura}
                onClick={abrirDetalhes}
                onExcluir={handleExcluir}
                disabled={loading}
              />
            ))
          ) : !loading ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "60px 20px",
                color: "#6b7280",
                fontSize: "1.1rem",
              }}
            >
              {filtroEnfLeito || filtroNome
                ? "Nenhum resultado encontrado"
                : "Nenhum registro cadastrado"}
            </div>
          ) : null}
        </FlowLista>
      </MainContainer>

      {modalCcihOpen && (
        <ModalCCIH
          mode={modalMode}
          aberto={modalCcihOpen}
          cultura={pacienteSelecionado}
          onSalvar={handleSalvar}
          onExcluir={handleExcluir}
          onClose={closeModal}
        />
      )}

      {modalCcihPdfOpen && (
        <ModalSelectPdfMapa
          aberto={modalCcihPdfOpen}
          onClose={closeModalPDF}
          onGerarPdf={handleGerarPdfMapa}
          onLoading={btnPdfCulturaLoading}
        />
      )}
      { modalInfoOpen &&(
      <ModalCCIHInfo 
      onclose={fecharModalInfo}
      aberto={modalInfoOpen}/>
      )}
      <ModalNotificacao
        aberto={notificacao.aberto}
        tipo={notificacao.tipo}
        mensagem={notificacao.mensagem}
      />
    </Main>
  );
};

export default MapaCultura;
