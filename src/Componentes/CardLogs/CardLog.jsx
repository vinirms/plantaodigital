import React from 'react'
import { CardLogContainer, DivTopInfos, TagPModeloCard } from './CardLogStyle'


const CardLog = ({log}) => {

const formatarData = (timestamp) => {
    if (!timestamp) return "";
    const data = new Date(timestamp);
    return data.toLocaleString("pt-BR", {
        timeZone: 'America/Sao_Paulo' // 👈 só isso
    });
};

  // console.log(log)
  return (
    <CardLogContainer >
      <DivTopInfos>
        <TagPModeloCard>ID:</TagPModeloCard>
        <TagPModeloCard $largura="60px">{log.id}</TagPModeloCard>
      </DivTopInfos>
      <DivTopInfos>
        <TagPModeloCard $largura="80px">Profissional:</TagPModeloCard>
        <TagPModeloCard $largura="150px">{log.profissional}</TagPModeloCard>
      </DivTopInfos>
       <DivTopInfos>
        <TagPModeloCard $largura="70px">Data/Hora:</TagPModeloCard>
        <TagPModeloCard $largura="140px">{formatarData(log.dataHora)}</TagPModeloCard>
      </DivTopInfos>
      <DivTopInfos>
        <TagPModeloCard $largura="20px">IP:</TagPModeloCard>
        <TagPModeloCard $largura="110px" >{log.ip}</TagPModeloCard>
      </DivTopInfos>
      <DivTopInfos>
        <TagPModeloCard $largura="110px">Ação Realizada:</TagPModeloCard>
        <TagPModeloCard $largura="1010px" $larguraResponsiva="100%">{log.acaoRealizada}</TagPModeloCard>
      </DivTopInfos>
      
        
      


    </CardLogContainer>
  )
}

export default CardLog