import React, { useState } from 'react'
import { Main, SessaoChamada, SessaoLogin } from './LandingStyle'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import enf from   '../../assets/Images/enf.png'
import logo from   '../../assets/Images/RIOSD.png'

const Landing = () => {

 const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [setor, setSetor] = useState('');
  const [mensagem, setMensagem] = useState('');
const UrlApi = "https://plantaodigital-f0e2h2cbehaueege.brazilsouth-01.azurewebsites.net";


const handleLogin = async () => {
    console.log(setor)
  try {
    const response = await axios.post(
     `${UrlApi}/api/auth/login` ,
      {
        login: login,
        senha: senha,
        setor:setor

      }
    );

    localStorage.setItem('token', response.data.token);
    localStorage.setItem("setor", setor)
    navigate("/Home");

  } catch (error) {
    setMensagem('Login ou senha inválidos');
  }
}

  return (
  <Main>
        <SessaoChamada>
         <div className='tituloChamada'>
                <div>
                    <img src={enf} alt="Imagem de enfermeira" />
                </div>
                <div className='subChamada'>
                    <h1> Plantao Digital</h1>
                    <h3>Passagem de plantão segura e padronizada</h3>
                    <p>Centralize informações assistenciais, reduza falhas de comunicação e aumente a segurança do paciente com um sistema digital feito para a realidade hospitalar.
                    </p>
                </div>
         </div>
         {/* <div className='MainBeneficios'>
            <h1>Principais Benefícios</h1>
            <div className='beneficios'>
                <div className='topicosBeneficios'>
                    <h2>Segurança do Paciente</h2>
                    <p>Reduza riscos assistenciais com informações claras, organizadas e padronizadas entre os turnos.
                    </p>
                </div>
                <div className='topicosBeneficios'>
                    <h2>Padronização da passagem de plantão</h2>
                    <p>O mesmo modelo de registro para todos os setores, garantindo consistência e confiabilidade dos dados.
                </p>
                </div>
                <div className='topicosBeneficios'>
                    <h2>Agilidade na rotina
</h2>
                    <p>Menos tempo anotando, mais tempo cuidando do paciente.
</p>
                </div>
                <div className='topicosBeneficios'>
                    <h2>Comunicação eficiente entre equipes
</h2>
                    <p>Facilite a troca de informações entre profissionais, minimizando falhas e retrabalho.
</p>
                </div>
            </div>
         </div> */}
        </SessaoChamada>
        <SessaoLogin>
            
            <div className='camposLogin'>
                <div>
                    <img src={logo} alt="" />
                </div>
                <h1>login</h1>
                <div className='campo'>
                    <label htmlFor="usuario">Usuário:</label>
                    <input 
                    type="text" 
                    name="usuario" 
                    value={login}
                    required
                    onChange={(e)=> setLogin(e.target.value)} 
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="senha">Senha:</label>
                    <input 
                    type="text" 
                    name="senha" 
                    id=""
                    value={senha}
                    required
                    onChange={(e)=> setSenha(e.target.value)} 
                     />
                </div>
                <div className='campo'>
                   <label htmlFor="setor">Setor:</label>
                    <select 
                    id="setor"
                    name="setor"
                    value={setor}
                    required
                    onChange={(e)=> setSetor(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="urologia">UROLOGIA</option>
                    <option value="emergencia">Emergência</option>
                    <option value="enfermaria">Enfermaria</option>
                    </select>
                </div>

                <button onClick={handleLogin}>Entrar</button>
                   <p>{mensagem}</p>
                <div className='footer'>
                    <p>Para suporte, ligue (71)9 9296-5468</p>
                    <p>Plantao Digital</p>
                    <p>Versão 1.0.0.0</p>
                </div>
            </div>  
         
        </SessaoLogin>
  </Main>
  )
}

export default Landing