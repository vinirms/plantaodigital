import React from "react";
import { Box, Overlay } from "./ModalNotificacaoStyled";


const ModalNotificacao = ({ aberto, tipo, mensagem }) => {
  if (!aberto) return null;

  return (
    <Overlay>
      <Box className={tipo}>
        <p>{mensagem}</p>
      </Box>
    </Overlay>
  );
};

export default ModalNotificacao;
