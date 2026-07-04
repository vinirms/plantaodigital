import styled from "styled-components";

export const Main = styled.section`
  background-color: #009dc8;
  width: 100%;
  min-height: 100vh; /* melhor que height fixa */
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 100%;
    min-height: 100vh;
  }
`;

export const NavDiv = styled.div`
  background-color: #009dc8;
  height: 12vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 900px) {
    justify-content: space-evenly;
    /* border: 2px solid red; */
    .divLogo {
      /* display: none; */
      img {
        height: 70px;
      }
    }

    .divSetor {
      display: none;
    }
  }

  .divTitulo {
    max-width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      margin: 0;
      padding: 0;
      color: #ffffff;
      font-family: "Poppins", sans-serif;
      text-transform: uppercase;
      /* min, preferred, max */
      font-size: clamp(1.2rem, 2vw, 1.8rem);
      font-weight: 300;
      text-align: center;
      word-break: break-word;
    }
  }

  .divSetor {
    h3 {
      margin: 0;
      padding: 0;
      color: #ffffff;
      font-size: 16px;
      font-weight: 200;
    }
  }

  button {
    height: 28px;
  }
`;

export const Btnlogout = styled.button`
  width: 28px;
  height: 28px;
  cursor: pointer;
  border: 1px solid #c2ccdb;
  border-radius: 6px;
  background: linear-gradient(135deg, #faf8f8, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

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

  img {
    height: 20px;
    width: 20px;
  }
`;

export const MainContainer = styled.div`
  background-color: #f5f6fa;
  height: 88vh;
  width: 99%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* importante pro scroll interno funcionar [web:31] */

  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    min-height: calc(100vh - 12vh);
    border-radius: 20px 20px 0 0;
  }
`;

export const NavCampos = styled.div`
  display: flex;
  min-height: 15vh;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 1457px) {
    margin-bottom: 10px;
  }

  .quantitativo {
    display: flex;
    gap: 10px;
    margin: 10px;
  }
`;

export const ContainerFiltros = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 1140px) {
    padding: 4px 0px;
    /* se quiser usar modo colapsado, ative a prop $visible */
    display: ${({ $visible }) => ($visible ? "none" : "flex")};
  }

  button {
    align-self: flex-end;
  }

  img {
    height: 28px;
  }

  label {
    font-family: "Inter", sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    color: #636e72;
    width: 60px;
  }
`;

export const CampoFiltroEnfLeito = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 1000px) {
    max-width: 100px;
  }
`;

export const FiltroEnf = styled.input`
  width: ${(props) => props.$largura || "50px"};
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

  @media (max-width: 1000px) {
    max-width: 50px;
  }
`;

export const CampoFiltroNome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 1000px) {
    max-width: 220px;
  }
`;
export const CampoFiltroSetores = styled.div`
 select{
  border: 1px solid #c2ccdb;
    outline: none;
    font-family: "Inter", sans-serif;
    padding: 1px 1px;
    border-radius: 6px;
    font-size: 14px;
  padding: 4px 5px;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
    &:focus {
      border-color: #0882c4;
      box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
    }
 }

  @media (max-width: 1000px) {
    max-width: 220px;
  }
`;

export const FiltroNome = styled.input`
  width: ${(props) => props.$largura || "350px"};
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

  @media (max-width: 1000px) {
    width: 280px;
  }
`;

export const BtnNovoPacienteMapaCultura = styled.button`
  width: 120px;
  color: white;
  background: linear-gradient(135deg, #00c6b2, #00b3e4);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 20px;
  /* box-shadow: 0 4px 15px rgba(0, 198, 178, 0.4); */
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

export const BtnInformacoesPacienteMapaCultura = styled.button`
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

export const BtnGerarPDFMapaCultura = styled.button`
  width: 120px;
  color: white;
  background: linear-gradient(135deg, #9c436d, #c03d5e);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 20px;
  /* box-shadow: 0 4px 15px rgba(198, 0, 115, 0.5); */
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #cc2a76, #c03d5e);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(198, 0, 115, 0.5);
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

export const Botoes = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 30px;
  margin-top: 10px;
  flex-wrap: wrap;

  @media (max-width: 1000px) {
    margin-left: 0px;
    gap: 5px;
    width: 100%;
  }
`;

export const BtnFiltrarPacientesMapaCultura = styled.button`
  width: 28px;
  height: 28px;
  cursor: pointer;
  border: 1px solid #c2ccdb;
  border-radius: 6px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #cc4646, #a80505);
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(198, 0, 0, 0.5);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  img {
    height: 20px;
    width: 20px;
  }
`;

export const FlowLista = styled.div`
  background-color: #f5f6fa;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: ; */
  gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  border-top: 1px solid #dce2e6;
  /*flex: 1; ocupa o restante do MainContainer [web:31] */
  min-height: 0; /* necessário para overflow dentro de flex container */

  @media (max-width: 1000px) {
    width: 95%;
  justify-content:center ;

  }

  /* Scrollbar opcional */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c2ccdb;
    border-radius: 4px;
  }
`;

export const BtnReloadPacientesMapaCultura = styled.button`
  width: 28px;
  height: 28px;
  cursor: pointer;
  border: 1px solid #c2ccdb;
  border-radius: 6px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #cc4646, #a80505);
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(198, 0, 0, 0.5);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  img {
    height: 20px;
    width: 20px;
  }
`;
