import styled from "styled-components";

export const Main = styled.section`
  background-color: #009dc8;
  width: 100%;
  height: 100vh; /* melhor que height fixa */
  display: flex;
  align-items: center;
  flex-direction: column;
/* border: 2px solid red; */

.divPaginacao {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 👈 empurra para a direita */
  width: 100%;
  gap: 5px;
  button{
    cursor: pointer;
  }
}
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
  height: 100%;
  width: 99%;
  border-radius: 10px;
  display: flex;
  overflow: hidden; /* importante pro scroll interno funcionar [web:31] */
flex-direction: column;
padding: 5px;
  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    min-height: calc(100vh - 12vh);
    border-radius: 20px 20px 0 0;
  }
`;


export const FlowListaLogs = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 90%;
  width: 100%;
  overflow-y: scroll;
  
  @media (max-width: 1000px) {
    width: 95%;
  }

  /* Scrollbar opcional */
  /* &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c2ccdb;
    border-radius: 4px;
  } */
`;
export const DivCadastro= styled.div`
  background-color: #f5f6fa;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid #0d80cc;

  @media (max-width: 1000px) {
    width: 95%;
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
