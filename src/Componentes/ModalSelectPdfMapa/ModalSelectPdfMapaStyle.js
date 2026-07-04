import styled from "styled-components";

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

  &:has(iframe:-webkit-full-screen),
  &:has(iframe:fullscreen) {
    z-index: unset;
  }

  @media (max-width: 900px) {
    min-height: 90vh;
    max-width: 100%;
  }
`;

export const ModalContainer = styled.div`
  background: #f5f6fa;
  max-width: 40%;
  max-height: 80vh; /* vh para melhor controle de altura */
  border-radius: 10px;
  padding: 10px; /* padding mais generoso */
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); /* sombra moderna */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 900px) {
    max-height: 94vh;
    max-width: 95%;
    padding: 15px;
  }

  button {
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
  select {
    border: 1px solid #c2ccdb;
    outline: none;
    width: 150px;
    font-family: "Inter", sans-serif;
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
  }
`;

export const BtnConfirmarPDF = styled.button`
  width: 100px;
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
`;

export const ModalHeaderPdF = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 250px;
  /* border: 2px solid red; */

  h1 {
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
  }

  button {
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
  }
`;

export const ContainerInputBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
