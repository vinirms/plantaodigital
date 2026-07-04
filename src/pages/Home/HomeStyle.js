import styled from "styled-components";

export const Main = styled.section`
  background-color: #009dc8;
  width: 100%;
  height: 100vh;
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
   
    .divLogo {
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
    justify-content: space-around;
    align-items: center;
    width: 1000px;
    h1 {
      margin: 0;
      padding: 0;
      color: #ffffff;
      font-family: "Poppins", sans-serif;
      text-transform: uppercase;
      font-size: clamp(1.8rem, 0.2vw, 0.9rem);
      font-weight: 300;
      flex-wrap: wrap;
    }
    @media (max-width: 900px) {
      width: 60%;
      min-height: 12vh;
      flex-wrap: wrap;
      justify-content:center ;
      h1 {
        font-size: 1.1rem;
       
      }
      
    }
  }

  button {
    height: 28px;
  }
  .divBtnLogout{
    display: flex;
  }
`;
export const SubDiv= styled.div`
display: flex;
color: white;
flex-direction: column;

  h3 {
      margin: 0;
      padding: 0;
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 200;

    }

    select{
      width: 120px;
      font-size: 18px;
      height: 24px;
      border: 1px solid #c2ccdb;
      outline: none;
      font-family: "Inter", sans-serif;
      padding: 2px 5px;
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
     select{
      width: 100px;
      font-size: 12px;
      height: 18px;

     }
      
    }
`
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
  padding: 0; // ✅ Adicione padding se precisar
  overflow: hidden; // ✅ Evita overflow filhos

  @media (max-width: 900px) {
    width: 100%;
    max-height: 100vh;
  }
`;
export const BtnModeResponsive = styled.button`
  display: none;
  border: none;
  cursor: pointer;
  img {
    height: 22px;
  }
  @media (max-width: 1140px) {
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

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #e3f2fd, #bbdefb);
      border-color: #0882c4;
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
  }
`;
export const NavCampos = styled.div`
  display: flex;
  min-height: 15vh;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  /* border: 1px solid green; */

  @media (max-width: 1457px) {
    /* border: 1px solid green; */
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* border: 2px solid red; */

  @media (max-width: 1140px) {
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0px;
    display: ${({ $visible }) => ($visible ? "None" : "Flex")};
  }
  button {
    align-self: flex-end;
  }
`;

export const Cards = styled.div`
  padding: 10px;
  background-color: #ffffff;
  /* border: 1px solid red; */
  max-width: 120px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 198, 178, 0.29);

  @media (max-width: 1000px) {
    padding: 3px;
    min-width: 90px;
    max-height: 60px;
  }

  h3 {
    margin: 0;
    padding: 0;
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #00c7b2;
    /* border: 1px solid red; */
    @media (max-width: 1000px) {
      font-size: 0.7rem;

      max-width: 100%;
    }
  }
  .cardImage {
    display: flex;
    justify-content: space-around;
    height: 50px;
    align-items: center;
    /* border: 1px solid red; */
    img {
      height: 30px;
    }
    p {
      height: 30px;
      width: 30px;
      text-align: center;
      color: #00c7b2;
      font-family: "Inter", sans-serif;
      font-size: 24px;
    }
  }
`;

export const CampoFiltroEnfLeito = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #636e72;
    @media (max-width: 1000px) {
      max-width: 60px;
    }
  }
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
  label {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #636e72;
    @media (max-width: 1000px) {
      max-width: 60px;
    }
  }
  @media (max-width: 1000px) {
    max-width: 190px;
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
    max-width: 100%;
  }
`;
export const CampoFiltroClinica = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #636e72;
    @media (max-width: 1000px) {
      max-width: 100px;
    }
  }
  @media (max-width: 1000px) {
    max-width: 275px;
  }
`;
export const FiltroClinica = styled.select`
  font-size: 18px;
  border-radius: 5px;
  width: 150px;
  outline: none;
  border: none;
  border-bottom: 1px solid #7f8fa6;
  padding: 3px;
  cursor: pointer;
  /* background-color: #ffffff ; */
`;

export const Botoes = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 30px;
  margin-top: 10px;
  flex-wrap: wrap;
  /* border: 2px solid red; */
  @media (max-width: 1000px) {
    margin-left: 0px;
    gap: 5px;
    width: 100%;
  }
`;

export const FlowLista = styled.div`
  background-color: #f5f6fa;
  height: 66vh;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow-y: auto;
  border-top: 1px solid #e0e0e0;
   align-content: flex-start;
  /* border: 1px solid red; */

  /* align-items: center; */
  /* justify-content: center; */
  @media (max-width: 1000px) {
    justify-content: center;
    width: 88%;
    height: 60vh;
  }
`;
export const BtnFiltrarPacientesHome = styled.button`
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
export const BtnReloadPacientesHome = styled.button`
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
export const BtnNovoAdmissao = styled.button`
  width: 120px;
  color: white;
  background: linear-gradient(135deg, #00c6b2, #00b3e4);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 4px;
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
  @media (max-width: 1000px) {
    margin-left: 10px;
  }
`;
export const BtnGerarPDF = styled.button`
  width: 110px;
  color: white;
  background: linear-gradient(135deg, #e26464, #d31e1e);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 20px;
  /* box-shadow: 0 4px 15px rgba(0, 198, 178, 0.4); */
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #cc4646, #a80505);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(198, 0, 0, 0.5);
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
export const BtnGerarPDFNutricao = styled.button`
  width: 120px;
  color: white;
  background: linear-gradient(135deg, #e2ba64, #d39a1e);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 20px;
  /* box-shadow: 0 4px 15px rgba(0, 198, 178, 0.4); */
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #e0b14c, #d4950c);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(198, 152, 0, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
    @media (max-width: 1000px) {
   margin-left: 10px;
  }
`;
export const BtnMapaCulturas = styled.button`
  width: 110px;
  color: white;
  background: linear-gradient(135deg, #d3c941, #d4b00e);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 0px;
  /* box-shadow: 0 4px 15px rgba(0, 198, 178, 0.4); */
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #b9af1e, #ad8e02);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(195, 198, 0, 0.5);
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
