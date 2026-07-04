import React, { memo, useState } from "react";
import {
  CardCcihContainer,
  DivLinhaInfos,
  DivLinhaSwabs,
  EnfLeitoDiv,
  ModeloPDados,
  ModeloPLabel,
  ModeloPTitulo,
  ModeloPTituloSwabs,
  TagsDiv,

} from "./CardCCIHStyle";

// Função helper para exibir dados ou placeholder

const CardCCIH = ({
  cultura,
  onClick,
  disabled = false,
  isLoading = false,
}) => {
  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick(cultura);
    }
  };
  const formatarData = (timestamp) => {
    if (!timestamp) return "";
    const data = new Date(timestamp);
    return data.toLocaleDateString("pt-BR"); // ✅ 23/02/2026
  };

  return (
    <CardCcihContainer
      $disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`Editar dados de ${cultura.nomePaciente || "paciente"}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <DivLinhaInfos>
        <EnfLeitoDiv>
          <ModeloPTitulo $largura="40px" $larguraMobile="40px">
            {cultura.enfLeito}
          </ModeloPTitulo>
        </EnfLeitoDiv>
        <div>
          <ModeloPLabel $largura="190px" $larguraMobile="240px">
            {cultura.nomePaciente}
          </ModeloPLabel>
        </div>
        <div>
          <ModeloPTituloSwabs $largura="210px">
           Pront: {cultura.prontuario}
          </ModeloPTituloSwabs>
          <ModeloPTituloSwabs $largura="210px">
           Setor: {cultura.setor}
          </ModeloPTituloSwabs>
        <ModeloPTituloSwabs>
          Atualizado - {formatarData(cultura.atualizado)} 
        </ModeloPTituloSwabs>

        </div>
     
      
      </DivLinhaInfos>
      <TagsDiv>
        {cultura.tagERC && <p>{cultura.tagERC} </p>}
        {cultura.tagMRSA && <p>{cultura.tagMRSA} </p>}
        {cultura.tagCRAB && <p>{cultura.tagCRAB} </p>}
        {cultura.tagTB && <p>{cultura.tagTB} </p>}
        {cultura.tagKPC && <p>{cultura.tagKPC} </p>}

      </TagsDiv>
    </CardCcihContainer>
  );
};

export default memo(CardCCIH);
