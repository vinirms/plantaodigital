import React, { useEffect, useState } from 'react';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalBody,
  BotaoFechar,
  InputClinica,
  InputDados,
  InputTextArea,
  BtnSalvarAdm,
  BtnAltaHospitalar,
  BtnSalvarEdicao,
  BtnExcluir,
  BtnContainer
} from './ModalDetalhesStyle';

 const inserirPaciente ={
    enfLeito: "",
    nomePaciente:"",
    idade:"",
    prontuario:"",
    dataInternacao:"",
    clinica:"",
    diagnostico:"",
    alergias:"",
    acessoData:"",
    curativo:"",
    exames:"",
    diurese:"",
    evacuacao:"",
    drenos:"",
    ostomias:"",
    swabData:"",
    intercorrencias:"",
    cirurgias:"",
    ventilacao:"",
    setor: localStorage.getItem("setor"),
    mobilidade:""
  }
const ModalDetalhes = ({ mode, aberto, onClose, paciente, onSalvar ,onExcluir}) => {
  const [formPaciente, setFormPaciente] = useState(inserirPaciente);

  // Sempre que abrir o modal ou mudar o paciente

 useEffect(() => {
    if (mode === "create") {
      setFormPaciente(inserirPaciente);
    }

    if (mode === "edit" && paciente) {
      // setFormPaciente(null);
      setFormPaciente(paciente);
    }
  }, [mode, paciente]);

  if (!aberto || !formPaciente) return null;

  const handleChange = (e) => {
    setFormPaciente({
      ...formPaciente,
      [e.target.name]: e.target.value
    });
  };



  return (
    <Overlay >
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h3>
            {mode === "create" ? "Nova Admissão" : "Detalhes do Paciente"}
          </h3>
          <BotaoFechar onClick={onClose}>x</BotaoFechar>
        </ModalHeader>

        {/* Modal body LINHA UM */}
        <ModalBody>

           <div className='divCampos'>
              <label>*Enf/Leito</label>
              <InputDados 
              type="text"
              name="enfLeito"
              value={formPaciente.enfLeito || ""}
              onChange={handleChange}
              $largura="55px"
              $larguraResponsive="55px"
              />
          </div>
          <div className='divCampos'>
              <label>*Nome</label>
              <InputDados
              type="text"
              name="nomePaciente"
              value={formPaciente.nomePaciente || ""}
              onChange={handleChange}
              $largura="400px"
              $larguraResponsive="245px"
              />
          </div>
          <div className='divCampos'>
             <label>*Idade</label>
            <InputDados
              type="number"
              name="idade"
              value={formPaciente.idade || ""}
              onChange={handleChange}
              $largura="40px"
              $larguraResponsive="55px"

            />
          </div>

         <div className='divCampos'>
            <label>*Prontuário</label>
            <InputDados
              type="text"
              name="prontuario"
              value={formPaciente.prontuario || ""}
              onChange={handleChange}
              $largura="65px"
            />
         </div>

          <div className='divCampos'>
            <label>*Data de Internação</label>
            <InputDados
              type="text"
              name="dataInternacao"
              value={formPaciente.dataInternacao || ""}
              onChange={handleChange}
              $largura="110px"
              $larguraResponsive="115px"

            />
         </div>

          {/* <button onClick={handleSalvar}>Salvar</button> */}
        </ModalBody>

        {/* Modal body LINHA DOIS */}
        <ModalBody>

           <div className='divCampos'>
              <label>Alergias</label>

              <InputDados
                type="text"
                list="alergias"
                name="alergias"
                value={formPaciente.alergias || ""}
                onChange={handleChange}
                $largura="320px"
              $larguraResponsive="325px"

              />

              <datalist id="alergias">
                <option value="Nega alergias" />
                <option value="Sim, quais?" />
              </datalist>
          </div>


          <div className='divCampos'>
              <label>Diagnóstico</label>
              <InputDados
              type="text"
              name="diagnostico"
              value={formPaciente.diagnostico || ""}
              onChange={handleChange}
              $largura="395px"
              $larguraResponsive="325px"

              />
          </div>
        
         
        </ModalBody>

          {/* Modal body LINHA TRES */}
        <ModalBody>

           <div className='divCampos'>
              <label>Acesso e Data</label>

              <InputDados
                type="text"
                list="acessoData"
                name="acessoData"
                value={formPaciente.acessoData || ""}
                onChange={handleChange}
                $largura="200px"
                $larguraResponsive="145px"

              />

              <datalist id="acessoData">
                <option value="Sem Acesso" />
                <option value="AVP MSE - DATA: " />
                <option value="AVP MSD - DATA: " />
                <option value="AVP VJD - DATA: " />
                <option value="AVP VJE - DATA: " />
                <option value="AVP MSE - DATA: " />
                <option value="CVC SBC D - DATA: " />
                <option value="CVC SBC E - DATA: " />
                <option value="CVC VF D - DATA: " />
                <option value="CVC VF E - DATA: " />
              </datalist>
          </div>
 
          <div className='divCampos'>
              <label>Precaução</label>

              <InputDados
                type="text"
                list="swabData"
                name="swabData"
                value={formPaciente.swabData || ""}
                onChange={handleChange}
                $largura="130px"
              $larguraResponsive="155px"

              />

              <datalist id="precaucao">
                <option value="Contato" />
                <option value="Aerosssois" />
              </datalist>
          </div>
          <div className='divCampos'>
              <label>Dieta</label>

              <InputDados
                type="text"
                list="dieta"
                name="dieta"
                value={formPaciente.dieta || ""}
                onChange={handleChange}
                $largura="185px"
              $larguraResponsive="145px"

              />

              <datalist id="dieta">
                <option value="Dieta zero" />
                <option value="Via Oral" />
                <option value="Dieta Parenteral" />
                <option value="Via Enteral" />
              </datalist>
          </div>
         
          <div className='divCampos'>
              <label>Diurese</label>

              <InputDados
                type="text"
                list="diurese"
                name="diurese"
                value={formPaciente.diurese || ""}
                onChange={handleChange}
                $largura="150px"
              $larguraResponsive="155px"

              />

              <datalist id="diurese">
                <option value="Espontanea" />
                <option value="Em uso CVD" />
                <option value="Em uso CVD + IVC" />
                <option value="Via Enteral" />
              </datalist>
          </div>
          
        </ModalBody>

         {/* Modal body LINHA QUATRO */}
      <ModalBody>

           <div className='divCampos'>
              <label>Drenos</label>

              <InputDados
                type="text"
                name="drenos"
                value={formPaciente.drenos || ""}
                onChange={handleChange}
                $largura="345px"
              $larguraResponsive="325px"

              />
          </div>
 
          <div className='divCampos'>
              <label>Evacuação</label>

              <InputDados
                type="text"
                list="evacuacao"
                name="evacuacao"
                value={formPaciente.eEvacuacao || ""}
                onChange={handleChange}
                $largura="170px"
                $larguraResponsive="145px"

              />

              <datalist id="evacuacao">
                <option value="Presente" />
                <option value="Ausente, UFI: " />
              </datalist>
          </div>
          <div className='divCampos'>
              <label>Ostomias</label>

              <InputDados
                type="text"
                list="ostomias"
                name="ostomias"
                value={formPaciente.ostomias || ""}
                onChange={handleChange}
                $largura="170px"
                $larguraResponsive="155px"

              />

              <datalist id="ostomias">
                <option value="Não possui" />
                <option value="Colostomia" />
                <option value="Ileostomia" />
                <option value="Traqueostomia" />
                <option value="Cistostomia" />
                <option value="Nefrostomia" />
                <option value="Gastrostomia" />
                
              </datalist>
          </div>
         
         
        </ModalBody>

          {/* Modal body LINHA CINCO */}
      <ModalBody>

           <div className='divCampos'>
              <label>Clinica</label>

              <InputClinica 
              as="select"
                name="clinica"
                value={formPaciente.clinica || ""}
                onChange={handleChange}>
                
                
              
              <option value="">Selecione</option>
              <option value="emergencia">Emergência</option>
              <option value="enfermaria">Enfermaria</option>
              </InputClinica>
          </div>
 
          
           <div className='divCampos'>
              <label>Ventilação</label>

              <InputClinica 
               as="select"
                name="ventilacao"
                value={formPaciente.ventilacao || ""}
                onChange={handleChange}>
               

              <option value="">Selecione</option>
              <option value="uti">Em AR Ambiente</option>
              <option value="emergencia">Ventilação Mecanica</option>
              <option value="enfermaria">Ventilaçao nao invasiva</option>
              </InputClinica>
          </div>
           <div className='divCampos'>
              <label>Mobilidade</label>

              <InputClinica
                as="select"
                name="mobilidade"
                value={formPaciente.mobilidade || ""}
                onChange={handleChange}>
             

              <option value="">Selecione</option>
              <option value="uti">Deambula</option>
              <option value="emergencia">Deambula com auxilio</option>
              <option value="enfermaria">Restrito ao leito</option>
              <option value="enfermaria">Acamado</option>

              </InputClinica>
          </div>
        </ModalBody>

             {/* Modal body LINHA SEIS */}
      <ModalBody>

           <div className='divCampos'>
              <label>Cirurgias</label>

              <InputTextArea
                type="text"
                name="cirurgias"
                value={formPaciente.cirurgias}
                onChange={handleChange}
                $Altura="40px"
              />
          </div>
 
          
      <div className='divCampos'>
                <label>Exames</label>

                <InputTextArea
                  type="text"
                  name="exames"
                  value={formPaciente.exames}
                  onChange={handleChange}
                  $Altura="40px"
                />
            </div>
 
        </ModalBody>
                 {/* Modal body LINHA SETE */}
      <ModalBody>

           <div className='divCampos'>
              <label>Intercorrencias</label>

              <InputTextArea
                type="text"
                name="intercorrencias"
                value={formPaciente.intercorrencias}
                onChange={handleChange}
                $Altura="100px"
                
              ></InputTextArea>
          </div>
 
          
      <div className='divCampos'>
                <label>Tegumentar - lesões e curativos</label>

                <InputTextArea
                  type="text"
                  name="curativo"
                  value={formPaciente.curativo}
                  onChange={handleChange}
                  $Altura="100px"
                />
            </div>
 
          
        </ModalBody>
       <BtnContainer>
           {mode === "create" && (
              <BtnSalvarAdm onClick={() => onSalvar(formPaciente)}>
                Salvar Admissão
              </BtnSalvarAdm>
         )}

        {mode === "edit" && (
          <>
           {/* <BtnAltaHospitalar onClick={() => onSalvar(formPaciente.id)}>
              Alta Hospitalar
            </BtnAltaHospitalar> */}
            <BtnSalvarEdicao onClick={() => onSalvar(formPaciente)}>
              Salvar Alterações
            </BtnSalvarEdicao>
            <BtnExcluir onClick={() => onExcluir(formPaciente.id)}>
              Excluir
            </BtnExcluir>
          </>
        )}

       </BtnContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalDetalhes;

