import React from 'react'
import { CardContainer } from './CardPacienteStyle'
import iconPaciente from "../../assets/Images/iconpct.png"

const CardPaciente = ({ paciente, onClick ,disabled}) => {
  return (
    <CardContainer onClick={!disabled ? () => onClick(paciente.id) : undefined}
    disabled={disabled}>
      <div className='divLeito'>
        <p>{paciente.enfLeito}</p>
      </div>

      <div className='divIdentificacao'>
        <img src={iconPaciente} alt="Paciente" />
        <h4>{paciente.nomePaciente}</h4>
      </div>

      <p>Idade: {paciente.idade}</p>
      <p>Prontuário: {paciente.prontuario}</p>
      <p>Data Internação: {paciente.dataInternacao}</p>
      <p>Clínica: {paciente.clinica}</p>
    </CardContainer>
  )
}

export default CardPaciente
