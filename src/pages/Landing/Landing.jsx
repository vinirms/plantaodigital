import React, { useState } from "react";
import {
    AcessoSeguro,
  BtnLogin,
  BtnSobre,
  CamposLoginContainer,
  LoginFormContainer,
  LoginHeader,
  Main,
  SessaoChamada,
  SessaoLogin,
} from "./LandingStyle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import enf from "../../assets/Images/ImgEnf.png";
import logo from "../../assets/Images/RIOSD.png";
import escudoSeguro from "../../assets/Images/Protect.ico";

import ModalSobre from "../../Componentes/ModalSobre/ModalSobre";
import ModalComoUsar from "../../Componentes/ModalComoUsar/ModalComoUsar";
import api from "../../Services/Api";

const Landing = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [setor, setSetor] = useState("");
  const [profissional, setProfissional] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [modalSobreOpen, setmodalSobreOpen] = useState(false);
  const [modalComoUsarOpen, setmodalComoUsarOpen] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!login?.trim() || !senha?.trim() || !setor?.trim()) {
      window.confirm("Preencha Usuario, Senha e Setor!");
    
      return;
    }

    setCarregando(true);

    try {
      const response = await api.post("/api/auth/login", {
        login: login,
        senha: senha,
        setor: setor,
        profissional: profissional,
      });
   
  
      localStorage.setItem("setor", setor);
      localStorage.setItem("profissional", profissional);
    


      if (setor !== "CCIH") {
        navigate("/Home", { state: { preload: true, profissional: profissional } });
      } else {
        navigate("/MapaCulturas");
      }
    } catch (error) {
      setMensagem("Login ou senha inválidos");
    } finally {
      setCarregando(false);
    }
  };

  const fecharModalSobre = () => {
    setmodalSobreOpen(false);
  };

  const abrirModalSobre = () => {
    setmodalSobreOpen(true);
  };

  const fecharModalComoUsar = () => {
    setmodalComoUsarOpen(false);
  };

  const abrirModalComoUsar = () => {
    setmodalComoUsarOpen(true);
  };
  return (
    <Main>
      <SessaoChamada>
        <div className="tituloChamada">
          <div className="divImg">
            <img src={enf} alt="Imagem de enfermeira" />
          </div>
          <div className="subChamada">
            <h1> Plantao Digital</h1>
            <h3>Passagem de plantão segura e padronizada</h3>
            <p>
              Centralize informações assistenciais, reduza falhas de comunicação
              e aumente a segurança do paciente com um sistema digital feito
              para a realidade hospitalar.
            </p>
            {/* <div>
              <h1>Principais Benefícios</h1>
              <div className="beneficios">
                <div className="topicosBeneficios">
                  <h2>Segurança do Paciente</h2>
                  <p>
                    Reduza riscos assistenciais com informações claras,
                    organizadas e padronizadas entre os turnos.
                  </p>
                </div>
                <div className="topicosBeneficios">
                  <h2>Padronização da passagem de plantão</h2>
                  <p>
                    O mesmo modelo de registro para todos os setores, garantindo
                    consistência e confiabilidade dos dados.
                  </p>
                </div>
                <div className="topicosBeneficios">
                  <h2>Agilidade na rotina</h2>
                  <p>Menos tempo anotando, mais tempo cuidando do paciente.</p>
                </div>
                <div className="topicosBeneficios">
                  <h2>Comunicação eficiente entre equipes</h2>
                  <p>
                    Facilite a troca de informações entre profissionais,
                    minimizando falhas e retrabalho.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </SessaoChamada>
      <SessaoLogin>
        <LoginHeader>
          <div>
            <img src={logo} alt="" />
          </div>
        </LoginHeader>

        <LoginFormContainer>
          <h1>login</h1>
          <div className="campo">
            <label htmlFor="usuario">Usuário:</label>
            <input
              type="text"
              name="usuario"
              value={login}
              autoComplete="off"
              required
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              name="senha"
              value={senha}
              required
              autoComplete="off"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="campo">
            <label htmlFor="profissional">Nome Profissional:</label>
            <input
              type="text"
              name="profissional"
              value={profissional}
              required
              autoComplete="off"
              onChange={(e) => setProfissional(e.target.value)}
            />
          </div>
          <div className="campo">
           
            <label htmlFor="setor">Setor:</label>
            <select
              id="setor"
              name="setor"
              value={setor}
              required
              onChange={(e) => setSetor(e.target.value)}
            >
               {login !== "AndaraiCCIH" ? (
              <>
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
              </>
            ):(
                <>
                  <option value="">Selecione</option>
                  <option value="CCIH">CCIH</option>
                </>
            )
            }
             
            </select>
          </div>
          
          <BtnLogin onClick={handleLogin} disabled={carregando}>
            {carregando ? "Carregando..." : "Entrar"}
          </BtnLogin>
          <p>{mensagem}</p>
        </LoginFormContainer>

                        
        <div className='footer'>
            <AcessoSeguro>
                <img src={escudoSeguro}alt="" /><span>Acesso Seguro</span>
            </AcessoSeguro>
            <h5>Conformidade com LGPD</h5>
            
            <p>Desenvolvido por Vinicius Ramos - Residente de ENF</p>
            <p>Para suporte, ligue (71) 9 9296-5468</p>
            <p>Versão 1.0.0.1</p>
            <p>2026</p>

            <div className='divBtnSobreUso'>

            <BtnSobre onClick={abrirModalSobre} >Sobre</BtnSobre>
            <BtnSobre onClick={abrirModalComoUsar} >Como usar</BtnSobre>
        </div>
        </div>
        
            
      </SessaoLogin>
      {modalSobreOpen && <ModalSobre onclose={fecharModalSobre} />}

      {modalComoUsarOpen && <ModalComoUsar onClose={fecharModalComoUsar} />}
    </Main>
  );
};

export default Landing;
