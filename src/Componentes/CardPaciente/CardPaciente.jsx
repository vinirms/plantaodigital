import React, { useState } from "react";
import {
  AlergiaPrecaucao,
  AlergiaSpan,
  CardContainer,
  InternacaoSpan,
  PendenciaP,
} from "./CardPacienteStyle";
import iconPaciente from "../../assets/Images/iconpct.png";
import iconPrecaucao from "../../assets/Images/cuidado.ico";
import Tooltip from "./Tooltip";

const CardPaciente = ({ paciente, onClick, disabled }) => {

const setor = localStorage.getItem("setor")


  return (
    <CardContainer
      $disabled={disabled}
      onClick={!disabled ? () => onClick(paciente.id, paciente.nomePaciente) : undefined}
    >
      {paciente.pendencia !== "" && paciente.pendencia !== null ? (
        <div className="divLeitoPendencia">
          <p>{paciente.enfLeito || "—"}</p>
        </div>
    ) : (
      <div className="divLeito">
        <p>{paciente.enfLeito || "—"}</p>
      </div>
    )}
      

      <div className="divIdentificacao">
        <div>
          <img src={iconPaciente} alt="Ícone paciente" />
        </div>
        <h4>{paciente.nomePaciente || "Nome não informado"}</h4>
      </div>

      <div className="precaucaoPendencia">
      <p>Idade: {paciente.idade || "—"}</p>
      
      
      <div>
           {paciente.alergias &&
                  paciente.alergias !== "NEGA" &&
                  paciente.alergias !== "" && (
                    <div>
                      <AlergiaSpan>Alergico(a)</AlergiaSpan>
                    </div>
                  )}
        {paciente.swabData && paciente.swabData !== "Padrão" && (
          <div>
            <AlergiaPrecaucao>
              <img src={iconPrecaucao} alt="" />
              {paciente.swabData}
            </AlergiaPrecaucao>
          </div>
        )}
         </div>
     
      
         
      </div>
    
     
      <p>Prontuário: {paciente.prontuario || "—"}</p>
    
      <p>
        Data Admissão:{" "}
        {paciente.dataInternacao
          ? new Date(paciente.dataInternacao).toLocaleDateString("pt-BR")
          : "—"} 

        <InternacaoSpan>
          {paciente.dataInternacao
            ? `${Math.floor(
                (new Date() - new Date(paciente.dataInternacao)) / (1000 * 60 * 60 * 24)
              )} d`
            : "—"}
        </InternacaoSpan>
      </p>

      <p>Clínica: {paciente.clinica || "—"}</p>
      
      { paciente.pendencia !== "" && paciente.pendencia !== null &&
          <PendenciaP>Pendência: {paciente.pendencia || "—"}</PendenciaP>
      }
      

      {/* {setor !== "SetorTeste" &&
        <>
        <div className="precaucao">
          {paciente.swabData && paciente.swabData !== "Padrão" && (
            <div>
              <AlergiaPrecaucao>
                <img src={iconPrecaucao} alt="" />
                {paciente.swabData}
              </AlergiaPrecaucao>
            </div>
          )}
          {paciente.alergias &&
            paciente.alergias !== "NEGA" &&
            paciente.alergias !== "" && (
              <div className="precaucao">
                <AlergiaSpan>Alergico(a)</AlergiaSpan>
              </div>
            )}
        </div>
        </>
      } */}

      
    </CardContainer>
  );
};

export default CardPaciente;
