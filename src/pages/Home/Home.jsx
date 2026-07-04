import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// styled components
import {
  Botoes,
  BtnFiltrarPacientesHome,
  BtnGerarPDF,
  BtnGerarPDFNutricao,
  Btnlogout,
  BtnMapaCulturas,
  BtnModeResponsive,
  BtnNovoAdmissao,
  BtnReloadPacientesHome,
  CampoFiltroClinica,
  CampoFiltroEnfLeito,
  CampoFiltroNome,
  Cards,
  ContainerFiltros,
  FiltroClinica,
  FiltroEnf,
  FiltroNome,
  FlowLista,
  Main,
  MainContainer,
  NavCampos,
  NavDiv,
  SubDiv,
} from "./HomeStyle";

// imagens
import riosaude from "../../assets/Images/RIOSD.png";
import menu from "../../assets/Images/Menu.ico";
import logout from "../../assets/Images/Logout.ico";
import admIcon from "../../assets/Images/Admin.ico";
import busca from "../../assets/Images/Search.ico";
import reload from "../../assets/Images/recarregar.ico";
import totalpct from "../../assets/Images/pct.png";
import totaladm from "../../assets/Images/adm.png";
import totalalta from "../../assets/Images/alta.png";

// componentes
import CardPaciente from "../../Componentes/CardPaciente/CardPaciente";
import ModalLoading from "../../Componentes/ModalLoading/ModalLoading";
import ModalDetalhes from "../../Componentes/ModalDetalhes/ModalDetalhes";
import ModalNotificacao from "../../Componentes/ModalNotificacao/ModalNotificacao";
import ModalCCIH from "../../Componentes/ModalCCIH/ModalCCIH";
import useBuscarFiltrarPacientesHome from "../../Hooks/HomeHooks/useBuscarFiltrarPacientesHome";
import useSalvarExcluirPacientesHome from "../../Hooks/HomeHooks/useSalvarExcluirPacienteHome";
import api from "../../Services/Api";

const Home = () => {
  const [btnModeResponsive, setBtnModeResponsive] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [filtroEnfLeito, setFiltroEnfLeito] = useState("");
  const [filtroNome, setFiltroNome] = useState("");
  const [setor, setSetor] = useState(localStorage.getItem("setor") || "");
  const [loading, setLoading] = useState(false);
  const [modalDetalhesOpen, setmodalDetalhesOpen] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);
  const [btnPdfCarregando, setBtnPdfCarregando] = useState(false);
  const [profAtiva, setProfAtiva] = useState("Enfermagem");
  const [modalMode, setModalMode] = useState("edit"); // edit | create
  const [userAdmin, setUserAdmin] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("Enfermagem");
  const {
    buscarPacientesIniciaisHome,
    resultadosBuscaFiltroHome,
    filtrarPacientesHome,
  } = useBuscarFiltrarPacientesHome();

  const {
    salvarPacienteHome,
    salvarPacienteHomeNutri,
    notificacaoHook,
    excluirPacienteHome,
    mostrarNotificacaoHook,
  } = useSalvarExcluirPacientesHome();

  const hoje = new Date().toISOString().split("T")[0];
  const totalAdm = resultadosBuscaFiltroHome.filter(
    (paciente) => paciente.dataInternacao === hoje,
  ).length;
  const navigate = useNavigate();

  const profissional =    localStorage.getItem("profissional");


// Mantém como está: carrega lista inicial ao trocar de setor
useEffect(() => {
  const carregarPacientesHome = async () => {
    setLoading(true);
    await buscarPacientesIniciaisHome(setor);
    setLoading(false);
  };

  if (setor) {
    carregarPacientesHome();
  }
}, [setor]);

// Novo: filtra automaticamente enquanto digita (com debounce)
useEffect(() => {
  if (!setor) return;

  // evita disparar filtro vazio duplicando a carga inicial
  if (!filtroNome.trim() && !filtroEnfLeito.trim()) return;

  const timeoutId = setTimeout(() => {
    handleFiltrarPacienteHome();
  }, 500);

  return () => clearTimeout(timeoutId);
}, [filtroNome, filtroEnfLeito, setor]);


const ordenarPorEnfLeito = (a, b) => {
  if (!a.enfLeito || !b.enfLeito) return 0;

  const parseLeito = (enfLeito) => {
    const partes = enfLeito.split("/");
    const isExtra = partes[partes.length - 1]?.toUpperCase() === "EXTRA";

    if (isExtra) {
      // ex: "06/EXTRA" ou "502/3/EXTRA"
      const semExtra = partes.slice(0, -1).map(Number);
      return { enf: semExtra[0] || 0, leito: semExtra[1] || 0, isExtra: 1 };
    } else {
      // ex: "06" ou "502/3"
      return { enf: Number(partes[0]) || 0, leito: Number(partes[1]) || 0, isExtra: 0 };
    }
  };

  const a_ = parseLeito(a.enfLeito);
  const b_ = parseLeito(b.enfLeito);

  if (a_.enf !== b_.enf) return a_.enf - b_.enf;
  if (a_.leito !== b_.leito) return a_.leito - b_.leito;
  return a_.isExtra - b_.isExtra;
};

const handleMudarSetor = (e) => {
  const novoSetor = e.target.value;
  setSetor(novoSetor);
  localStorage.setItem("setor", novoSetor)

   // sua função que recarrega a lista
};
  // handleLogout — limpa os cookies no backend e redireciona

  const handleLogOut = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      localStorage.removeItem("setor");
      navigate("/"); // redireciona pro login
    }
  };


const handleFiltrarPacienteHome = useCallback(async () => {
  setLoading(true);
  try {
    
    await filtrarPacientesHome({
      enfLeito: filtroEnfLeito.trim(),
      nomePaciente: filtroNome.trim(),
      setor: setor
    });

  } finally {
    setLoading(false);
  }
}, [filtroEnfLeito, filtroNome, setor]);

 const abrirDetalhes = async (id, nomePaciente) => {
  if (carregandoDetalhes) return;

  setModalMode("edit");
  setCarregandoDetalhes(true);
  setPacienteSelecionado(null);
  setmodalDetalhesOpen(true);
  setLoading(true);

  if (abaAtiva == "Enfermagem"){

      try {
         const res = await api.get(`/api/Paciente/${id}`);

        setPacienteSelecionado(res.data);

      

      } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
        mostrarNotificacaoHook("error", "Erro ao buscar dados do paciente");
      } finally {
        setCarregandoDetalhes(false);
        setLoading(false);
      }

}else if (abaAtiva == "Nutricao"){
// console.log(nomePaciente)
      try {
         const res = await api.get(`/api/Paciente/Nutricao/${nomePaciente}`);


        setPacienteSelecionado(res.data);

      

      } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
        mostrarNotificacaoHook("error", "Erro ao buscar dados do paciente");
      } finally {
        setCarregandoDetalhes(false);
        setLoading(false);
      }
}

};
// Extrai a validação para reutilizar
const validarCamposObrigatorios = (dados) => {
  const { enfLeito, nomePaciente, idade, prontuario, dataInternacao } = dados;
  return enfLeito && nomePaciente && idade && prontuario && dataInternacao;
};

const handleSalvarPaciente = async (dados) => {
    if (modalMode === "create" && !validarCamposObrigatorios(dados)) {
        mostrarNotificacaoHook("error", "Preencha os campos obrigatórios!");
        return;
    }

    setLoading(true);

    if (abaAtiva === "Enfermagem") {
        const payloadBase = {
            ...dados,
            chaveComposta: `${dados.enfLeito}-${dados.setor}`,
        };

        const payload = modalMode === "create"
            ? { ...payloadBase, admPor: profissional }
            : { ...payloadBase, attProfissional: profissional };

        try {
            const sucesso = await salvarPacienteHome(payload, modalMode);
            if (sucesso) {
                await buscarPacientesIniciaisHome(setor);
                fecharModalDetalhes();
            }
            // console.log(payload)
        } catch (error) {
            mostrarNotificacaoHook("error", "Erro ao salvar paciente!");
            console.error(error);
        } finally {
            setLoading(false);
        }
//  console.log(payload)
}else if (abaAtiva == "Nutricao"){
// console.log(abaAtiva)

    try {
        // const sucessoPct = await salvarPacienteHome(dados, modalMode);

        // // Só prossegue se o primeiro salvamento funcionou
        // if (!sucessoPct) return;

        const sucesso = await salvarPacienteHomeNutri(dados, modalMode);
        if (sucesso) {
          await buscarPacientesIniciaisHome();
          fecharModalDetalhes();
        }
      } finally {
        setLoading(false);
      }
// console.log(abaAtiva)

 }

};


const handleExcluirPaciente = async (id) => {
    if (!window.confirm("Deseja realmente excluir este paciente?")) return;

    setLoading(true);
    const sucesso = await excluirPacienteHome(id);

    if (sucesso) {
     await buscarPacientesIniciaisHome(setor);
      fecharModalDetalhes();
    }
    // Se falhou, o hook já mostrou a notificação de erro — modal permanece aberto

    setLoading(false);
  };

  const gerarPdf = async () => {
  setBtnPdfCarregando(true);

  try {
    const setor = localStorage.getItem("setor")?.toUpperCase();

    if (!setor) {
      alert("Setor não encontrado");
      return;
    }

    const response = await api.get(`/api/Paciente/pdf/${setor}`, {
      responseType: "blob",
    });

    // ✅ Pega o nome do arquivo enviado pelo backend
   const dataHoje = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
// ex: "21052026"

    const nomeArquivo = `Passagem_Plantao_${setor}_${dataHoje}.pdf`;

    const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );

    const link = document.createElement("a");
    link.href = url;
    link.download = nomeArquivo; // ✅ usa o nome do backend
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);

    if (error.response?.status === 404) {
      alert("Nenhum paciente encontrado para este setor");
    } else {
      alert("Erro ao gerar o PDF. Verifique o backend.");
    }
  } finally {
    setBtnPdfCarregando(false);
  }
};
  const gerarPdfNutri = async () => {
    setBtnPdfCarregando(true);
    try {
      const setor = localStorage.getItem("setor")?.toUpperCase();

      if (!setor) {
        alert("Setor não encontrado");
        return;
      }

      const response = await api.get(`/api/Paciente/Nutricao/pdf/${setor}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `Producao${setor}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);

      if (error.response?.status === 404) {
        alert("Nenhum paciente encontrado para este setor");
      } else {
        alert("Erro ao gerar o PDF. Verifique o backend.");
      }
    } finally {
      setBtnPdfCarregando(false);
    }
  };

  const abrirNovaAdmissao = () => {
    setModalMode("create");
    setPacienteSelecionado(null);
    setmodalDetalhesOpen(true);
    //  const profissional = localStorage.getItem("profissional");
    // if (profissional === "Enfermagem") {
    //   setProfAtiva("Enfermagem");
    // } else if (profissional === "Nutricao") {
    //   setProfAtiva("Nutricao");
    // }
  };

  const fecharModalDetalhes = () => {
    setmodalDetalhesOpen(false);
    setPacienteSelecionado(null);
    // setProfAtiva("")
  };

  const handleReset = async () => {
    setFiltroEnfLeito("");
    setFiltroNome("");
    setLoading(true);
    try {
      await buscarPacientesIniciaisHome(setor);
    } finally {
      setLoading(false);
    }
  };
  
const handlePageAdmin = async () => {
  try {
    // const response = await api.get('/api/Admin/AutorizarAdmin');
    // const usuario = response.data;  // { nome: "Maria Silva" }
    
    // setUserAdmin(usuario.nome);  // 
    // Seu if simples
    if (profissional !== "ADMINTCR") {
      mostrarNotificacaoHook("error", "Você não tem permissão!");
      return;
    }
    
    navigate("/PainelAdmin");
    
  } catch (error) {
    console.error('Erro:', error);
  }
};

  return (
    <Main>
      {loading && <ModalLoading />}

      <NavDiv>
        <div className="divLogo">
          <img src={riosaude} alt="" />
        </div>
        <div className="divTitulo">
          <h1>Passagem de Plantão</h1>
           
          <SubDiv >
            <h3>
              Setor: {profissional == "ADMINTCR" ? (<select
                id="setor"
                name="setor"
                value={setor}
                required
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
                  <option value="CTQIntensivo">CTQ Intensivo</option>
                  <option value="CTQEnfermaria">CTQ Enfermaria</option>
                  <option value="CTISL">CTI-SL</option>
                  <option value="Trauma">Trauma</option>

                  {profissional == "ADMINTCR" && (
                    <>
                     <option value="SetorTeste">SetorTeste</option>
                      <option value="SetorOutroTeste">SetorOutroTeste</option>
                  </>
                 

                  )}
              </select>) : setor}
              
            </h3>
            <h3>{profissional}</h3>
            
          </SubDiv>
        </div>

       
          
          <div className="divBtnLogout">

            <Btnlogout onClick={handleLogOut}>
              <img src={logout} alt="imagem logout" />
            </Btnlogout>

            {profissional == "ADMINTCR" && (
            <Btnlogout onClick={handlePageAdmin}>
              <img src={admIcon} alt="imagem logout" />
            </Btnlogout>
            )}   
            

          </div>

      
    

      </NavDiv>
     
      <MainContainer>
        <NavCampos>
          <div className="quantitativo">
            <Cards>
              <h3>Total Paciente</h3>
              <div className="cardImage">
                <p>{resultadosBuscaFiltroHome.length}</p>
                <img src={totalpct} alt="Icone saida de pessoas" />
              </div>
            </Cards>
            <Cards>
              <h3>Total Adimissões</h3>
              <div className="cardImage">
                <p>{totalAdm}</p>

                <img src={totaladm} alt="Icone saida de pessoas" />
              </div>
            </Cards>
            {/* <Cards >
                            <h3>
                                Total Altas
                            </h3>
                            <div className='cardImage'>
                                <p></p>
                                <img src={totalalta} alt="Icone saida de pessoas" />
                            </div>
                    </Cards> */}
          </div>

          <BtnModeResponsive
            onClick={() => setBtnModeResponsive(!btnModeResponsive)}
          >
            <img src={menu} alt="toggle menu" />
          </BtnModeResponsive>

          <ContainerFiltros $visible={!btnModeResponsive}>
            <CampoFiltroEnfLeito>
              <label htmlFor="Enf">Enf/Leito</label>
              <FiltroEnf
                type="text"
                name="Enf"
                id="Enf"
                placeholder="000/0"
                maxLength={5}
                autoComplete="off"
                value={filtroEnfLeito}
                onChange={(e) => setFiltroEnfLeito(e.target.value)}
              />
            </CampoFiltroEnfLeito>
            <CampoFiltroNome>
              <label htmlFor="Nome">Nome</label>
              <FiltroNome
                type="text"
                name="Nome"
                id="Nome"
                autoComplete="off"
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
              />
            </CampoFiltroNome>
            <CampoFiltroClinica>
              {/* <label htmlFor="Setor">Filtrar Clinica</label>
                          <FiltroClinica 
                            id="setor" 
                            name="setor"
                            value={filtroClinica}
                            onChange={(e) => setFiltroClinica(e.target.value)}>

                            <option value="">Selecione</option>
                            <option value="urologia">UROLOGIA</option>
                        </FiltroClinica> */}
            </CampoFiltroClinica>
            {/* <BtnFiltrarPacientesHome onClick={handleFiltrarPacienteHome}>
              <img src={busca} alt="" />
            </BtnFiltrarPacientesHome> */}
            <BtnReloadPacientesHome onClick={handleReset}>
              <img src={reload} alt="" />
            </BtnReloadPacientesHome>
          </ContainerFiltros>
          
          <Botoes>
            <BtnNovoAdmissao onClick={abrirNovaAdmissao}>
              Nova Admissão
            </BtnNovoAdmissao>
            <BtnGerarPDF onClick={gerarPdf} disabled={btnPdfCarregando}>
              {btnPdfCarregando ? "Carregando..." : "Gerar PDF"}
            </BtnGerarPDF>
            <BtnMapaCulturas onClick={() => navigate("/MapaCulturas")}>
                Mapa Culturas
            </BtnMapaCulturas>
          {/* {profissional == "ADMINTCR" && (
            <>
              

                <BtnGerarPDFNutricao onClick={gerarPdfNutri} disabled={btnPdfCarregando}>
                {btnPdfCarregando ? "Carregando..." : "PDF Nutri"}
              </BtnGerarPDFNutricao>
            </>
          )} */}
            
            
          </Botoes>
        </NavCampos>
        <FlowLista>
          {resultadosBuscaFiltroHome.length === 0 ? (
            <p>Nenhum paciente encontrado</p>
          ) : (
            [...resultadosBuscaFiltroHome]
              .sort(ordenarPorEnfLeito)
              .map((paciente) => (
                <CardPaciente
                  key={paciente.id}
                  paciente={paciente}
                  onClick={abrirDetalhes}
                  disabled={carregandoDetalhes}
                />
              ))
          )}
        </FlowLista>
      </MainContainer>
      {modalDetalhesOpen && (
        <ModalDetalhes
          mode={modalMode}
          aberto={modalDetalhesOpen}
          onClose={fecharModalDetalhes}
          paciente={pacienteSelecionado}
          onSalvar={handleSalvarPaciente}
          onExcluir={handleExcluirPaciente}
          abaAtiva={abaAtiva}             
          onAbaChange={setAbaAtiva}
        />
      )}

      <ModalNotificacao
        aberto={notificacaoHook.aberto}
        tipo={notificacaoHook.tipo}
        mensagem={notificacaoHook.mensagem}
      />
    </Main>
  );
};

export default Home;
