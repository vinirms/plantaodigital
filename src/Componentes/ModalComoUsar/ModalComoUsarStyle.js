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
  min-width: 30%;
  max-height: 80%;
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 900px) {
    max-height: 90vh;
    max-width: 100%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    font-family: "Inter", sans-serif;
    text-align: center;
    /* border: 2px solid red; */
    width: 90%;
    color: #0882c4;
  }

  button {
    background-color: transparent;
    cursor: pointer;
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    &:hover {
      background-color: red;
      color: white;
    }
  }
`;
export const ModeloH1 = styled.h1`
  margin: 0;
  padding: 2px;
  font-size: 0.9rem;
  font-weight: 500;
  width: 470px;
  color: #0882c4;
  border-bottom: 1px solid #c8d6e5;
  @media (max-width: 900px) {
    width: 330px;
  }
`;

export const ModalContent = styled.article`
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 560px;
  margin-top: 10px;
  @media (max-width: 900px) {
    width: 100%;
  }
  div {
    margin-left: 20px;
  }
  li {
    margin-left: 40px;
  }
  iframe {
    width: 100%;
    @media (max-width: 900px) {
      height: 250px;
    }
  }
`;
