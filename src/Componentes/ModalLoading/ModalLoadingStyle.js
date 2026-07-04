import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed; /* 🔥 ESSENCIAL */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center; /* 🔥 CENTRALIZA VERTICAL */
  justify-content: center; /* 🔥 CENTRALIZA HORIZONTAL */

  z-index: 99999; /* 🔥 FICA ACIMA DE TUDO */

  .loading-box {
    background: #ffffff;
    padding: 12px 28px;
    border-radius: 12px;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 6px solid #ddd;
    border-top: 6px solid #2ecc71;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
