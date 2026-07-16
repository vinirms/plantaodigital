import React, { useCallback, useEffect, useState } from "react";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalBody,
  BotaoFechar,
  InputDados,
  InputTextArea,
  BtnSalvarAdm,
  BtnSalvarEdicao,
  BtnExcluir,
  BtnContainer,
  InputDadosAlergia,
  InputDadosDiagnostico,
  InputDadosDreno,
  EvacuacaoUFI,
  OstomiasOpcoes,
  InputDadosClinica,
  InputDadosVentilacao,
  BtnModelo,
  RowCampoAlergiaDiagnostico,
  TagPModelo,
  RowCampoAcessoData,
  AcessosDataContainer,
  AcessosAVP,
  AcessosCVC,
  AcessosCDL,
  CampoPrecaucaoContainer,
  RowCampoPrecaucaoDietaDiurese,
  RowCampoDrenosEvacuacaoOstomias,
  CampoDrenoContainer,
  CampoEvacuacaoContainer,
  AcessosPAI,
  CampoOstomiasContainer,
  RowCampoClinicaVentilacaoMobilidade,
  CampoClinicaContainer,
  CampoVentilacaoContainer,
  CampoMobilidadeContainer,
  CampoAlergiaContainer,
  CampoDiagnosticoContainer,
  CampoPulseiraContainer,
  CampoConscienciaContainer,
  RowCampoIntercorrenciasCurativoInfusoes,
  IntercorrenciaTextArea,
  RowCampoCirurgiaExames,
  CampoDietaContainer,
  CampoDiureseContainer,
  DivTransferencia,
  BtnTransferencia,
  BtnTransferir,
  InputDadosDieta,
  DivAtualizado,
  JelcoAvp,
  CampoPendenciaContainer,
  InputDadosPendencia,
  RowImagensLesoes,
  CardImagem,
  CardAdicionar
} from "./ModalDetalhesStyle";

import {
  TabBar,
  TabBtn,
  TabSection,
  RowNutri,
  CampoNutri,
  LabelNutri,
  SectionTitleNutri,
  DividerNutri,
  InputNutri,
  SelectNutri,
  TextareaNutri,
  BtnNutri,
  IdentificacaoPaciente,
  ImcClassificacao,
  SuplementoWrapper,
  RowNutriTriagem,
  NutriTriagemontainer,
  InputNutriDietaPrescrita,
} from "./ModalDetalhesNutri";
import { ModeloPLabel } from "../CardCCIH/CardCCIHStyle";
import api from "../../Services/Api";
import ModalLoading from "../ModalLoading/ModalLoading";
import ModalImagem from "../ModalImagem/ModalImagem";
// ─── Estado inicial ───────────────────────────────────────────────────────────
const inserirPaciente = {
  // campos de enfermagem
  enfLeito: "",
  nomePaciente: "",
  idade: "",
  prontuario: "",
  dataInternacao: "",
  comorbidades: "",
  clinica: "",
  diagnostico: "",
  alergias: null,
  alergiaDescricao: null,
  curativo: "",
  exames: "",
  diurese: null,
  dieta: null,
  dietaDescricao: null,
  evacuacao: null,
  evacuacaoUFI: null,
  drenos: null,
  drenosDescricao: null,
  ostomias: null,
  ostomiasDescricao: null,
  swabData: null,
  intercorrencias: "",
  cirurgias: "",
  ventilacao: null,
  ventilacaoDescricao: null,
  setor:
    typeof localStorage !== "undefined" ? localStorage.getItem("setor") : null,
  mobilidade: null,
  acessoAvpTipo: null,
  jelcoAvp:null,
  acessoAvpData: null,
  acessoCvcTipo: null,
  acessoCvcData: null,
  acessoCdlTipo: null,
  acessoCdlData: null,
  acessoPaiTipo: null,
  acessoPaiData: null,
  pulseiraID: null,
  nivConsciencia: null,
  infusoes: null,
  chaveComposta:null,
  admPor:null,
  attProfissional:null,
  pendencia:null,
  // campos de nutrição
  triagemResult: null,
 estadoNutricional: null,
  dataAvaliacao: null,
  viaAlimentar: "",
  dietaPrescrita: null,
  aceitacaoDieta: "",
  usoSuplemento: null,
  suplementoDescricao: null,
  proxAvaliacao: "",
  lactario: "",
  bigRefeicoes: "",
  smallRefeicoes: null
  // nutriGrandeRefeicao: null,
  // nutriPequebaRefeicao: null,
  // nutri_pesoAtual: "",
  // nutri_pesoHabitual: "",
  // nutri_altura: "",
  // nutri_imc: "",
  // nutri_circAbdominal: "",
  // nutri_circBraco: "",
  // nutri_dobCutanea: "",
  // nutri_necessidadeEnergetica: "",
  // nutri_necessidadeProteica: "",
};

// ─── Componente ───────────────────────────────────────────────────────────────
const ModalDetalhes = ({
  mode,
  aberto,
  onClose,
  paciente,
  onSalvar,
  onExcluir,
  abaAtiva,       
  onAbaChange,
}) => {
  const [formPaciente, setFormPaciente] = useState(inserirPaciente);
  // const [abaAtiva, setAbaAtiva] = useState("Enfermagem");
  const [transferencia, setTransferencia] = useState(false);
const [imagens, setImagens] = useState([]);
const [enviando, setEnviando] = useState(false);
const [confirmandoId, setConfirmandoId] = useState(null);
const [imagemSelecionada, setImagemSelecionada] = useState(null);
  // const setor = localStorage.getItem("setor")
  useEffect(() => {
    if (mode === "create") {
      setFormPaciente({
            ...inserirPaciente,
            setor: localStorage.getItem("setor") ?? null,  // ✅ lê na hora certa
        });
      onAbaChange("Enfermagem");
    }
    if (mode === "edit" && paciente) {
      setFormPaciente(paciente);
      onAbaChange("Enfermagem");
    }
  }, [mode, paciente]);

  if (!aberto || !formPaciente) return null;

  const handleChange = (e) => {
    // setFormPaciente({ ...formPaciente, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormPaciente((prev) => ({
      ...prev,
      [name]: name === "nomePaciente" ? value.toUpperCase() : value,
      [name]: name === "pendencia" ? value.toLowerCase() : value,

    }));
    
  };
const setor =  localStorage.getItem("setor")
  // Recalcula IMC automaticamente
  // const handleChangeNutri = (e) => {
  //   const { name, value } = e.target;
  //   const updated = { ...formPaciente, [name]: value };

  //   if (name === 'nutri_pesoAtual' || name === 'nutri_altura') {
  //     const peso = parseFloat(name === 'nutri_pesoAtual' ? value : updated.nutri_pesoAtual);
  //     const altM = parseFloat(name === 'nutri_altura' ? value : updated.nutri_altura) / 100;
  //     if (peso > 0 && altM > 0) {
  //       updated.nutri_imc = (peso / (altM * altM)).toFixed(1);
  //     } else {
  //       updated.nutri_imc = '';
  //     }
  //   }
  //   setFormPaciente(updated);
  // };

  const dependenciasCampos = {
    alergias: "alergiaDescricao",
    drenos: "drenosDescricao",
    evacuacao: "evacuacaoUFI",
    ostomias: "ostomiasDescricao",
    ventilacao: "ventilacaoDescricao",
  };

  const toggleCampo = (campo, valor) => {
    setFormPaciente((prev) => {
      const novoValor = prev[campo] === valor ? null : valor;
      const campoDependente = dependenciasCampos[campo];
      return {
        ...prev,
        [campo]: novoValor,
        ...(campoDependente && novoValor !== "SIM" && novoValor !== "Ausente"
          ? { [campoDependente]: null }
          : {}),
      };
    });
  };

  const toggleNutri = (campo, valor) => {
    setFormPaciente((prev) => ({
      ...prev,
      [campo]: prev[campo] === valor ? null : valor,
    }));
  };

  const calcularDias = (dataAcesso) => {
    if (!dataAcesso) return null;
    const hoje = new Date();
    const acesso = new Date(dataAcesso);
    const diff = hoje - acesso;

    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

 const handleSelecionarImagem = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/jpeg,image/png,image/webp";

  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 15 MB.");
      return;
    }

    setEnviando(true);

    try {
      // Comprime antes de enviar
      const blobComprimido = await comprimirImagem(file, 1600, 0.8);

      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blobComprimido);
      });

      const dto = {
        pacienteId: paciente.id,
        imagem: base64,
        contentType: "image/jpeg", // sempre jpeg pós-compressão
        descricao: ""
      };

      await api.post("/api/Paciente/Imagem", dto);
      await carregarImagens();
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
      console.error(err.response?.data);
      console.error(err.response?.status);
    } finally {
      setEnviando(false);
    }
  };

  input.click();
};
const carregarImagens = async () => {
  try {
    const { data } = await api.get(`/api/Paciente/Imagem/${paciente.id}`);
    setImagens(data);
        //  console.log(data)

  } catch (err) {
    console.error("Erro ao carregar imagens:", err);
  }
};

const excluirImagem = async (id) => {
  if (!window.confirm("Deseja realmente excluir esta imagem?")) return;

  try {
    setEnviando(true);

    await api.delete(`/api/Paciente/Imagem/${id}`);
    await carregarImagens();
  } catch (err) {
    console.error("Erro ao excluir imagem:", err);
  } finally{
    setEnviando(false);

  }
};

useEffect(() => {
  if (mode === "edit" && paciente?.id) {
    carregarImagens();
  }
}, [mode, paciente?.id]);

 const formatarData = (timestamp) => {
    if (!timestamp) return "";
    const data = new Date(timestamp);
    return data.toLocaleString("pt-BR");
  };

const comprimirImagem = (file, maxDimensao = 1600, qualidade = 0.8) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      // Redimensiona mantendo proporção, só se ultrapassar o máximo
      if (width > maxDimensao || height > maxDimensao) {
        if (width > height) {
          height = Math.round((height * maxDimensao) / width);
          width = maxDimensao;
        } else {
          width = Math.round((width * maxDimensao) / height);
          height = maxDimensao;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Falha ao comprimir imagem."));
            return;
          }
          resolve(blob);
        },
        "image/jpeg",
        qualidade
      );
    };

    img.onerror = reject;
    img.src = url;
  });
};

  // const classificarIMC = (imc) => {
  //     const v = parseFloat(imc);
  //     if (!v) return '';
  //     if (v < 18.5) return '⚠ Baixo peso';
  //     if (v < 25) return '✓ Eutrófico';
  //     if (v < 30) return '⚠ Sobrepeso';
  //     return '⚠ Obesidade';
  //   };
  //  useEffect(() => {
  //     if (onProf) setAbaAtiva(onProf);
  //   }, [onProf]);

  // Função principal dos cliques
  // const handleTabClick = useCallback((novaProf) => {
  //   setAbaAtiva(novaProf);           // Muda aba interna
  //   onProfChange?.(novaProf);        // Atualiza pai (opcional)
  // }, [onProfChange]);

  return (
    <Overlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>
            {mode === "create" ? "Nova Admissão" : "Detalhes do Paciente"}
          </h3>
          <BotaoFechar onClick={onClose}>×</BotaoFechar>
        </ModalHeader>

        {/* ── Barra de Abas ── */}
     

        <TabBar>
          <TabBtn
            $ativo={abaAtiva === "Enfermagem"}
            onClick={() => onAbaChange("Enfermagem")}
          >
            🏥 Enfermagem
          </TabBtn>
          <TabBtn
            $ativo={abaAtiva === "Nutricao"}
            onClick={() => onAbaChange("Nutricao")}
          >
            🥗 Nutrição
          </TabBtn>
          {/* {mode === "create" ? (
            profissao === "Nutricao" ? (
              <TabBtn $ativo={abaAtiva === 'Nutricao'} onClick={() => setAbaAtiva('Nutricao')}>
                🥗 Nutrição
              </TabBtn>
            ) : (
              <TabBtn $ativo={abaAtiva === 'Enfermagem'} onClick={() => setAbaAtiva('Enfermagem')}>
                🏥 Enfermagem
              </TabBtn>
            )
          ) : (
            <>
              <TabBtn $ativo={abaAtiva === 'Enfermagem'} onClick={() => handleTabClick('Enfermagem')}>
                🏥 Enfermagem
              </TabBtn>
              <TabBtn $ativo={abaAtiva === 'Nutricao'} onClick={() => handleTabClick('Nutricao')}>
                🥗 Nutrição
              </TabBtn>
            </>
          )} */}
        </TabBar>

        {/* ══════════════════════════════════════════════════
            ABA ENFERMAGEM — código original preservado
        ══════════════════════════════════════════════════ */}
        <TabSection $visivel={abaAtiva === "Enfermagem"}>
          <SectionTitleNutri>Triagem Admissional</SectionTitleNutri>

          <ModalBody>
            <div className="divCampos">
              <TagPModelo>*Enf/Leito</TagPModelo>
              <InputDados
                type="text"
                name="enfLeito"
                value={formPaciente.enfLeito || ""}
                onChange={handleChange}
                $largura="55px"
                $larguraResponsive="55px"
                autoComplete="off"
                placeholder="000/0"
              />
            </div>
            <div className="divCampos">
              <TagPModelo>*Nome</TagPModelo>
              <InputDados
                type="text"
                name="nomePaciente"
                value={formPaciente.nomePaciente || ""}
                onChange={handleChange}
                $largura="400px"
                $larguraResponsive="245px"
                autoComplete="off"
              />
            </div>
            <div className="divCampos">
              <TagPModelo>*Idade</TagPModelo>
              <InputDados
                type="text"
                name="idade"
                value={formPaciente.idade || ""}
                onChange={handleChange}
                $largura="40px"
                $larguraResponsive="55px"
                autoComplete="off"
              />
            </div>
            <div className="divCampos">
              <TagPModelo>*Prontuário</TagPModelo>
              <InputDados
                type="text"
                name="prontuario"
                value={formPaciente.prontuario || ""}
                onChange={handleChange}
                $largura="65px"
                autoComplete="off"
              />
            </div>
            <div className="divCampos">
              <TagPModelo>*Data de Internação</TagPModelo>
              <InputDados
                type="date"
                name="dataInternacao"
                value={formPaciente.dataInternacao || ""}
                onChange={handleChange}
                $largura="110px"
                $larguraResponsive="115px"
              />
            </div>
          </ModalBody>

          <RowCampoAlergiaDiagnostico>
            <CampoAlergiaContainer>
              <TagPModelo>Alergias</TagPModelo>
              <div className="grupo">
                <BtnModelo
                  $larguraBtn="70px"
                  $ativo={
                    formPaciente.alergias !== "NEGA" &&
                    formPaciente.alergias !== null
                  }
                  disabled={formPaciente.alergias === "NEGA"}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    toggleCampo("alergias", "SIM");
                  }}
                >
                  SIM
                </BtnModelo>
                <BtnModelo
                  $larguraBtn="70px"
                  $ativo={formPaciente.alergias === "NEGA"}
                  disabled={
                    formPaciente.alergias && formPaciente.alergias !== "NEGA"
                  }
                  onClick={() => toggleCampo("alergias", "NEGA")}
                >
                  NEGA
                </BtnModelo>
                <InputDadosAlergia
                  $visible={
                    formPaciente.alergias !== "NEGA" &&
                    formPaciente.alergias !== null
                  }
                  type="text"
                  name="alergiaDescricao"
                  placeholder="Quais ?"
                  value={formPaciente.alergiaDescricao || ""}
                  onChange={handleChange}
                  $largura="590px"
                  $larguraResponsive="325px"
                  autoComplete="off"
                />
              </div>
            </CampoAlergiaContainer>

            <CampoPulseiraContainer>
              <TagPModelo>Pulseira ID</TagPModelo>
              <div className="grupo">
                <BtnModelo
                  $larguraBtn="70px"
                  $ativo={formPaciente.pulseiraID === "SIM"}
                  disabled={
                    formPaciente.pulseiraID && formPaciente.pulseiraID !== "SIM"
                  }
                  onClick={() => toggleCampo("pulseiraID", "SIM")}
                >
                  SIM
                </BtnModelo>
                <BtnModelo
                  $larguraBtn="70px"
                  $ativo={formPaciente.pulseiraID === "NAO"}
                  disabled={
                    formPaciente.pulseiraID && formPaciente.pulseiraID !== "NAO"
                  }
                  onClick={() => toggleCampo("pulseiraID", "NAO")}
                >
                  NAO
                </BtnModelo>
              </div>
            </CampoPulseiraContainer>

            <CampoConscienciaContainer>
              <TagPModelo>Nível de Consciencia: </TagPModelo>
                  {setor === "Pediatria" ? (


                <div className="grupo">
                {["Lucido", "Agitado", "Confuso", "Ativo/Reativo"].map((v) => (
                  <BtnModelo
                    key={v}
                    $ativo={formPaciente.nivConsciencia === v}
                    disabled={
                      formPaciente.nivConsciencia &&
                      formPaciente.nivConsciencia !== v
                    }
                    onClick={() => toggleCampo("nivConsciencia", v)}
                    $larguraBtn="80px"
                  >
                    {v === "Lucido" ? "Lúcido" : v}
                  </BtnModelo>
                ))}

              </div>

                  ):( 


                  <div className="grupo">
                    {["Lucido", "Agitado", "Confuso", "Torpor", "Sonolento", "Coma"].map((v) => (
                      <BtnModelo
                        key={v}
                        $ativo={formPaciente.nivConsciencia === v}
                        disabled={
                          formPaciente.nivConsciencia &&
                          formPaciente.nivConsciencia !== v
                        }
                        onClick={() => toggleCampo("nivConsciencia", v)}
                        $larguraBtn="62px"
                      >
                        {v === "Lucido" ? "Lúcido" : v}
                      </BtnModelo>
                    ))}
              </div>
                  )}
              
             
            </CampoConscienciaContainer>

            <CampoDiagnosticoContainer>
              <TagPModelo>Diagnóstico</TagPModelo>
              <div>
                <InputDadosDiagnostico
                  type="text"
                  name="diagnostico"
                  value={formPaciente.diagnostico || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </CampoDiagnosticoContainer>
                    {/* combordidades */}
             <CampoDiagnosticoContainer>
              <TagPModelo>Comorbidades</TagPModelo>
              <div>
                <InputDadosDiagnostico
                  type="text"
                  name="comorbidades"
                  value={formPaciente.comorbidades || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </CampoDiagnosticoContainer>
          </RowCampoAlergiaDiagnostico>

          <DividerNutri />

          <RowCampoAcessoData>
            <SectionTitleNutri>Acessos e Datas</SectionTitleNutri>

            <AcessosDataContainer>
              <AcessosAVP>
                <TagPModelo>AVP:</TagPModelo>
                <select
                  name="acessoAvpTipo"
                  value={formPaciente.acessoAvpTipo || ""}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {["Sem AVP", "MSE", "MSD", "MID", "MIE", "VJD", "VJE"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>

                 {formPaciente.acessoAvpTipo && (
                  <JelcoAvp
                  name="jelcoAvp"
                  value={formPaciente.jelcoAvp || ""}
                  onChange={handleChange}
                >
                  <option value="">J-</option>
                  {["14", "16", "18", "20", "22", "24"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </JelcoAvp>
                )}
                <input
                  type="date"
                  name="acessoAvpData"
                  value={formPaciente.acessoAvpData || ""}
                  onChange={handleChange}
                />

               
              {formPaciente.acessoAvpData && (
                  <span>{calcularDias(formPaciente.acessoAvpData)} d</span>
                )}
             
              </AcessosAVP>
              
              <AcessosCVC>
                <TagPModelo>CVC:</TagPModelo>
                <select
                  name="acessoCvcTipo"
                  value={formPaciente.acessoCvcTipo || ""}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {["Sem CVC", "SBD", "SBE", "VFE", "VFD", "VJE", "VJD"].map(
                    (o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ),
                  )}
                </select>
                <input
                  type="date"
                  name="acessoCvcData"
                  value={formPaciente.acessoCvcData || ""}
                  onChange={handleChange}
                />

                {formPaciente.acessoCvcData && (
                  <span>{calcularDias(formPaciente.acessoCvcData)} d</span>
                )}
              </AcessosCVC>
              <AcessosCDL>
                <TagPModelo>CDL:</TagPModelo>
                <select
                  name="acessoCdlTipo"
                  value={formPaciente.acessoCdlTipo || ""}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {["Sem CDL", "SBD", "SBE", "VFE", "VFD"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="acessoCdlData"
                  value={formPaciente.acessoCdlData || ""}
                  onChange={handleChange}
                />

                 {formPaciente.acessoCdlData && (
                  <span>{calcularDias(formPaciente.acessoCdlData)} d</span>
                )}
              </AcessosCDL>
              <AcessosPAI>
                <TagPModelo>PAI:</TagPModelo>
                <select
                  name="acessoPaiTipo"
                  value={formPaciente.acessoPaiTipo || ""}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {["Sem PAI", "ARD", "ARE", "AFD", "AFE"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="acessoPaiData"
                  value={formPaciente.acessoPaiData || ""}
                  onChange={handleChange}
                />

                {formPaciente.acessoPaiData && (
                  <span>{calcularDias(formPaciente.acessoPaiData)} d</span>
                )}
              </AcessosPAI>
            </AcessosDataContainer>
          </RowCampoAcessoData>

          <DividerNutri />

          <SectionTitleNutri>Tipo de precauçao e dieta</SectionTitleNutri>
          <RowCampoPrecaucaoDietaDiurese>
            <CampoPrecaucaoContainer>
              <TagPModelo>Precaução </TagPModelo>
              <div className="grupo">
                {[
                  "Padrão",
                  "Contato",
                  "Goticula",
                  "Aerossóis",
                  "Isolamento",
                ].map((v) => (
                  <BtnModelo
                    key={v}
                    $ativo={formPaciente.swabData === v}
                    disabled={
                      formPaciente.swabData && formPaciente.swabData !== v
                    }
                    onClick={() => toggleCampo("swabData", v)}
                    $larguraBtn="70px"
                  >
                    {v}
                  </BtnModelo>
                ))}
              </div>
            </CampoPrecaucaoContainer>

            <CampoDietaContainer>
              <TagPModelo>Dieta </TagPModelo>
              <div className="grupo">
                <BtnModelo
                  $ativo={formPaciente.dieta === "Oral"}
                  disabled={formPaciente.dieta && formPaciente.dieta !== "Oral"}
                  onClick={() => toggleCampo("dieta", "Oral")}
                  $larguraBtn="40px"
                >
                  Oral
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.dieta === "Zero"}
                  disabled={formPaciente.dieta && formPaciente.dieta !== "Zero"}
                  onClick={() => toggleCampo("dieta", "Zero")}
                  $larguraBtn="40px"
                >
                  Zero
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.dieta === "NPT"}
                  disabled={formPaciente.dieta && formPaciente.dieta !== "NPT"}
                  onClick={() => toggleCampo("dieta", "NPT")}
                  $larguraBtn="35px"
                >
                  NPT
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.dieta === "Enteral"}
                  disabled={
                    formPaciente.dieta && formPaciente.dieta !== "Enteral"
                  }
                  onClick={() => toggleCampo("dieta", "Enteral")}
                  $larguraBtn="50px"
                >
                  Enteral
                </BtnModelo>
                
                {setor === "Pediatria" && (
                  <>
                  <BtnModelo
                  $ativo={formPaciente.dieta === "Mamadeira"}
                  disabled={
                    formPaciente.dieta && formPaciente.dieta !== "Mamadeira"
                  }
                  onClick={() => toggleCampo("dieta", "Mamadeira")}
                  $larguraBtn="68px"
                >
                  Mamadeira
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.dieta === "Seio"}
                  disabled={
                    formPaciente.dieta && formPaciente.dieta !== "Seio"
                  }
                  onClick={() => toggleCampo("dieta", "Seio")}
                  $larguraBtn="78px"
                >
                  Seio Materno
                </BtnModelo>
                
                
                  </>
                )}
                <BtnModelo
                  $ativo={formPaciente.dieta === "Outro"}
                  disabled={
                    formPaciente.dieta && formPaciente.dieta !== "Outro"
                  }
                  onClick={() => toggleCampo("dieta", "Outro")}
                  $larguraBtn="40px"
                >
                  Outro
                </BtnModelo>
                <InputDadosDieta
                  $visible={
                    formPaciente.dieta == "Outro" &&
                    formPaciente.dieta !== null
                  }
                  type="text"
                  name="dietaDescricao"
                  placeholder="Qual ?"
                  value={formPaciente.dietaDescricao || ""}
                  onChange={handleChange}
                  $largura="590px"
                  $larguraResponsive="325px"
                  autoComplete="off"
                />
              </div>
            </CampoDietaContainer>

            
          </RowCampoPrecaucaoDietaDiurese>

          <DividerNutri />
          <SectionTitleNutri>Eliminacões</SectionTitleNutri>

          <RowCampoDrenosEvacuacaoOstomias>
            <CampoDiureseContainer>
              <TagPModelo>Diurese </TagPModelo>
              <div className="grupo">
                <BtnModelo
                  $ativo={formPaciente.diurese === "Espontanea"}
                  disabled={
                    formPaciente.diurese &&
                    formPaciente.diurese !== "Espontanea"
                  }
                  onClick={() => toggleCampo("diurese", "Espontanea")}
                  $larguraBtn="80px"
                >
                  Espontanea
                </BtnModelo>

                <BtnModelo
                  $ativo={formPaciente.diurese === "Fralda"}
                  disabled={
                    formPaciente.diurese && formPaciente.diurese !== "Fralda"
                  }
                  onClick={() => toggleCampo("diurese", "Fralda")}
                  $larguraBtn="60px"
                >
                  Fralda
                </BtnModelo>

                <BtnModelo
                  $ativo={formPaciente.diurese === "CVD"}
                  disabled={
                    formPaciente.diurese && formPaciente.diurese !== "CVD"
                  }
                  onClick={() => toggleCampo("diurese", "CVD")}
                  $larguraBtn="40px"
                >
                  CVD
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.diurese === "CVD + IVC"}
                  disabled={
                    formPaciente.diurese && formPaciente.diurese !== "CVD + IVC"
                  }
                  onClick={() => toggleCampo("diurese", "CVD + IVC")}
                  $larguraBtn="80px"
                >
                  CVD + IVC
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.diurese === "Ausente"}
                  disabled={
                    formPaciente.diurese && formPaciente.diurese !== "Ausente"
                  }
                  onClick={() => toggleCampo("diurese", "Ausente")}
                  $larguraBtn="70px"
                >
                  Ausente
                </BtnModelo>
              </div>
            </CampoDiureseContainer>

            <CampoEvacuacaoContainer>
              <TagPModelo>Evacuação </TagPModelo>
              <div className="grupo">
                <BtnModelo
                  $ativo={
                    formPaciente.evacuacao &&
                    formPaciente.evacuacao !== "Ausente"
                  }
                  disabled={formPaciente.evacuacao === "Ausente"}
                  onClick={() => toggleCampo("evacuacao", "Presente")}
                  $larguraBtn="60px"
                >
                  Presente
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.evacuacao === "Ausente"}
                  disabled={
                    formPaciente.evacuacao &&
                    formPaciente.evacuacao !== "Ausente"
                  }
                  onClick={() => toggleCampo("evacuacao", "Ausente")}
                  $larguraBtn="60px"
                >
                  Ausente
                </BtnModelo>
                <EvacuacaoUFI $visible={formPaciente.evacuacao === "Ausente"}>
                  <TagPModelo>UFI:</TagPModelo>
                  <input
                    type="date"
                    name="evacuacaoUFI"
                    value={formPaciente.evacuacaoUFI || ""}
                    onChange={handleChange}
                  />
                </EvacuacaoUFI>
                {formPaciente.evacuacaoUFI && (
                  <span>{calcularDias(formPaciente.evacuacaoUFI)} dias</span>
                )}
              </div>
            </CampoEvacuacaoContainer>

            <CampoOstomiasContainer>
              <TagPModelo>Ostomias </TagPModelo>
              <div className="grupo">
                <BtnModelo
                  $ativo={
                    formPaciente.ostomias && formPaciente.ostomias !== "NAO"
                  }
                  disabled={formPaciente.ostomias === "NAO"}
                  onClick={() => toggleCampo("ostomias", "SIM")}
                  $larguraBtn="40px"
                >
                  SIM
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.ostomias === "NAO"}
                  disabled={
                    formPaciente.ostomias && formPaciente.ostomias !== "NAO"
                  }
                  onClick={() => toggleCampo("ostomias", "NAO")}
                  $larguraBtn="40px"
                >
                  NAO
                </BtnModelo>
                <OstomiasOpcoes $visible={formPaciente.ostomias === "SIM"}>
                  <select
                    name="ostomiasDescricao"
                    value={formPaciente.ostomiasDescricao || ""}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                    <option value="Traqueostomia">Traqueostomia</option>
                    <option value="Colostomia">Colostomia</option>
                    <option value="Ileostomia">Ileostomia</option>
                    <option value="Cistostomia">Cistostomia</option>
                    <option value="Gastrostomia">Gastrostomia</option>
                    <option value="Nefrostomia">Nefrostomia</option>

                  </select>
                </OstomiasOpcoes>
              </div>
            </CampoOstomiasContainer>

            <CampoDrenoContainer>
              <TagPModelo>Drenos </TagPModelo>
              <div className="grupo">
                <BtnModelo
                  $ativo={
                    formPaciente.drenos !== "NAO" &&
                    formPaciente.drenos !== null
                  }
                  disabled={formPaciente.drenos === "NAO"}
                  onClick={() => toggleCampo("drenos", "SIM")}
                  $larguraBtn="60px"
                >
                  SIM
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.drenos === "NAO"}
                  disabled={
                    formPaciente.drenos && formPaciente.drenos !== "NAO"
                  }
                  onClick={() => toggleCampo("drenos", "NAO")}
                  $larguraBtn="60px"
                >
                  NAO
                </BtnModelo>
                <InputDadosDreno
                  $visible={
                    formPaciente.drenos !== "NAO" &&
                    formPaciente.drenos !== null
                  }
                  type="text"
                  name="drenosDescricao"
                  value={formPaciente.drenosDescricao || ""}
                  onChange={handleChange}
                  placeholder="Tipo, Local"
                />
              </div>
            </CampoDrenoContainer>
          </RowCampoDrenosEvacuacaoOstomias>

          <DividerNutri />
          <SectionTitleNutri>Mobilidade e Suporte</SectionTitleNutri>

          <RowCampoClinicaVentilacaoMobilidade>
            <CampoClinicaContainer>
              <TagPModelo>Clinica</TagPModelo>
              <select
                name="clinica"
                value={formPaciente.clinica || ""}
                onChange={handleChange}
              >
              
      <option value="">Selecione</option>
      {["Urologia", "C. Geral", "Neurologia", "Ortopedia", "3 - C. Medica", "7 - C. Medica", "C. Plastica", "Pediatria", "10 - CTI", "Trauma", "Coloprocto", "Gineco/Masto", "C. Vascular", "CTQ", "Otorrino", "Bucomaxilo"].map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
  
               
              </select>
            </CampoClinicaContainer>

            <CampoVentilacaoContainer>
              <TagPModelo>Ventilação </TagPModelo>
              <div className="grupo">
                <BtnModelo
                  $ativo={formPaciente.ventilacao === "AA"}
                  disabled={
                    formPaciente.ventilacao && formPaciente.ventilacao !== "AA"
                  }
                  onClick={() => toggleCampo("ventilacao", "AA")}
                  $larguraBtn="80px"
                >
                  AA
                </BtnModelo>

                <BtnModelo
                  $ativo={formPaciente.ventilacao === "OUTRO"}
                  disabled={
                    formPaciente.ventilacao &&
                    formPaciente.ventilacao !== "OUTRO"
                  }
                  onClick={() => toggleCampo("ventilacao", "OUTRO")}
                  $larguraBtn="80px"
                >
                  OUTRO
                </BtnModelo>
                <InputDadosVentilacao
                  $visible={
                    formPaciente.ventilacao !== "AA" &&
                    formPaciente.ventilacao !== null
                  }
                  type="text"
                  placeholder="Qual ?"
                  name="ventilacaoDescricao"
                  value={formPaciente.ventilacaoDescricao || ""}
                  onChange={handleChange}
                />
              </div>
            </CampoVentilacaoContainer>

            <CampoMobilidadeContainer>
              <TagPModelo>Mobilidade</TagPModelo>
              <div className="grupo">
                <BtnModelo
                  $ativo={formPaciente.mobilidade === "Deambula"}
                  disabled={
                    formPaciente.mobilidade &&
                    formPaciente.mobilidade !== "Deambula"
                  }
                  onClick={() => toggleCampo("mobilidade", "Deambula")}
                  $larguraBtn="80px"
                >
                  Deambula
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.mobilidade === "DeambulaAux"}
                  disabled={
                    formPaciente.mobilidade &&
                    formPaciente.mobilidade !== "DeambulaAux"
                  }
                  onClick={() => toggleCampo("mobilidade", "DeambulaAux")}
                  $larguraBtn="90px"
                >
                  Deambula(aux)
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.mobilidade === "Restrito"}
                  disabled={
                    formPaciente.mobilidade &&
                    formPaciente.mobilidade !== "Restrito"
                  }
                  onClick={() => toggleCampo("mobilidade", "Restrito")}
                  $larguraBtn="80px"
                >
                  Restrito
                </BtnModelo>
                <BtnModelo
                  $ativo={formPaciente.mobilidade === "Acamado"}
                  disabled={
                    formPaciente.mobilidade &&
                    formPaciente.mobilidade !== "Acamado"
                  }
                  onClick={() => toggleCampo("mobilidade", "Acamado")}
                  $larguraBtn="80px"
                >
                  Acamado
                </BtnModelo>
              </div>
            </CampoMobilidadeContainer>
          </RowCampoClinicaVentilacaoMobilidade>

          <DividerNutri />
          <SectionTitleNutri>Informaçoes Assistenciais</SectionTitleNutri>
          
            <CampoPendenciaContainer>
              <TagPModelo>Pendencias</TagPModelo>
              <div>
                
                <InputDadosPendencia
                  type="text"
                  name="pendencia"
                  value={formPaciente.pendencia || ""}
                  onChange={handleChange}
                  autoComplete="off"
                  maxLength={60}
                />
                <TagPModelo>{formPaciente.pendencia?.length || 0}/60</TagPModelo>
              </div>
            </CampoPendenciaContainer>
          
          

          <RowCampoCirurgiaExames>
            <div className="divCampos">
              <TagPModelo>Cirurgias</TagPModelo>
              <InputTextArea
                type="text"
                name="cirurgias"
                value={formPaciente.cirurgias}
                onChange={handleChange}
                $Altura="80px"
              />
            </div>
            <div className="divCampos">
              <TagPModelo>Exames</TagPModelo>
              <InputTextArea
                type="text"
                name="exames"
                value={formPaciente.exames}
                onChange={handleChange}
                $Altura="80px"
              />
            </div>
          </RowCampoCirurgiaExames>

          <RowCampoIntercorrenciasCurativoInfusoes>

            <div className="divCamposInf">
              <TagPModelo>Anotações|Intercorrências</TagPModelo>
              <IntercorrenciaTextArea
                type="text"
                name="intercorrencias"
                value={formPaciente.intercorrencias || ""}
                onChange={handleChange}
                $Altura="110px"
              />
            </div>
            <div className="divCamposInf">
              <TagPModelo>Tegumentar - lesões e curativos</TagPModelo>
              <IntercorrenciaTextArea
                type="text"
                name="curativo"
                value={formPaciente.curativo || ""}
                onChange={handleChange}
                $Altura="110px"
              />
            </div>
            <div className="divCamposInf">
              <TagPModelo>Infusões</TagPModelo>
              <IntercorrenciaTextArea
                type="text"
                name="infusoes"
                value={formPaciente.infusoes || ""}
                onChange={handleChange}
                $Altura="110px"
              />
            </div>
          </RowCampoIntercorrenciasCurativoInfusoes>

             {/* {mode === "edit" && (
              <>
              {enviando && <ModalLoading />}
                <RowImagensLesoes>

                      <SectionTitleNutri>Imagens de lesões  (EM FASE DE TESTE)</SectionTitleNutri>

                      <div className="cards">
                        
                        {imagens.map((img) => {

                        const urlImagem = `${api.defaults.baseURL}/api/Paciente/Imagem/Foto/${img.id}`;

                        return (

                            <CardImagem key={img.id}>

                                <div className="preview">
                                    <img src={urlImagem} alt="" />
                                </div>

                                <div className="info">
                                    <h4>Imagem da lesão</h4>
                                    <span>{formatarData(img.dataUpload)}</span>
                                </div>

                                <div className="acoes">
                                    <button onClick={() => setImagemSelecionada({
                                        id: img.id,
                                        url: urlImagem,
                                        conduta: img.condutaImg,
                                        descricao: img.descricaoImg,
                                    })}>
                                        Visualizar
                                    </button>

                                    <button onClick={() => excluirImagem(img.id)}>
                                        🗑 Excluir
                                    </button>
                                </div>

                            </CardImagem>

                        );

                    })}

                        {imagens.length < 6 && (
                          <CardAdicionar onClick={handleSelecionarImagem}>
                            <div className="plus">+</div>
                            <span>Adicionar</span>
                          </CardAdicionar>
                        )}

                      </div>

                    </RowImagensLesoes>
              </>
)} */}


          <ModalImagem

              aberto={imagemSelecionada !== null}

              imagem={imagemSelecionada}

              onClose={() => setImagemSelecionada(null)}

          />



           {mode === "edit" && (
            <DivAtualizado>
                <p>Admitido por: {formPaciente.admPor}</p> 
                {formPaciente.ultimaAtt && (
                  <p>Ultima att: {new Date(formPaciente.ultimaAtt).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                  })} - por {formPaciente.attProfissional} </p>
      )} 
            
            </DivAtualizado>
           )}       
        

        </TabSection>
        {/* fim aba enfermagem */}

        {/* ══════════════════════════════════════════════════
            ABA NUTRIÇÃO
        ══════════════════════════════════════════════════ */}

        <TabSection
          $visivel={abaAtiva === "Nutricao"}
          style={{ padding: "0 4px" }}
        >
          {/* Identificação (readonly, vem da aba enfermagem) */}
          {mode === "create" ? (
            <ModalBody>
              <div className="divCampos">
                <TagPModelo>*Enf/Leito</TagPModelo>
                <InputDados
                  type="text"
                  name="enfLeito"
                  value={formPaciente.enfLeito || ""}
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
                  value={formPaciente.nomePaciente || ""}
                  onChange={handleChange}
                  $largura="400px"
                  $larguraResponsive="245px"
                  autoComplete="off"
                />
              </div>
              <div className="divCampos">
                <TagPModelo>*Idade</TagPModelo>
                <InputDados
                  type="text"
                  name="idade"
                  value={formPaciente.idade || ""}
                  onChange={handleChange}
                  $largura="40px"
                  $larguraResponsive="55px"
                  autoComplete="off"
                />
              </div>
              <div className="divCampos">
                <TagPModelo>*Prontuário</TagPModelo>
                <InputDados
                  type="text"
                  name="prontuario"
                  value={formPaciente.prontuario || ""}
                  onChange={handleChange}
                  $largura="65px"
                  autoComplete="off"
                />
              </div>
              <div className="divCampos">
                <TagPModelo>*Data de Internação</TagPModelo>
                <InputDados
                  type="date"
                  name="dataInternacao"
                  value={formPaciente.dataInternacao || ""}
                  onChange={handleChange}
                  $largura="110px"
                  $larguraResponsive="115px"
                />
              </div>
            </ModalBody>
          ) : (
            <IdentificacaoPaciente>
              <span>
                <strong>Paciente:</strong> {formPaciente.nomePaciente || "—"}
              </span>
              <span>
                <strong>Leito:</strong> {formPaciente.enfLeito || "—"}
              </span>
              <span>
                <strong>Idade:</strong> {formPaciente.idade || "—"}
              </span>
              <span>
                <strong>Prontuário:</strong> {formPaciente.prontuario || "—"}
              </span>
              <span>
                <strong>Internação:</strong>{" "}
                {formPaciente.dataInternacao || "—"}
              </span>
              <span>
                <strong>Diagnóstico:</strong> {formPaciente.diagnostico || "—"}
              </span>
            </IdentificacaoPaciente>
          )}

          {/* Triagem Nutricional */}
          <RowNutriTriagem>
            <CampoNutri>
              <SectionTitleNutri>
                Triagem Nutricional (NRS-2002 / MNA)
              </SectionTitleNutri>
            </CampoNutri>
            <NutriTriagemontainer>
              <CampoNutri>
                <LabelNutri>Resultado da Triagem</LabelNutri>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {[
                    "Sem risco",
                    "Risco baixo",
                    "Risco moderado",
                    "Risco alto",
                  ].map((v) => (
                    <BtnNutri
                      key={v}
                      $ativo={formPaciente.triagemResult === v}
                      onClick={() => toggleNutri("triagemResult", v)}
                    >
                      {v}
                    </BtnNutri>
                  ))}
                </div>
              </CampoNutri>
              <CampoNutri>
                <LabelNutri>Estado Nutricional</LabelNutri>
                <SelectNutri
                  name="estadoNutricional"
                  value={formPaciente.estadoNutricional || ""}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option>Eutrófico</option>
                  <option>Desnutrição leve</option>
                  <option>Desnutrição moderada</option>
                  <option>Desnutrição grave</option>
                  <option>Sobrepeso</option>
                  <option>Obesidade grau I</option>
                  <option>Obesidade grau II</option>
                  <option>Obesidade grau III</option>
                </SelectNutri>
              </CampoNutri>
              <CampoNutri>
                <LabelNutri>Data da Avaliação</LabelNutri>
                <InputNutri
                  type="date"
                  name="dataAvaliacao"
                  value={formPaciente.dataAvaliacao || ""}
                  onChange={handleChange}
                />
              </CampoNutri>
            </NutriTriagemontainer>
          </RowNutriTriagem>

          {/* <DividerNutri /> */}

          {/* Antropometria */}

          {/* <SectionTitleNutri>Antropometria</SectionTitleNutri>
       
          <RowNutri>
            <CampoNutri>
              <LabelNutri>Peso Atual (kg)</LabelNutri>
              <InputNutri type="number" name="nutri_pesoAtual" value={formPaciente.nutri_pesoAtual || ""} onChange={handleChangeNutri} placeholder="ex: 68.5" step="0.1" />
            </CampoNutri>
            
            <CampoNutri>
              <LabelNutri>Altura (cm)</LabelNutri>
              <InputNutri type="number" name="nutri_altura" value={formPaciente.nutri_altura || ""} onChange={handleChangeNutri} placeholder="ex: 168" />
            </CampoNutri>
            <CampoNutri>
              <LabelNutri>IMC (kg/m²)</LabelNutri>
              <InputNutri type="text" name="nutri_imc" value={formPaciente.nutri_imc || ""} readOnly placeholder="Auto" />
              {formPaciente.nutri_imc && (
                <ImcClassificacao $normal={formPaciente.nutri_imc >= 18.5 && formPaciente.nutri_imc < 25}>
                  {classificarIMC(formPaciente.nutri_imc)}
                </ImcClassificacao>
              )}
            </CampoNutri>
           
          </RowNutri> */}

          <DividerNutri />

          {/* Necessidades nutricionais */}
          <SectionTitleNutri>Necessidades Nutricionais</SectionTitleNutri>

          <RowNutri>
            <CampoNutri>
              <LabelNutri>Via de Alimentação</LabelNutri>
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap",
                  marginTop: "2px",
                }}
              >
                {["Oral", "Zero", "Enteral", "Parenteral", "Mista"].map((v) => (
                  <BtnNutri
                    key={v}
                    $ativo={formPaciente.viaAlimentar=== v}
                    onClick={() => toggleNutri("viaAlimentar", v)}
                  >
                    {v}
                  </BtnNutri>
                ))}
              </div>
            </CampoNutri>
            <CampoNutri $flex="1 1 220px">
              <LabelNutri>Dieta Prescrita</LabelNutri>
              <InputNutriDietaPrescrita
                type="text"
                name="dietaPrescrita"
                value={formPaciente.dietaPrescrita || ""}
                onChange={handleChange}
                placeholder="ex: Hipossódica, pastosa"
                autoComplete="off"
              />
            </CampoNutri>
          </RowNutri>

          <DividerNutri />

          {/* Dieta e Suplementação */}
          <SectionTitleNutri>Dieta e Suplementação</SectionTitleNutri>
          <RowNutri>
            <CampoNutri>
              <LabelNutri>Aceitação da Dieta</LabelNutri>
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap",
                  marginTop: "2px",
                }}
              >
                {[
                  "Boa (>75%)",
                  "Parcial (25-75%)",
                  "Ruim (<25%)",
                  "Recusa",
                ].map((v) => (
                  <BtnNutri
                    key={v}
                    $ativo={formPaciente.aceitacaoDieta === v}
                    onClick={() => toggleNutri("aceitacaoDieta", v)}
                  >
                    {v}
                  </BtnNutri>
                ))}
              </div>
            </CampoNutri>

            <CampoNutri>
              <LabelNutri>Suplemento</LabelNutri>
              <SuplementoWrapper>
                {["SIM", "NAO"].map((v) => (
                  <BtnNutri
                    key={v}
                    $ativo={formPaciente.usoSuplemento === v}
                    onClick={() => toggleNutri("usoSuplemento", v)}
                  >
                    {v}
                  </BtnNutri>
                ))}
                {formPaciente.usoSuplemento === "SIM" && (
                  <InputNutri
                    type="text"
                    name="suplementoDescricao"
                    value={formPaciente.suplementoDescricao || ""}
                    onChange={handleChange}
                    placeholder="Qual / dose?"
                    autoComplete="off"
                    style={{ flex: 1 }}
                  />
                )}
              </SuplementoWrapper>
            </CampoNutri>

            <CampoNutri>
              <LabelNutri>Próxima Avaliação</LabelNutri>
              <InputNutri
                type="date"
                name="proxAvaliacao"
                value={formPaciente.proxAvaliacao || ""}
                onChange={handleChange}
              />
            </CampoNutri>
          </RowNutri>

          <DividerNutri />

          {/* Conduta e Observações */}
          <SectionTitleNutri>Observações</SectionTitleNutri>
          <RowNutri>
            <CampoNutri>
              <LabelNutri>Lactario</LabelNutri>
              <TextareaNutri
                name="lactario"
                value={formPaciente.lactario || ""}
                onChange={handleChange}
                placeholder="Descreva a conduta..."
              />
            </CampoNutri>
            <CampoNutri>
              <LabelNutri>Obs | desj | col | mer | ceia</LabelNutri>
              <TextareaNutri
                name="bigRefeicoes"
                value={formPaciente.bigRefeicoes || ""}
                onChange={handleChange}
                placeholder="Observações gerais..."
              />
            </CampoNutri>
            <CampoNutri>
              <LabelNutri>Obs | Almoço e Jantar</LabelNutri>
              <TextareaNutri
                name="smallRefeicoes"
                value={formPaciente.smallRefeicoes || ""}
                onChange={handleChange}
                placeholder="Observações gerais..."
              />
            </CampoNutri>
          </RowNutri>
        </TabSection>
        {/* fim aba nutrição */}

        {/* Botões (compartilhados) */}
        <BtnContainer $visible={!transferencia}>
          {mode === "create" && (
            <BtnSalvarAdm onClick={() => onSalvar(formPaciente)}>
              Salvar Admissão
            </BtnSalvarAdm>
          )}

          {/* {mode === "create" && abaAtiva === "Nutricao" && (
            <BtnSalvarAdm onClick={() => onSalvar(formPaciente)}>
              Salvar Admissão Nutri
            </BtnSalvarAdm>
          )} */}

          {mode === "edit" && abaAtiva === "Enfermagem" && (
            <>
              <BtnSalvarEdicao onClick={() => onSalvar(formPaciente)}>
                Salvar
              </BtnSalvarEdicao>

              <BtnTransferencia
                onClick={() => setTransferencia(!transferencia)}
              >
                Transferir
              </BtnTransferencia>

              <BtnExcluir onClick={() => onExcluir(formPaciente.id)}>
                Excluir / Alta
              </BtnExcluir>
            </>
          )}
          {mode === "edit" && abaAtiva === "Nutricao" && (
            <>
              <BtnSalvarEdicao onClick={() => onSalvar(formPaciente)}>
                Salvar
              </BtnSalvarEdicao>

              {/* <BtnTransferencia
                onClick={() => setTransferencia(!transferencia)}
              >
                Transferir
              </BtnTransferencia>

              <BtnExcluir onClick={() => onExcluir(formPaciente.id)}>
                Excluir / Alta
              </BtnExcluir> */}
            </>
          )}
        </BtnContainer>

        <DivTransferencia $visible={!transferencia}>
          
            <h5>Preencha a ENF/LEITO E SETOR de destino</h5>
          
          <div className="tranferenciaCamposContainer">
            <div>
              <TagPModelo>*Enf/Leito</TagPModelo>
              <InputDados
                type="text"
                name="enfLeito"
                value={formPaciente.enfLeito || ""}
                onChange={handleChange}
                $largura="55px"
                $larguraResponsive="55px"
                autoComplete="off"
              />
            </div>

            <div>
              <TagPModelo>*Setor</TagPModelo>
              
              <select
                name="setor"
                value={formPaciente.setor || ""}
                onChange={handleChange}
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
              <option value="CTISL">CTI-SL</option>                 
              {/* <option value="SetorOutroTeste">SetorOutroTeste</option>
              <option value="SetorTeste">SetorTeste</option> */}

              {(setor === "CTQIntensivo" || setor === "CTQEnfermaria") && (
                  <> 
                    <option value="CTQIntensivo">CTQ Intensivo</option>
                    <option value="CTQEnfermaria">CTQ Enfermaria</option>
                  
                  </>
                )}
              <option value="Trauma">Trauma</option>
              </select>
            </div>
            <BtnTransferir onClick={() => onSalvar(formPaciente)}>Confirmar</BtnTransferir>
            <BotaoFechar onClick={() => setTransferencia(!transferencia)}>×</BotaoFechar>

          </div>
        </DivTransferencia>
      
        
      </ModalContainer>
    </Overlay>
  );
};

export default ModalDetalhes;
