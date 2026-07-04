import React, { useState } from "react";
import ReactDOM from "react-dom";

import {
  BtnConfirmarPDF,
  ContainerInputBtn,
  ModalContainer,
  ModalHeaderPdF,
  Overlay,
} from "./ModalSelectPdfMapaStyle";

const ModalSelectPdfMapa = ({ onClose, onGerarPdf, onLoading }) => {
  const [setorSelecionado, setSetorSelecionado] = useState();
const setor = localStorage.getItem("setor")
  return (
    <Overlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeaderPdF>
          <h1>Selecione um Setor</h1>
          <button onClick={onClose}>X</button>
        </ModalHeaderPdF>
        <ContainerInputBtn>
          {setor === "CCIH" ?
          (
          <select
            id="setor"
            name="setor"
            value={setorSelecionado}
            required
            onChange={(e) => setSetorSelecionado(e.target.value)}
          >
                  <option value="Urologia">Urologia</option>
                  <option value="C. Geral">C. Geral</option>
                  <option value="C. Medica3"> 3 - C. Medica </option>
                  <option value="C. Medica7"> 7 - C. Medica </option>
                  <option value="Ortopedia">Ortopedia</option>
                  <option value="Neurologia">Neurologia</option>
                  <option value="C. Plastica">C. Plástica</option>
                  <option value="Pediatria">Pediatria</option>
                  <option value="CTI10">10 - CTI</option>
                  <option value="Trauma">Trauma</option>
                  <option value="CTQIntensivo">CTQ Intensivo</option>
                  <option value="CTQEnfermaria">CTQ Enfermaria</option>
                  <option value="CTISL">CTI-SL</option>
                  <option value="SalaAmarela">Sala Amarela</option>
                  <option value="SalaVermelha">Sala Vermelha</option>
          </select>

          ):
          (
             <select
            id="setor"
            name="setor"
            value={setorSelecionado}
            required
            onChange={(e) => setSetorSelecionado(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value={setor}>{setor}</option>
          </select>

          )}
         

        </ContainerInputBtn>
        <BtnConfirmarPDF
          onClick={() => {
            onGerarPdf(setorSelecionado);
          }}
          disabled={onLoading}
        >
          Confirmar
        </BtnConfirmarPDF>
      </ModalContainer>
      ,
    </Overlay>
  );
};

export default ModalSelectPdfMapa;
