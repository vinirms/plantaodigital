import React from "react";
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  Overlay,
} from "./ModalComoUsarStyle";

const ModalComoUsar = ({ onClose }) => {
  return (
    <Overlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h1>Como Usar</h1>
          <button onClick={onClose}>x</button>
        </ModalHeader>
        <ModalContent>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/x_Sw1WKlI-w?si=9wQ7DU1XYCyRM0uI"
            title="Como usar"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalComoUsar;
