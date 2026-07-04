import React, { useEffect, useState } from 'react'
import ModalLoading from '../../Componentes/ModalLoading/ModalLoading'
import { Btnlogout, DivCadastro, FlowListaLogs, Main, MainContainer, NavDiv } from './AdminStyle'
import ModalNotificacao from '../../Componentes/ModalNotificacao/ModalNotificacao'
import riosaude from "../../assets/Images/RIOSD.png";
import homeIco from "../../assets/Images/Home.ico";
import logout from "../../assets/Images/Logout.ico";

import CardLog from '../../Componentes/CardLogs/CardLog';
import useBuscarLogsAdmin from '../../Hooks/AdminHooks/useBuscarLogsAdmin';
import api from '../../Services/Api';
import { Navigate, useNavigate } from 'react-router-dom';



const Admin = () => {
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const { 
    resultadosBuscaLogs, 
    buscarLogsSystem,
    pagina,
    totalPaginas 
} = useBuscarLogsAdmin(); 

 useEffect(() => {
    const carregarLogs = async () => {
        setLoading(true);
        await buscarLogsSystem(1); // 👈 passa página inicial
        setLoading(false);
    };

    carregarLogs();
}, []);



  const handleLogOut = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      localStorage.removeItem("setor");
      navigate("/"); 
    }
  };
// Estado

// Busca

  return (
    <Main>
      {loading && <ModalLoading />}

      <NavDiv>
        <div className="divLogo">
          <img src={riosaude} alt="RIOSaúde" />
        </div>
        <div className="divTitulo">
          <h1>
            Painel Admin
          </h1>
        </div>
      <Btnlogout onClick={() => navigate("/Home")} title="Home">
  <img src={homeIco} alt="Voltar para Home" />
</Btnlogout>
          <Btnlogout onClick={handleLogOut} title="Home">
            <img src={logout} alt="Sair do aplicativo" />
          </Btnlogout>
        
      </NavDiv>

      <MainContainer>
     
        <FlowListaLogs>
          {resultadosBuscaLogs.length === 0 ? (
              <p>Nenhum log encontrado</p>
          ) : (
              resultadosBuscaLogs.map((log) => (
                  <CardLog key={log.id} log={log} />
              ))
          )}
      </FlowListaLogs>
        {/* <DivCadastro>

        </DivCadastro> */}
        {/* Controles de paginação */}
      <div className='divPaginacao'>
          <button onClick={() => buscarLogsSystem(pagina - 1)} disabled={pagina === 1}>
              Anterior
          </button>

          <span>{pagina} de {totalPaginas}</span>

          <button onClick={() => buscarLogsSystem(pagina + 1)} disabled={pagina === totalPaginas}>
              Próximo
          </button>
      </div>
      </MainContainer>

{/* 
      <ModalNotificacao
        aberto={notificacao.aberto}
        tipo={notificacao.tipo}
        mensagem={notificacao.mensagem}
      /> */}
    </Main>
  )
}

export default Admin