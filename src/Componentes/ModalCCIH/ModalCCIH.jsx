import React, { useEffect, useState, useCallback } from "react";
import {
  BtnBuscaPacienteCultura,
  BtnExcluir,
  BtnSalvarAdm,
  CamposWapperDiv,
  CondutaDiv,
  InputDados,
  InputDadosCampoSwabs,
  ListBuscaContainer,
  ListBuscaResult,
  ModalBody,
  ModalBodySomenteLeitura,
  ModalBodySwabs,
  ModalContainer,
  ModalHeader,
  Overlay,
  SpanSomenteLeitura,
  TagPModelo,
  TagPModeloTitle,
  TagPSomenteLeitura,
  TagPSomenteLeituraSwabs,
  TagsDiv,
  TagsWrapper,
} from "./ModalCCIHStyle";
import axios from "axios";
import busca from "../../assets/Images/Search.ico";
import useBuscarFiltrarPacienteModal from "../../Hooks/MapaCulturaHooks/useBuscarFiltrarPacientesCCIH";
import { BtnModelo } from "../ModalDetalhes/ModalDetalhesStyle";
import contato from "../../assets/Images/contato.png";
import aerossol from "../../assets/Images/aerossois.png";
import goticula from "../../assets/Images/goticulas.png";


const ModalCCIH = ({ mode, aberto, onClose, onSalvar, cultura, onExcluir }) => {
  // Estado inicial com strings vazias para evitar warnings de input controlled [web:1]
 const inserirPaciente = {
    enfLeito: "",
    nomePaciente: "",
    prontuario: "",
    setor: "",
    dataColeta: "",
    swabNasal: "",
    swabOral: "",
    swabRetal: "",
    secrecaoTraqueal: "",
    hemocultura: "",
    urocultura: "",
    fragOsso:"",
    fragPele:"",
    fragMoles:"",
    infos: "",
    tagERC:"",
    tagMRSA:"",
    tagCRAB:"",
    tagVRE:"",
    tagTB:"",
    tagKPC:"",
    precaucao:"",
    // ultimaColeta: "",
  };

  const [formPaciente, setFormPaciente] = useState(inserirPaciente);
  const [isSearching, setIsSearching] = useState(false);

  const setorCCIH = localStorage.getItem("setor");

  const {
    resultadosBuscaFiltroCCIH,
    buscaModalListaPacientes,
    setResultadosBuscaFiltroCCIH,
  } = useBuscarFiltrarPacienteModal();

  // useEffect otimizado para sync com props [web:9]
  useEffect(() => {
    if (mode === "create") {
      setFormPaciente(inserirPaciente);
    } else if (mode === "edit" && cultura) {
      // Normaliza valores undefined/null para "" [web:3]
      setFormPaciente({
        id: cultura.id || "",
        enfLeito: cultura.enfLeito || "",
        nomePaciente: cultura.nomePaciente || "",
        prontuario: cultura.prontuario || "",
        setor: cultura.setor || "",
        swabNasal: cultura.swabNasal || "",
        swabOral: cultura.swabOral || "",
        swabRetal: cultura.swabRetal || "",
        secrecaoTraqueal: cultura.secrecaoTraqueal || "",
        hemocultura: cultura.hemocultura || "",
        urocultura: cultura.urocultura || "",
        fragOsso: cultura.fragOsso || "",
        fragPele: cultura.fragPele || "",
        fragMoles: cultura.fragMoles || "",
        infos: cultura.infos || "",
        tagERC: cultura.tagERC || "",
        tagMRSA: cultura.tagMRSA || "",
        tagCRAB: cultura.tagCRAB || "",
        tagTB: cultura.tagTB || "",
        tagKPC: cultura.tagKPC || "",
        precaucao: cultura.precaucao || "",
      });
    }
  }, [mode, cultura]);

  if (!aberto) return null;

  const handleChange = (e) => {
    setFormPaciente({
      ...formPaciente,
      [e.target.name]: e.target.value,
    });
  };

  // Memoiza função para evitar recriações desnecessárias
  const handleSelecionarPaciente = useCallback(
    (p) => {
      setFormPaciente((prev) => ({
        ...prev,
        enfLeito: p.enfLeito || "",
        nomePaciente: p.nomePaciente || "",
        prontuario: p.prontuario || "",
        setor: p.setor || "",
      }));
      setResultadosBuscaFiltroCCIH([]);
    },
    [setResultadosBuscaFiltroCCIH],
  );

  const handleBuscar = async () => {
    const termo =
      formPaciente.enfLeito ||
      formPaciente.nomePaciente ||
      formPaciente.prontuario;
    if (!termo?.trim()) {
      return; // Não busca se não há termo
    }
    setIsSearching(true);
    try {
      await buscaModalListaPacientes(formPaciente);
    } finally {
      setIsSearching(false);
    }
  };

  const formatarData = (timestamp) => {
    if (!timestamp) return "";
    const data = new Date(timestamp);
    return data.toLocaleString("pt-BR");
  };

const toggleCampo = (campo, valor) => {
  setFormPaciente((prev) => ({
      ...prev,
      [campo]: prev[campo] === valor ? null : valor,
    }));
  };
  return (
    <Overlay >
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h1>{mode === "create" ? "Adicionar Novo" : "Atualizar"}</h1>
          <button onClick={onClose}>×</button>
        </ModalHeader>
        <TagPModeloTitle>Informações do Paciente</TagPModeloTitle>

      {setorCCIH === "CCIH" ? 
      (<>
        {/* Campos com inputs editaveis */}
        <ModalBody>
          <div className="divCampos">
            <TagPModelo>*Enf/Leito</TagPModelo>
            <InputDados
              type="text"
              name="enfLeito"
              value={formPaciente.enfLeito}
              onChange={handleChange}
              $largura="55px"
              $larguraResponsive="55px"
              autoComplete="off"
            />
          </div>
          <div className="divCampos">
            <TagPModelo>*Nome</TagPModelo>
            <InputDados
              type="text"
              name="nomePaciente"
              value={formPaciente.nomePaciente}
              onChange={handleChange}
              $largura="380px"
              $larguraResponsive="240px"
              autoComplete="off"
            />
          </div>
          {setorCCIH === "CCIH" && mode == "create"  &&(
            <BtnBuscaPacienteCultura
              onClick={handleBuscar}
              disabled={isSearching}
            >
              <img src={busca} alt="Buscar" />
              {isSearching ? "..." : ""}
            </BtnBuscaPacienteCultura>
          )}

          <div className="divCampos">
            <TagPModelo>Prontuário</TagPModelo>
            <InputDados
              type="text"
              name="prontuario"
              value={formPaciente.prontuario}
              onChange={handleChange}
              $largura="55px"
              $larguraResponsive="55px"
              autoComplete="off"
            />
          </div>
          <div className="divCampos">
            <TagPModelo>*Setor</TagPModelo>
            <InputDados
              type="text"
              name="setor"
              value={formPaciente.setor}
              onChange={handleChange}
              $largura="165px"
              $larguraResponsive="155px"
              autoComplete="off"
            />
          </div>
        

          {/* Lista de resultados */}
          {resultadosBuscaFiltroCCIH.length > 0 && (
            <ListBuscaContainer>
              {resultadosBuscaFiltroCCIH.map((p) => (
                <ListBuscaResult
                  key={p.id} // Key mais estável [web:7][web:10]
                  onClick={() => handleSelecionarPaciente(p)}
                >
                  <TagPModelo>{p.enfLeito}</TagPModelo> —{" "}
                  <TagPModelo>{p.nomePaciente}</TagPModelo>
                  <TagPModelo>{p.setor}</TagPModelo>

                </ListBuscaResult>
              ))}
            </ListBuscaContainer>
          )}
        </ModalBody>
      </>) : 

      (<>
        {/* Campos somente leitura */}

        <ModalBodySomenteLeitura>
          <div className="divCampos">
            <SpanSomenteLeitura>Enf/Leito: </SpanSomenteLeitura><TagPSomenteLeitura>{formPaciente.enfLeito}</TagPSomenteLeitura>
          </div>
          <div className="divCampos">
            <SpanSomenteLeitura>Paciente: </SpanSomenteLeitura><TagPSomenteLeitura>{formPaciente.nomePaciente}</TagPSomenteLeitura>
           
          </div>
        
          <div className="divCampos">
            <SpanSomenteLeitura>Prontuario: </SpanSomenteLeitura><TagPSomenteLeitura>{formPaciente.prontuario}</TagPSomenteLeitura>

          </div>
          <div className="divCampos">
            <SpanSomenteLeitura>Setor: </SpanSomenteLeitura><TagPSomenteLeitura>{formPaciente.setor}</TagPSomenteLeitura>
          </div>
          
        </ModalBodySomenteLeitura>
      </>)}
        

        <TagsWrapper>
        <TagPModeloTitle>Tags</TagPModeloTitle>
            <TagsDiv>
                <BtnModelo
                  $larguraBtn="70px"
                  $ativo={
                    formPaciente.tagERC !== "" &&
                    formPaciente.tagERC !== null
                  }
                  
                  onClick={(e) => {
                    e.currentTarget.blur();
                    toggleCampo("tagERC", "ERC");
                  }}
                >
                  ERC
                </BtnModelo>
                <BtnModelo
                  $larguraBtn="70px"
                  $ativo={
                    formPaciente.tagMRSA !== "" &&
                    formPaciente.tagMRSA !== null
                  }
                  
                  onClick={(e) => {
                    e.currentTarget.blur();
                    toggleCampo("tagMRSA", "MRSA");
                  }}
                >
                  MRSA
                </BtnModelo>
                <BtnModelo
                  $larguraBtn="70px"
                  $ativo={
                    formPaciente.tagCRAB !== "" &&
                    formPaciente.tagCRAB !== null
                  }
                  
                  onClick={(e) => {
                    e.currentTarget.blur();
                    toggleCampo("tagCRAB", "CRAB");
                  }}
                >
                  CRAB
                </BtnModelo>
                <BtnModelo
                  $larguraBtn="70px"
                  $ativo={
                    formPaciente.tagTB !== "" &&
                    formPaciente.tagTB !== null
                  }
                  
                  onClick={(e) => {
                    e.currentTarget.blur();
                    toggleCampo("tagTB", "TB");
                  }}
                >
                  TB
                </BtnModelo>

                <BtnModelo
                  $larguraBtn="70px"
                  $ativo={
                    formPaciente.tagKPC !== "" &&
                    formPaciente.tagKPC !== null
                  }
                  
                  onClick={(e) => {
                    e.currentTarget.blur();
                    toggleCampo("tagKPC", "KPC");
                  }}
                >
                  KPC
                </BtnModelo>
                <BtnModelo
                  $larguraBtn="70px"
                  $ativo={
                    formPaciente.tagCRPA !== "" &&
                    formPaciente.tagCRPA !== null
                  }
                  
                  onClick={(e) => {
                    e.currentTarget.blur();
                    toggleCampo("tagCRPA", "CRPA");
                  }}
                >
                  CRPA
                </BtnModelo>
                  {setorCCIH === "CCIH"?
                  (
                    // edicao precaucao
                    <>
                    
                    <select name="precaucao" id="precaucao" onChange={handleChange} value={formPaciente.precaucao || ""}>
                        <option value="">Tipo de Precaução — Selecione</option>
                        {["Goticula", "Aerossol", "Contato"].map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                    </>

                  ):
                  
                  (
                    //apenas leitura precaucao
                    <>
                   

                    <SpanSomenteLeitura>Tipo de precaução:</SpanSomenteLeitura>
                    <TagPSomenteLeitura> {formPaciente.precaucao}</TagPSomenteLeitura>
                    </>

                  )}
                

            </TagsDiv>
        </TagsWrapper>

        <TagPModeloTitle>Condulta | Precaução</TagPModeloTitle>
        <CondutaDiv>
          {formPaciente.precaucao === "Contato" && (
            <>
             <img src={contato} alt="instrucao contato" />
            <ul>
              <li>Higienize as mãos antes e após o contato com paciente.</li>
              <li>Use óculos, máscara cirurgica, avental, quando houver risco de contato com secreções.</li>
              <li>Termômetro, esfignomanometro e estetoscópio devem ser de uso exclusivo do paciente.</li>
              <li>Equipamento coletivo, deverá sofrer desinfecção após o uso.</li>
            </ul>
            </>
          )}
         {formPaciente.precaucao === "Aerossol" && (
            <>
             <img src={aerossol} alt="instrucao contato" />
            <ul>
              <li>Higienize as mãos antes e após o contato com paciente.</li>
              <li>Use óculos, máscara PFF2(N95), avental, quando houver risco de contato com secreções.</li>
              <li>O paciente pode ser internado com outros pacientes com o mesmo microrganismo.</li>
              <li>Transporte deve ser evitado, quando necessário o paciente deverá usar mascara cirúrgica.</li>
            </ul>
            </>
          )}
          {formPaciente.precaucao === "Goticula" && (
            <>
             <img src={goticula} alt="instrucao contato" />
              <ul>
              <li>Higienize as mãos antes e após o contato com paciente.</li>
              <li>Use óculos, máscara cirúrgica, avental, quando houver risco de contato com secreções.</li>
              <li>O paciente pode ser internado com outros pacientes com o mesmo microrganismo.</li>
              <li>Transporte deve ser evitado, quando necessário o paciente deverá usar mascara cirúrgica.</li>
            </ul>
            </>
          )}
        </CondutaDiv>

        <TagPModeloTitle>Material Coletado</TagPModeloTitle>
          
        <ModalBodySwabs>
          {setorCCIH === "CCIH" ?
           (<>
            <CamposWapperDiv>
              <div>
                <TagPModelo>Swab Nasal</TagPModelo>

                <InputDadosCampoSwabs
                  type="text"
                  name="swabNasal"
                  value={formPaciente.swabNasal || ""}
                  onChange={handleChange}
                  $largura="230px"
                  $larguraResponsive="340px"
                  autoComplete="off"
                  maxLength={250}
                />
              <TagPModelo>{formPaciente.swabNasal?.length || 0}/250</TagPModelo>

              </div>
              <div>
                <TagPModelo>Swab Oral</TagPModelo>

                <InputDadosCampoSwabs
                  type="text"
                  name="swabOral"
                  value={formPaciente.swabOral || ""}
                  onChange={handleChange}
                  $largura="230px"
                  $larguraResponsive="340px"
                  autoComplete="off"
                  maxLength={250}

                />
              <TagPModelo>{formPaciente.swabOral?.length || 0}/250</TagPModelo>

              </div>
              <div>
               
                <TagPModelo>Swab Retal</TagPModelo>

                <InputDadosCampoSwabs
                  type="text"
                  name="swabRetal"
                  value={formPaciente.swabRetal || ""}
                  onChange={handleChange}
                  $largura="230px"
                  $larguraResponsive="340px"
                  autoComplete="off"
                  maxLength={250}

                />
              <TagPModelo>{formPaciente.swabRetal?.length || 0}/250</TagPModelo>

              </div>
              <div>
                <TagPModelo>Secreção Traqueal</TagPModelo>

                <InputDadosCampoSwabs
                  type="text"
                  name="secrecaoTraqueal"
                  value={formPaciente.secrecaoTraqueal || ""}
                  onChange={handleChange}
                  $largura="230px"
                  $larguraResponsive="340px"
                  autoComplete="off"
                  maxLength={250}

                />
              <TagPModelo>{formPaciente.secrecaoTraqueal?.length || 0}/250</TagPModelo>

              </div>
              <div>
                <TagPModelo>Hemocultura</TagPModelo>

                <InputDadosCampoSwabs
                  type="text"
                  name="hemocultura"
                  value={formPaciente.hemocultura || ""}
                  onChange={handleChange}
                  $largura="230px"
                  $larguraResponsive="340px"
                  autoComplete="off"
                  maxLength={250}

                />
              <TagPModelo>{formPaciente.hemocultura?.length || 0}/250</TagPModelo>

              </div>
              <div>
                <TagPModelo>Urocultura</TagPModelo>

                <InputDadosCampoSwabs
                  type="text"
                  name="urocultura"
                  value={formPaciente.urocultura|| ""}
                  onChange={handleChange}
                  $largura="230px"
                  $larguraResponsive="340px"
                  autoComplete="off"
                  maxLength={250}

                />
              <TagPModelo>{formPaciente.urocultura?.length || 0}/250</TagPModelo>

              </div>
              <div>
                <TagPModelo>Fragmento de Osso</TagPModelo>

                <InputDadosCampoSwabs
                  type="text"
                  name="fragOsso"
                  value={formPaciente.fragOsso || ""}
                  onChange={handleChange}
                  $largura="230px"
                  $larguraResponsive="340px"
                  autoComplete="off"
                  maxLength={250}

                />
              <TagPModelo>{formPaciente.fragOsso?.length || 0}/250</TagPModelo>

              </div><div>
                <TagPModelo>Fragmento de Pele</TagPModelo>

                <InputDadosCampoSwabs
                  type="text"
                  name="fragPele"
                  value={formPaciente.fragPele || ""}
                  onChange={handleChange}
                  $largura="230px"
                  $larguraResponsive="340px"
                  autoComplete="off"
                  maxLength={250}

                />
              <TagPModelo>{formPaciente.fragPele?.length || 0}/250</TagPModelo>

              </div><div>
                <TagPModelo>Fragmento de Partes Moles</TagPModelo>

                <InputDadosCampoSwabs
                  type="text"
                  name="fragMoles"
                  value={formPaciente.fragMoles || ""}
                  onChange={handleChange}
                  $largura="230px"
                  $larguraResponsive="340px"
                  autoComplete="off"
                  maxLength={250}

                />
              <TagPModelo>{formPaciente.fragMole?.length || 0}/250</TagPModelo>

              </div>
             <div>
                <TagPModelo>Anotações</TagPModelo>

                <InputDadosCampoSwabs
                  type="text"
                  name="infos"
                  value={formPaciente.infos|| ""}
                  onChange={handleChange}
                  $largura="730px"
                  $larguraResponsive="340px"
                  autoComplete="off"
                  maxLength={250}
                />

              <TagPModelo>{formPaciente.infos?.length || 0}/250</TagPModelo>

              </div>

          </CamposWapperDiv>

           </>) 
           :
           (<>
            <CamposWapperDiv>
              <div>
                <TagPModelo>Swab Nasal</TagPModelo>
                <TagPSomenteLeituraSwabs $larguraResponsive="340px">{formPaciente.swabNasal}</TagPSomenteLeituraSwabs>
                
              </div>
              <div>
                <TagPModelo>Swab Oral</TagPModelo>
                <TagPSomenteLeituraSwabs $larguraResponsive="340px">{formPaciente.swabOral}</TagPSomenteLeituraSwabs>

              </div>
              <div>
               
                <TagPModelo>Swab Retal</TagPModelo>

                <TagPSomenteLeituraSwabs $larguraResponsive="340px">{formPaciente.swabRetal}</TagPSomenteLeituraSwabs>

              </div>
              <div>
                <TagPModelo>Secreção Traqueal</TagPModelo>

                <TagPSomenteLeituraSwabs $larguraResponsive="340px">{formPaciente.secrecaoTraqueal}</TagPSomenteLeituraSwabs>
              
              </div>
              <div>
                <TagPModelo>Hemocultura</TagPModelo>

                <TagPSomenteLeituraSwabs $larguraResponsive="340px">{formPaciente.hemocultura}</TagPSomenteLeituraSwabs>
              
              </div>
              <div>
                <TagPModelo>Urocultura</TagPModelo>

                <TagPSomenteLeituraSwabs  $larguraResponsive="340px">{formPaciente.urocultura}</TagPSomenteLeituraSwabs>
               
              </div>
              <div>
                <TagPModelo>Fragmento de Osso</TagPModelo>

                <TagPSomenteLeituraSwabs  $larguraResponsive="340px">{formPaciente.fragOsso}</TagPSomenteLeituraSwabs>
               
              </div><div>
                <TagPModelo>Fragmento de Pele</TagPModelo>

                <TagPSomenteLeituraSwabs  $larguraResponsive="340px">{formPaciente.fragPele}</TagPSomenteLeituraSwabs>
               
              </div><div>
                <TagPModelo>Fragmento de Partes Moles</TagPModelo>

                <TagPSomenteLeituraSwabs  $larguraResponsive="340px">{formPaciente.fragMole}</TagPSomenteLeituraSwabs>
               
              </div>
             <div>
                <TagPModelo>Anotações</TagPModelo>
                  
                <TagPSomenteLeituraSwabs $largura="730px" $larguraResponsive="340px">{formPaciente.infos}</TagPSomenteLeituraSwabs>

              </div>

          </CamposWapperDiv>

           </>)}
          {mode === "edit" && cultura.atualizado && (
            <TagPModelo>Atualizado - {formatarData(cultura.atualizado)}</TagPModelo>
          )}
        </ModalBodySwabs>



        {setorCCIH?.toUpperCase() === "CCIH" && (
          <div className="divBtn">
            {mode === "create" && (
              <BtnSalvarAdm onClick={() => onSalvar(formPaciente)}>
                Adicionar
              </BtnSalvarAdm>
            )}
            {mode === "edit" && (
              <>
                <BtnSalvarAdm onClick={() => onSalvar(formPaciente)}>
                  Atualizar
                </BtnSalvarAdm>
                <BtnExcluir onClick={() => onExcluir(formPaciente)}>
                  Excluir
                </BtnExcluir>
              </>
            )}
          </div>
        )}

      </ModalContainer>
    </Overlay>
  );
};

export default ModalCCIH;
