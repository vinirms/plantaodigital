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
  @media (max-width: 900px) {
    min-height: 90vh;
    max-width: 100%;
  }
`;

export const ModalContainer = styled.div`
  background: #f5f6fa;
  max-width: 40%;
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
export const ModeloP = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  text-align: justify;
  text-indent: 20px;
`;
export const ModeloLi = styled.li`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
`;

export const ModalContent = styled.article`
  /* border: 2px solid red; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
  margin-top: 10px;

  div {
    margin-left: 20px;
  }
  li {
    margin-left: 40px;
  }
`;

export const ModeloSpan = styled.span`
  font-style: oblique;
`;
