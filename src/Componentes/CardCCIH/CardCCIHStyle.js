import styled from "styled-components";

export const CardCcihContainer = styled.div`
  width: 298px;
  max-height: 165px;
  overflow-y: visible;
  overflow-x: hidden;
  background-color: #fafafa;
  cursor: ${(props) => (props.$disabled ? "wait" : "pointer")};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
  border-radius: 12px;
  padding: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  /* border: 1px solid #e61a1a; */

  /* border: 1px solid #c01414; */
  @media (max-width: 900px) {
    width: 97%;
    padding: 10px 0;
  }
  button {
    z-index: 99999;
    text-align: right;
    height: 15px;
    cursor: pointer;
  }

  &:hover:not([disabled]) {
    background-color: rgba(147, 247, 247, 0.15);
    box-shadow: 0 8px 25px rgba(0, 198, 178, 0.2);
    transform: translateY(-2px);
  }

  &:focus-within {
    outline: 2px solid #0882c4;
    outline-offset: 2px;
  }
`;

export const DivLinhaInfos = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 97%;
  align-items: center;
  border-radius: 8px;
  /* background-color: rgba(169, 206, 248, 0.18); */
  padding: 0px 8px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    /* border: 2px solid red; */
  }
  span {
    text-align: center;
    font-size: 0.8rem;
    width: 100%;
    text-align: center;
    color: #000000;
    margin-top: 2px;
  }
`;

export const DivLinhaSwabs = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 290px;

    &:first-child {
      border-top: none;
      padding-top: 0;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    div {
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
    }
  }
`;

export const ModeloPTitulo = styled.p`
  margin: 0;
  padding: 1px 0;
  font-size: 0.8rem;
  font-family: "Inter", sans-serif;
  color: #ffffff;
  font-weight: 600;
  width: ${(props) => props.$largura || "70px"};

  @media (max-width: 900px) {
    width: auto;
    min-width: 60px;
  }
`;

export const ModeloPTituloSwabs = styled.p`
  margin: 0;
  padding: 4px 0;
  font-size: 0.8rem;
  font-family: "Inter", sans-serif;
  color: #57606f;
  font-weight: 500;
  width: ${(props) => props.$largura || "90px"};
  flex-shrink: 0;
  width: 150px;
  @media (max-width: 900px) {
    width: 150px;
    flex-shrink: 0;
  }
`;

export const ModeloPLabel = styled.p`
  margin: 0;
  padding: 4px 8px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  color: #1a1a1a;
  background: transparent;
  width: ${(props) => props.$largura || "70px"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 900px) {
    width: ${(props) => props.$larguraMobile || props.$largura || "100%"};
    padding: 4px 6px;
    font-size: 0.8rem;
  }
`;

export const ModeloPDados = styled.p`
  margin: 0;
  width: 96%;
  padding: 2px 2px;
  font-size: 0.8rem;
  font-family: "Inter", sans-serif;
  color: #e23307;
  font-weight: 500;
  background: #fff5f5;
  border-radius: 6px;
  border-left: 2px solid #e23307;
  flex: 1; /* ocupa espaço disponível */
  min-height: 24px;
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    width: 95%;
    padding: 2px 4px;
  }
`;
export const EnfLeitoDiv = styled.div`
  background: linear-gradient(135deg, #009dc8, #0077a3);
  height: 24px;
  width: 60px;
  color: white;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 157, 200, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TagsDiv = styled.div`
display: flex;
/* border: 1px solid red; */
border-radius: 2px;
gap: 10px;
padding: 2px;
justify-content: center;
/* background-color: #009dc885; */
p{
    /* background: linear-gradient(135deg, #ffbe76, #f0932b); */
    background-color: #f0942b67;
      height: 18px;
      width: 50px;
      color: #705F4C;
      text-align: center;
      font-size: 0.85rem;
      border-radius:  2px ;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
padding:0;
}
`
// #fff5f5
