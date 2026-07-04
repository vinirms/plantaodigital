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

  &:has(iframe:-webkit-full-screen),
  &:has(iframe:fullscreen) {
    z-index: unset;
  }

  @media (max-width: 900px) {
    min-height: 90vh;
    max-width: 100%;
  }
`;

export const ModalContainer = styled.div`
  background: #ffffff;
  max-width: 40%;
  max-height: 80vh; /* vh para melhor controle de altura */
  border-radius: 10px;
  padding: 10px; /* padding mais generoso */
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); /* sombra moderna */
  overflow-x: hidden;
  /* border: 2px solid red; */
  .divBtn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #e0e0e0;
  }

  @media (max-width: 900px) {
    max-height: 94vh;
    max-width: 95%;
    padding:15px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between; /* melhor que space-evenly */
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;

  h1 {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    font-family: "Inter", sans-serif;
    text-align: center;
    font-size: 1.6rem;
    color: #0882c4;
    flex: 1; /* ocupa espaço disponível */
  }

  button {
    background-color: transparent;
    cursor: pointer;
    border: 1px solid #ff4444;
    border-radius: 5px;
    color: #ff4444;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      background-color: #ff4444;
      color: white;
    }

    &:focus {
      outline: 2px solid #0882c4;
      outline-offset: 2px;
    }
  }
`;

export const BtnSalvarAdm = styled.button`
  width: 150px;
  color: white;
  background: linear-gradient(135deg, #00c6b2, #00b3e4); /* gradiente moderno */
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 20px;
  box-shadow: 0 4px 15px rgba(0, 198, 178, 0.4);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #00b3e4, #0090b8);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 198, 178, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const TagPModelo = styled.p`
  margin: 0;
  padding: 0 4px 2px 0;
  font-size: 0.80rem;
  font-family: "Inter", sans-serif;
  color: #57606f;
  /* border: 2px solid red; */
`;
export const TagPModeloTitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #17a2b8;
  letter-spacing: 1px;
  margin-bottom: 4px;
  display: block;
  /* border: 1px solid gray; */
`;

export const InputDados = styled.input`
  width: ${(props) => props.$largura || "100px"};
  border: 1px solid #c2ccdb;
  outline: none;
  font-family: "Inter", sans-serif;
  padding: 4px 5px;
  border-radius: 6px;
  font-size: 0.9rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  min-height: 20px;
  &:focus {
    border-color: #0882c4;
    box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
  }

  @media (max-width: 900px) {
    width: ${(props) => props.$larguraResponsive || ""};
  }
`;

export const ModalBody = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  align-items: flex-end; /* corrigido de 'last baseline' */
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid #dee6f3;
  .divCampos {
    display: flex;
    flex-direction: column;
    gap: 2px;
    /*  min-width: 140px; evita compressão excessiva */
  }
`;
export const ModalBodySomenteLeitura = styled.div`
  margin-top: 5px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  align-items: center; /* corrigido de 'last baseline' */
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid #dee6f3;
  /* background-color: #b5e1ee; */
  .divCampos {
    display: flex;
    gap: 2px;
  }
 
`;

export const SpanSomenteLeitura = styled.span`
margin: 0;
    padding: 0;
    font-size: 0.75rem;
    display: flex;
    align-items: flex-end;

`
export const TagPSomenteLeitura = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  color: #252525;
  display: block;
  margin: 0;
  padding: 0;
  font-weight: 500;
  margin-right: 10px;
`;
export const TagPSomenteLeituraSwabs = styled.p`
  font-size: 14px;
  width: ${(props) => props.$largura || "230px"};
  height:50px ;
  color: #252525;
  display: block;
  margin: 0;
  padding: 2px;
  border-radius: 5px;
  font-weight: 500;
  margin-right: 10px;
  background-color: #ecf0f193;
    @media (max-width: 900px) {
    width: ${(props) => props.$larguraResponsive || ""};
  }
`;
export const TagsWrapper = styled.div`
display: flex;
flex-direction: column;
border-bottom: 1px solid #f3e8e8;
padding-bottom: 10px;

 select {
    border: 1px solid #c2ccdb;
    outline: none;
    font-family: "Inter", sans-serif;
    padding: 1px 1px;
    border-radius: 6px;
    font-size: 14px;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
    &:focus {
      border-color: #0882c4;
      box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
    }
  }
`
export const TagsDiv =styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;

`

export const CondutaDiv = styled.div`
display: flex;
flex-direction: column;
border-bottom: 1px solid #dee6f3;
padding-bottom: 10px;
img{
  width: 620px;
  height: 160px;
  border: 1px solid #17a3b893;
  border-radius: 10px;
  margin-bottom: 5px;
  align-self: center;
}

ul{
  margin: 0;
  padding: 0;
  padding-left: 20px;
}
li{
  margin: 0;
  padding: 0;
  font-size: 0.85rem;
  color: #595a5c;
}

 @media (max-width: 900px) {
    img{
      width: 365px;
     height: 120px;

    }
    ul{
      padding-left:10px;
    }
  }
`
export const ModalBodySwabs = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 2px;
flex-wrap: wrap;
 
`;

export const CamposWapperDiv = styled.div`
/* border: 2px solid #cf7d20; */
display: flex;
flex-wrap: wrap;
gap: 10px;
`
export const InputDadosCampoSwabs = styled.textarea`
  width: ${(props) => props.$largura || "100px"};
  border: 1px solid #c2ccdb;
  outline: none;
  font-family: "Inter", sans-serif;
  padding: 4px 5px;
  border-radius: 6px;
  font-size: 0.9rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  height: 50px;
  &:focus {
    border-color: #0882c4;
    box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
  }

  @media (max-width: 900px) {
    width: ${(props) => props.$larguraResponsive || ""};
  }
`;

export const InputDataColetaSwabs = styled.input`
  width: ${(props) => props.$largura || ""};
  border: 1px solid #c2ccdb;
  outline: none;
  font-family: "Inter", sans-serif;
  padding: 4px 5px;
  border-radius: 6px;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #0882c4;
    box-shadow: 0 0 0 3px rgba(8, 130, 196, 0.1);
  }

  @media (max-width: 900px) {
    width: ${(props) => props.$larguraResponsive || ""};
  }
`;
export const BtnBuscaPacienteCultura = styled.button`
  width: 28px;
  height: 28px;
  cursor: pointer;
  border: 1px solid #c2ccdb;
  border-radius: 6px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    border-color: #0882c4;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  img {
    height: 20px;
    width: 20px;
  }
`;

export const ListBuscaContainer = styled.div`
  border: 1px solid #e22323;
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
  width: 100%;
  margin-top: 10px;
  background: white;

  /* Scrollbar customizada */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #e22323;
    border-radius: 3px;
  }
`;

export const ListBuscaResult = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  background-color: #f8f9ff;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e3f2fd;
    padding-left: 16px;
  }

  &:last-child {
    border-bottom: none;
  }

  &:focus {
    outline: 2px solid #0882c4;
    outline-offset: -2px;
  }
`;
export const BtnExcluir = styled.button`
  width: 150px;
  color: white;
  background: linear-gradient(
    135deg,
    #df5d5d,
    rgb(238, 65, 65)
  ); /* gradiente moderno */
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 20px;
  box-shadow: 0 4px 15px rgba(0, 198, 178, 0.4);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #af2e2e, rgb(238, 65, 65));
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 198, 178, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
