// ModalDetalhesStyle.js
import styled from "styled-components";
const colorBorderSeparator = "#ecf0f1";
const colorAzulTema = "#0097e6";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    min-height: 90vh;
    max-width: 100%;
  }
`;

export const ModalContainer = styled.div`
  background: #fff;
  max-width: 42%;
  max-height: 85%;
  border-radius: 8px;
  padding: 0px 5px;
  overflow-y: auto;
  overflow-x: hidden; 
  input {
    border: 1px solid #c2ccdb;
    outline: none;
    font-family: "Inter", sans-serif;
    padding: 4px 5px;
    border-radius: 6px;
    font-size: 14px;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
    &:focus {
      border-color: #0882c4;
      box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
    }
  }
 
  select {
    border: 1px solid #c2ccdb;
    outline: none;
    font-family: "Inter", sans-serif;
    padding: 1px 1px;
    border-radius: 6px;
    font-size: 14px;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
    &:focus {
      border-color: #0882c4;
      box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
    }
  }

  @media (max-width: 900px) {
    max-height: 95vh;
    max-width: 100%;
  }
`;

export const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  /* border: 1px solid red; */
  background: #fff;
  z-index: 9999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px 0px;
  h3 {
    margin: 0;
    padding: 0;
    text-align: center;
    color: #0097e6;
    width: 90%;
    text-transform: uppercase;
  }
`;

export const BotaoFechar = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  border: 1px solid #a10707;
  border-radius: 6px;
  background: linear-gradient(135deg, #faf8f8, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #a10707;
  font-size: 14px;
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #fde3e3, #fbbfbb);
    border-color: #a10707;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* img {
    height: 20px;
    width: 20px;
  } */
`;

export const ModalBody = styled.div`
  margin-top:10px;
  display: flex;
  justify-content: space-evenly;
  gap: 8px;
label{
  font-size: 0.8rem;
  font-family: 'Inter', sans-serif;
  color: #57606f ;

}

.divCampos{
  display: flex;
  flex-direction: column;
  gap: 2px;*/

}
  @media (max-width: 900px) {
   flex-wrap: wrap;

  }
`;

export const BtnModelo = styled.button`
  outline: none;
  border-radius: 5px;
  font-family: "Inter", sans-serif;
  font-size: 0.72rem;
  padding: 2px 0;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${(props) => props.$larguraBtn || "100px"};

  background: ${(props) =>
    props.$ativo ? "linear-gradient(135deg, #009DC8, #0077a3)" : "transparent"};
  color: ${(props) => (props.$ativo ? "white" : "#0077a3")};

  border: ${(props) => (props.$ativo ? "none" : " 1px solid #0077a3 ")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  @media (hover: hover) {
    &:hover:not(:disabled) {
      transform: translateY(-1px);
      background: ${(props) =>
        props.disabled
          ? "transparent"
          : "linear-gradient(135deg, #009DC8, #0077a3)"};
      color: ${(props) => (props.disabled ? colorAzulTema : "white")};
      border: ${(props) => (props.$disabled ? " 1px solid #0077a3 " : "none")};
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const TagPModelo = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  font-family: "Inter", sans-serif;
  color: #57606f;
`;
export const TagLabelModelo = styled.label`
  font-size: 0.8rem;
  font-family: "Inter", sans-serif;
  color: #57606f;
`;

//inicio campos alergia e diagnostico
export const RowCampoAlergiaDiagnostico = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 4px 0px;
  box-sizing: border-box;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
  }

  .divBtnModelo {
    display: flex;
    gap: 10px;
  }
`;
export const CampoAlergiaContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 8px;
  flex-wrap: wrap;
  gap: 5px;
  flex-direction: column;
  /* border: 2px solid red; */
  border-right: 1px solid ${colorBorderSeparator};

  @media (max-width: 900px) {
    border: none;
    width: 42%;
    /* border: 2px solid red; */
  }
  .grupo {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
`;
export const InputDadosAlergia = styled.input`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  width: 608px;
  z-index: 9999;
  @media (max-width: 900px) {
    width: 338px;
  }
`;

export const CampoPulseiraContainer = styled.div`
  display: flex;
  padding: 0px 8px;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  flex-direction: column;
  /* border-left: 1px solid ${colorBorderSeparator}; */
  /* border: 2px solid red; */

  @media (max-width: 900px) {
    justify-content: flex-start;
    width: 42%;
    /* border: 2px solid red; */
  }
  .grupo {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
`;
export const CampoConscienciaContainer = styled.div`
  display: flex;
  padding: 0px 8px;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  flex-direction: column;
  /* border: 2px solid red; */
  border-left: 1px solid ${colorBorderSeparator};
  width: 400px;
  @media (max-width: 900px) {
    justify-content: flex-start;
    width: 100%;
    border: none;
  }
  .grupo {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
`;

export const CampoDiagnosticoContainer = styled.div`
  display: flex;
  justify-content: center;
  /* border: 2px solid red; */
  padding: 0px 8px;
  gap: 5px;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    border: none;
  }
  .grupo {
    display: flex;
    gap: 2px;
  }
`;
export const InputDadosDiagnostico = styled.input`
  width: 97%;

  @media (max-width: 900px) {
    width: 338px;
  }
`;
//fim campos alergia e diagnostico

//inicio campos acesso e data
export const RowCampoAcessoData = styled.div`
  margin-top: 5px;
  width: 98%;
  display: flex;
  flex-direction: column;
  padding: 0px 5px;
  gap: 5px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
  }
  /* ecf0f1 */
`;

export const AcessosDataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 5px;
  margin-left: 10px;

  p {
    margin: 0;
    padding: 0;
    font-size: 0.7rem;
  }

  span {
    color: #b10505;
    font-size: 0.8rem;
    background: linear-gradient(135deg, #ffeaa7a4, #ffd53b96);
    border-radius: 2px;
    padding: 1px;
    width: 30px;
  }
 
`;
export const AcessosAVP = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 330px;
  input{
    width:90px;
  }
`;
export const JelcoAvp = styled.select`
max-width: 40px;
`
export const AcessosCVC = styled.div`
  display: flex;
  margin-left: 70px;
  gap: 10px;
  align-items: center;

  width: 330px;

  @media (max-width: 900px) {
    margin-left: 0px;
  }
`;
export const AcessosCDL = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 330px;
`;
export const AcessosPAI = styled.div`
  display: flex;
  margin-left: 70px;
  gap: 14px;
  width: 330px;
  align-items: center;
  @media (max-width: 900px) {
    margin-left: 0px;
  }
`;
//fim campos acesso e data

//inicio campos precaucao
export const RowCampoPrecaucaoDietaDiurese = styled.div`
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  margin-left: 5px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;
export const CampoPrecaucaoContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
  flex-direction: column;
  border-left: 1px solid ${colorBorderSeparator};
  justify-content: center;
  padding: 0px 2px;
  &:first-child {
    border: none;
  }
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    border: none;
  }
  .grupo {
    display: flex;
    gap: 2px;
  }
`;
export const CampoDietaContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
  flex-direction: column;
  border-left: 1px solid ${colorBorderSeparator};
  justify-content: center;
  padding: 0px 8px;
  &:first-child {
    border: none;
  }
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    border: none;
    padding: 0px 0px;
  }
  .grupo {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }
`;
export const InputDadosDieta = styled.input`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  width: 380px;
  z-index: 9999;
  @media (max-width: 900px) {
    width: 338px;
  }
`;
//fim campos precaucao

//inicio campos drenos
export const RowCampoDrenosEvacuacaoOstomias = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    /* border: 2px solid blue; */
  }
`;

export const CampoDrenoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 8px;
  gap: 5px;
  flex-direction: column;
  border-left: 1px solid ${colorBorderSeparator};

  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    border: none;
  }

  .grupo {
    display: flex;
    gap: 2px;
  }
`;
export const CampoDiureseContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 8px;
  gap: 5px;
  border-right: 1px solid ${colorBorderSeparator};

  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    border: none;
    /* border: 2px solid red; */
  }

  .grupo {
    display: flex;
    gap: 4px;
    align-items: center;
  }
`;
export const CampoEvacuacaoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 8px;
  gap: 5px;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    border: none;
    /* border: 2px solid red; */
  }

  input {
    width: 100px;
    height: 18px;
  }
  .grupo {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  span {
    color: #830303;
    font-size: 0.8rem;
    background: linear-gradient(135deg, #ffeaa7a4, #ffd53b96);
    border-radius: 4px;
    padding: 1px;
  }
`;
export const CampoOstomiasContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-left: 1px solid ${colorBorderSeparator};
  padding: 0px 8px;
  gap: 5px;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    border: none;
    align-items: last baseline;
  }

  select {
    height: 24px;
  }
  .grupo {
    display: flex;
    gap: 2px;
  }
`;

export const InputDadosDreno = styled.textarea`
  display: ${({ $visible }) => ($visible ? "Flex" : "None")};
  width: 320px;
  height: 17px;
  font-family: "Inter", sans-serif;
  max-height: 30px;
  border: 1px solid #c2ccdb;
  outline: none;
  padding: 2px 2px;
  border-radius: 6px;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  &:focus {
    border-color: #0882c4;
    box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
  }
  @media (max-width: 900px) {
    width: 98%;
  }
`;
export const EvacuacaoUFI = styled.div`
  display: ${({ $visible }) => ($visible ? "Flex" : "None")};
  gap: 10px;
  align-items: center;
`;
export const OstomiasOpcoes = styled.div`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
`;
//fim campos drenos

//inicio campos clinica
export const RowCampoClinicaVentilacaoMobilidade = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 5px 0px;
  align-items: center;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;
export const CampoClinicaContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  padding: 0px 8px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    border: none;
  }
  select {
    width: 200px;
    height: 18px;
    font-size: 0.9rem;
    padding: 2px 0px;
    height: 24px;
    border: 1px solid #c2ccdb;
    outline: none;
    border-radius: 3px;
    color: black;
  }
`;
export const CampoVentilacaoContainer = styled.div`
  display: flex;
  gap: 3px;
  border-left: 1px solid ${colorBorderSeparator};
  flex-direction: column;
  padding: 0px 8px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    border: none;
  }
  .grupo {
    display: flex;
    gap: 2px;
  }
`;
export const CampoMobilidadeContainer = styled.div`
  display: flex;
  border-left: 1px solid ${colorBorderSeparator};
  gap: 3px;
  padding: 0px 8px;
  flex-direction: column;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    border: none;
  }
  .grupo {
    display: flex;
    gap: 2px;
  }
`;

export const InputDadosClinica = styled.input`
  display: ${({ visible }) => (visible ? "None" : "Flex")};
  width: 98%;
`;
export const InputDadosVentilacao = styled.textarea`
  display: ${({ $visible }) => ($visible ? "Flex" : "None")};
  width: 370px;
  font-family: "Inter", sans-serif;
  max-height: 18px;
  border: 1px solid #c2ccdb;
  outline: none;
  padding: 2px 2px;
  border-radius: 6px;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  &:focus {
    border-color: #0882c4;
    box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
  }
  @media (max-width: 900px) {
    width: 98%;
  }
`;
//fim campos clinicanpx eslint --init

export const BtnContainer = styled.div`
position: sticky;
bottom: 0;
padding: 10px 0;
  background-color: #fff;
  /* border: 2px solid red; */
  display: ${({ $visible }) => ($visible ? "Flex" : "None")};
  justify-content: flex-end;
  gap: 10px;
  @media (max-width: 900px) {
    justify-content: center;
    margin-bottom: 50px;
  }
`;
export const BtnSalvarAdm = styled.button`
  width: 150px;
  color: white;
  background: linear-gradient(135deg, #00c6b2, #00b3e4);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 4px;
  box-shadow: 0 4px 15px rgba(0, 198, 178, 0.4);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #00b3e4, #0090b8);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 198, 178, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
export const BtnTransferencia = styled.button`
  width: 120px;
  color: white;
  background: linear-gradient(135deg, #438a9c, #3d46c0);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 20px;
  /* box-shadow: 0 4px 15px rgba(198, 0, 115, 0.5); */
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #3b899c, #272fa3);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 152, 198, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
export const BtnSalvarEdicao = styled.button`
  width: 150px;
  color: white;
  background: linear-gradient(135deg, #00c6b2, #00b3e4);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 4px;
  box-shadow: 0 4px 15px rgba(0, 198, 178, 0.4);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #00b3e4, #0090b8);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 198, 178, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
export const BtnExcluir = styled.button`
  width: 120px;
  color: white;
  background: linear-gradient(135deg, #ff7675, #ec3535);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 4px;
  box-shadow: 0 4px 15px rgba(0, 198, 178, 0.4);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #c44141, #811818);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 198, 178, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
export const InputDados = styled.input`
  width: ${(props) => props.$largura || "100px"};
  border: 1px solid #c2ccdb;
  outline: none;
  font-family: "Inter", sans-serif;
  padding: 4px 5px;
  border-radius: 6px;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  &:focus {
    border-color: #0882c4;
    box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
  }

  @media (max-width: 900px) {
    width: ${(props) => props.$larguraResponsive || "100px"};
  }
`;

export const CampoPendenciaContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 8px;
  gap: 5px;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  padding: 2px 2px;
  margin-left: 10px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    border: none;
  margin-left: 0px;

  }
  .grupo {
    display: flex;
    gap: 2px;
  }
`;
export const InputDadosPendencia = styled.input`
  width: 95%;

  @media (max-width: 900px) {
    width: 340px;
  }
`;

export const RowCampoIntercorrenciasCurativoInfusoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 5px;
  padding: 5px 0px;

  /* border: 2px solid red; */
  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    /* border: 2px solid red; */
  }
  .divCamposInf {
    display: flex;
    flex-direction: column;
    gap: 2px;

    @media (max-width: 900px) {
      width: 100%;
      /* border: 2px solid red; */
    }
    /* border: 2px solid black; */
  }
`;
export const RowCampoCirurgiaExames = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 5px;
  padding: 5px 0px;

  /* border: 2px solid red; */
  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    /* border: 2px solid red; */
  }
  .divCamposInf {
    display: flex;
    flex-direction: column;
    gap: 2px;

    @media (max-width: 900px) {
      width: 100%;
      /* border: 2px solid red; */
    }
    /* border: 2px solid black; */
  }
`;
export const InputTextArea = styled.textarea`
  width: 370px;
  height: ${(props) => props.$Altura || "100px"};
  font-family: "Inter", sans-serif;
  border: 1px solid #c2ccdb;
  outline: none;
  padding: 2px 2px;
  border-radius: 6px;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  &:focus {
    border-color: #0882c4;
    box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
  }

  @media (max-width: 900px) {
    width: 98%;
  }
`;
export const IntercorrenciaTextArea = styled.textarea`
  width: 240px;
  height: ${(props) => props.$Altura || "100px"};
  font-family: "Inter", sans-serif;
  border: 1px solid #c2ccdb;
  outline: none;
  padding: 2px 2px;
  border-radius: 6px;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  &:focus {
    border-color: #0882c4;
    box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
  }

  @media (max-width: 900px) {
    width: 98%;
  }
`;
export const HeaderAbas = styled.div`
  display: "flex";
  border-bottom: "2px solid #e0e0e0";
  margin-bottom: "12px";
  gap: "4px";
  padding: "0 4px";
`;
export const DivTransferencia = styled.div`
  display: ${({ $visible }) => ($visible ? "None" : "Flex")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  height: 110px;
  width: 100%;
  select{
    width: 120px;
  }
  h5{
  color: #636e72;
  background-color: #fab1a0;
  border: 1px solid #fab1a0;
  margin: 0;
  padding: 10px;
  display: block;      /* era inline-block */
  width: 100%;          /* ocupa a linha toda */
  text-align: center;   /* centraliza o texto dentro da faixa vermelha */
  box-sizing: border-box; /* pra padding não estourar o width: 100% */
}
  .tranferenciaCamposContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;          /* ocupa a linha toda */
    padding: 10px 0;
    gap: 10px;
    border: 1px solid #fab1a0;
    
  box-sizing: border-box;
  }
`;
export const BtnTransferir = styled.button`
    width: 120px;
    color: white;
    background: linear-gradient(135deg, #00c6b2, #00b3e4);
    font-size: 14px;
    cursor: pointer;
    border: none;
    font-weight: 600;
    border-radius: 8px;
    height: 34px;
    padding: 8px 4px;
    box-shadow: 0 4px 15px rgba(0, 198, 178, 0.4);
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
    background: linear-gradient(135deg, #00b3e4, #0090b8);

      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(0, 198, 178, 0.5);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
`

export const DivAtualizado = styled.div`
display: flex;
border-top: 1px solid ${colorBorderSeparator};
gap: 10px;
font-size: 0.8rem;
padding: 5px 0px;
margin-top: 10px;
color: #888;
p{
  margin: 0;
  padding: 0;
}
@media (max-width: 900px) {

   flex-direction: column;
  }
`
export const RowImagensLesoes = styled.div`
  margin-top: 15px;
  border-top: 1px solid ${colorBorderSeparator};
  padding-top: 15px;


  .cards {
    display: flex;
    width: 100%;
    overflow-x: scroll; 
    gap: 10px;
    margin-top: 10px;

    @media (max-width: 900px) {
    overflow-x: hidden;
    flex-wrap: wrap;
    gap: 20px;
    padding-left: 20px;
  }
  }
`;

export const CardImagem = styled.div`
  min-width: 145px;
  height: 215px;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;

  .preview {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ddd;
    background: #fafafa;
   
    img {
      width: 145px;
      height: 120px;
      object-fit: cover;
    }
  }

  .info {
    padding: 10px;
    flex: 1;

    h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
    }

    span {
      color: #888;
      font-size: 12px;
    }
  }

  .acoes {
    display: flex;
    border-top: 1px solid #eee;

    button {
      flex: 1;
      height: 38px;
      border: none;
      background: white;
      cursor: pointer;
      font-size: 13px;

      &:hover {
        background: #1885968f;
      }

      &:first-child {
        border-right: 1px solid #eee;
      }
    }
  }
    @media (max-width: 900px) {

    width: 145px;

    img{
      width: 100%;
    }
   
  }
`;

export const CardAdicionar = styled.div`
  width: 145px;
  height: 215px;
  border: 2px dashed #d9d9d9;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #888;
  transition: .2s;

  &:hover {
    border-color: #1677ff;
    color: #1677ff;
  }

  .plus {
    font-size: 40px;
    line-height: 1;
  }

  span {
    margin-top: 8px;
    font-size: 15px;
  }
`;