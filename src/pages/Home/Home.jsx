import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// styled components
import {
  Botoes,
  Btnlogout,
  BtnModeResponsive,
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
  NavDiv
} from './HomeStyle';

// imagens
import riosaude from "../../assets/Images/RIOSD.png";
import menu from "../../assets/Images/Menu.ico";
import logout from "../../assets/Images/Logout.ico";
import busca from "../../assets/Images/Search.ico";
import reload from "../../assets/Images/recarregar.ico";
import totalpct from "../../assets/Images/pct.png";
import totaladm from "../../assets/Images/adm.png";
import totalalta from "../../assets/Images/alta.png";

// componentes
import CardPaciente from '../../Componentes/CardPaciente/CardPaciente';
import ModalLoading from '../../Componentes/ModalLoading/ModalLoading';
import ModalDetalhes from '../../Componentes/ModalDetalhes/ModalDetalhes';
import ModalNotificacao from '../../Componentes/ModalNotificacao/ModalNotificacao';


const Home = () => {
const [btnModeResponsive, setBtnModeResponsive] = useState(false);

const [pacientes, setPacientes] = useState([]);
const [filtroEnfLeito, setFiltroEnfLeito] = useState("");
const [filtroNome, setFiltroNome] = useState("");
const [filtroClinica, setFiltroClinica] = useState("");
const [loading, setLoading] = useState(false);
const [modalDetalhesOpen, setmodalDetalhesOpen] = useState(false);
const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);
const [modalMode, setModalMode] = useState("edit"); // edit | create
const [notificacao, setNotificacao] = useState({
  aberto: false,
  tipo: "success", // success | error | warning
  mensagem: ""
});

const navigate = useNavigate();

const UrlApi = "https://plantaodigital-f0e2h2cbehaueege.brazilsouth-01.azurewebsites.net";

const buscarPacientesIniciais = async () => {
  const token = localStorage.getItem("token");
  const setor = localStorage.getItem("setor");

  try {
    setLoading(true); 
    setPacientes([]); // 🔥 limpa cards

    const response = await axios.get(
      `${UrlApi}/api/Paciente/setor/${setor}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setPacientes(response.data);
  } catch (error) {
    console.error(error);
    navigate("/");
  }
    finally {
    setLoading(false);    // 🔥 fecha modal
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
    return;
  }

  buscarPacientesIniciais();
}, []);

const ordenarPorEnfLeito = (a, b) => {
    if (!a.enfLeito || !b.enfLeito) return 0;

  const [enfA, leitoA] = a.enfLeito.split('/').map(Number);
  const [enfB, leitoB] = b.enfLeito.split('/').map(Number);

  if (enfA !== enfB) return enfA - enfB;
  return leitoA - leitoB;
};

const handleLogOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("setor");
  navigate("/");
};
   
const handleBuscar = async () => {
  const token = localStorage.getItem("token");

  try {
    setLoading(true);
    setPacientes([]); // 🔥 LIMPA os cards antes da busca

    const response = await axios.get(
      `${UrlApi}/api/Paciente/filtrar`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          enfLeito: filtroEnfLeito,
          nome: filtroNome,
          clinica: filtroClinica
        }
      }
    );

    setPacientes(response.data);
  } catch (error) {
    console.error(error);
  }
 finally {
    setLoading(false);
  }
};

const abrirDetalhes = async (id) => {
   if (carregandoDetalhes) return; // 🚫 bloqueia clique duplo
  setModalMode("edit");
  setCarregandoDetalhes(true);
  setPacienteSelecionado(null);
  setmodalDetalhesOpen(true);

  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      `${UrlApi}/api/Paciente/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setPacienteSelecionado(res.data);
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar dados do paciente");
  }
   finally {
    setCarregandoDetalhes(false); // ✅ libera clique
  }
};

const mostrarNotificacao = (tipo, mensagem) => {
  setNotificacao({
    aberto: true,
    tipo,
    mensagem
  });

  // fecha sozinho após 2.5s
  setTimeout(() => {
    setNotificacao(n => ({ ...n, aberto: false }));
  }, 2500);
};

const salvarPaciente = async (dados) => {


  if (
    !dados.enfLeito ||
    !dados.nomePaciente ||
    !dados.idade ||
    !dados.prontuario ||
    !dados.dataInternacao
  ) {
    mostrarNotificacao("error", "Preencha os campos obrigatorios!");
    return;
  }

  const token = localStorage.getItem("token");

  if (modalMode === "create") {
    await axios.post(
      `${UrlApi}/api/Paciente`,
      dados,
      { headers: { Authorization: `Bearer ${token}` } }
    );
     mostrarNotificacao("success", "Paciente cadastrado com sucesso");
  }

  if (modalMode === "edit") {
    await axios.put(
      `${UrlApi}/api/Paciente/${dados.id}`,
      dados,
      { headers: { Authorization: `Bearer ${token}` } }
    );
     mostrarNotificacao("success", "Paciente atualizado com sucesso");
  }

  fecharModalDetalhes();
  buscarPacientesIniciais();
};

 const excluirPaciente = async (id) => {
  if (!window.confirm("Deseja realmente excluir este paciente?")) return;

  const token = localStorage.getItem("token");
  
  try {
    await axios.delete(
      `${UrlApi}/api/Paciente/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    mostrarNotificacao("success", "Paciente cadastrado com sucesso");

    // - fechar modal
    fecharModalDetalhes();
    // - recarregar lista
    buscarPacientesIniciais();
    // - remover da lista local (setState)
    setPacienteSelecionado(null);
  } catch (error) {
    console.error(error);
    mostrarNotificacao("error", "Erro ao excluir paciente");
  }
};
const gerarPdf = async () => {
  try {
    const token = localStorage.getItem("token");
    const setor = localStorage.getItem("setor")?.toUpperCase();

    if (!setor) {
      alert("Setor não encontrado");
      return;
    }

    const response = await axios.get(
      `${UrlApi}/api/Paciente/pdf/${setor}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob"
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = `Passagem_${setor}.pdf`;
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
  }
};


const abrirNovaAdmissao = () => {
  setModalMode("create");
  setPacienteSelecionado(null);
  setmodalDetalhesOpen(true);
};

const fecharModalDetalhes = () => {
  setmodalDetalhesOpen(false);
  setPacienteSelecionado(null);
};

const handleReset = () => {
  setFiltroEnfLeito("");
  setFiltroNome("");
  setFiltroClinica("");
  buscarPacientesIniciais(); // se quiser voltar ao padrão
};

  return (
    <Main>
        {loading && <ModalLoading />}
        
        <NavDiv>
            <div className='divLogo'>
                <img src={riosaude} alt="" />
            </div>
            <div className='divTitulo'>
                <h1>Passagem de Plantão</h1>
            </div>
            <div className='divSetor'>
                <h3>Setor:</h3>
            </div>
            <Btnlogout onClick={handleLogOut}><img src={logout} alt="imagem logout" /></Btnlogout>
        </NavDiv>
        <MainContainer>
            <NavCampos>
                <div className='quantitativo'>
                    <Cards>
                            <h3>
                                Total Paciente
                            </h3>
                            <div className='cardImage'>
                                <p>{pacientes.length}</p>
                                <img src={totalpct} alt="Icone saida de pessoas" />
                            </div>
                    </Cards>
                    <Cards >
                            <h3>
                                Total Adimissões
                            </h3>
                            <div className='cardImage'>
                                <p></p>
                                <img src={totaladm} alt="Icone saida de pessoas" />
                            </div>
                    </Cards>
                    <Cards >
                            <h3>
                                Total Altas
                            </h3>
                            <div className='cardImage'>
                                <p></p>
                                <img src={totalalta} alt="Icone saida de pessoas" />
                            </div>
                    </Cards>
                </div>

                <BtnModeResponsive onClick={()=> setBtnModeResponsive(!btnModeResponsive)}>
                  <img src={menu}alt="toggle menu" />
                </BtnModeResponsive>
                
                <ContainerFiltros visible={btnModeResponsive} >
                    <CampoFiltroEnfLeito>
                        <label htmlFor="Enf">Filtrar Enf/Leito</label>
                        <FiltroEnf 
                        type="text" 
                        name="Enf" 
                        id="" 
                        placeholder='400/1' 
                        maxLength={5}
                        value={filtroEnfLeito}
                        onChange={(e) => setFiltroEnfLeito(e.target.value)}/>
                    </CampoFiltroEnfLeito>
                     <CampoFiltroNome>
                        <label htmlFor="Enf">Filtrar Nome</label>
                        <FiltroNome 
                        type="text" 
                        name="Enf" 
                        id="" 
                        value={filtroNome}
                        onChange={(e) => setFiltroNome(e.target.value)}/>
                    </CampoFiltroNome>
                   <CampoFiltroClinica>
                            <label htmlFor="Setor">Filtrar Clinica</label>
                          <FiltroClinica 
                            id="setor" 
                            name="setor"
                            value={filtroClinica}
                            onChange={(e) => setFiltroClinica(e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="uti">UTI</option>
                            <option value="emergencia">Emergência</option>
                            <option value="enfermaria">Enfermaria</option>
                        </FiltroClinica>
                    </CampoFiltroClinica>
                    <button onClick={handleBuscar}><img src={busca} alt="" /></button>
                    <button onClick={handleReset}><img src={reload} alt="" /></button>
                </ContainerFiltros>
                <Botoes >
                    <button onClick={abrirNovaAdmissao}>Nova Admissão</button>
                    <button onClick={gerarPdf}>PDF Passagem</button>
                </Botoes>
            </NavCampos>
            <FlowLista>
            {[...pacientes]
    .sort(ordenarPorEnfLeito)
    .map(paciente => (
      <CardPaciente
        key={paciente.id}
        paciente={paciente}
        onClick={abrirDetalhes}
        disabled={carregandoDetalhes}
      />
    ))}
            </FlowLista>
        </MainContainer>
       {modalDetalhesOpen && (
          <ModalDetalhes
            mode={modalMode}
            aberto={modalDetalhesOpen}
            onClose={fecharModalDetalhes}
            paciente={pacienteSelecionado}
            onSalvar={salvarPaciente}
            onExcluir={excluirPaciente}
  />
)}
    <ModalNotificacao
      aberto={notificacao.aberto}
      tipo={notificacao.tipo}
      mensagem={notificacao.mensagem}
    />

    </Main>
  )
}

export default Home