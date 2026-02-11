import React from "react";
import ReactDOM from "react-dom";
import { ModalContainer } from "./ModalLoadingStyle";

const ModalLoading = () => {
  return ReactDOM.createPortal(
    <ModalContainer >
      <div className="loading-box">
        <div className="spinner" />
        <p>Carregando...</p>
      </div>
    </ModalContainer>,
    document.getElementById("modal-loading")
  );
};

export default ModalLoading;
