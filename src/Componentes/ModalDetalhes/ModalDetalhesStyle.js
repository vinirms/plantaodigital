// ModalDetalhesStyle.js
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

`;

export const ModalContainer = styled.div`
  background: #fff;
  min-width: 40%;
  min-height: 40%;
  border-radius: 8px;
  padding: 20px;
 
 
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 2px solid red; */
  h3{
    margin: 0;
    padding:0 ;
    text-align: center;
    /* border: 2px solid red; */
    width: 90%;
  }
`;

export const BotaoFechar = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 22px;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  margin-top: 15px;
  /* border: 2px solid red; */
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
label{
  font-size: 0.8rem;
  font-family: 'Inter', sans-serif;
  color: #57606f ;

}

.divCampos{
  display: flex;
  flex-direction: column;
  gap: 2px;
}
`

export const BtnContainer = styled.div`
   margin-top: 15px;
  /* border: 2px solid red; */
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

export const BtnSalvarAdm = styled.button`
    width:150px;
    color: white;
    background-color: #00C6B2;
    font-size:14px;
    cursor: pointer;
   margin-right:20px; 
    border: none;
    font-weight: 600;
    border-radius: 5px;
    padding: 5px;
    -webkit-box-shadow: 0px 3px 12px -6px #0090B8; 
    box-shadow: 0px 3px 12px -6px #0090B8;
    &:hover{
        background-color: #00B3E4;
    }
`
export const BtnAltaHospitalar= styled.button`
  width: 150px;
  background-color: #00C6B2;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 6px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #00B3E4;
  }
`
export const BtnSalvarEdicao = styled.button`
    width:150px;
    color: white;
    background-color: #00C6B2;
    font-size:14px;
    cursor: pointer;
    border: none;
    font-weight: 600;
    border-radius: 5px;
    padding: 5px;
    -webkit-box-shadow: 0px 3px 12px -6px #0090B8; 
    box-shadow: 0px 3px 12px -6px #0090B8;
    transition: 0.2s ease-in-out;
    &:hover{
        background-color: #00B3E4;
    }
`
export const BtnExcluir = styled.button`
    width:150px;
    color: white;
    background-color: #ff7675;
    font-size:14px;
    cursor: pointer;
    margin-right: 20px;
    border: none;
    font-weight: 600;
    border-radius: 5px;
    padding: 5px;
    -webkit-box-shadow: 0px 3px 12px -6px #0090B8; 
    box-shadow: 0px 3px 12px -6px #0090B8;
    transition: 0.2s ease-in-out;
    &:hover{
        background-color: #d63031;
    }
`

export const InputDados =styled.input`
  width: ${props => props.$largura || "100px"};
  border: 1px solid #a4b0be;
  outline: none;
  font-family: 'Inter', sans-serif;
  padding: 2px;
  border-radius: 5px;
`
  
export const InputClinica=styled.select`
  width: 234px;
  border: none;
  outline: none;
  border: 1px solid #ced6e0;
  padding: 2px;
  border-radius: 5px;
  font-family: 'Inter', sans-serif;

`
export const InputTextArea=styled.textarea`
  width: 350px;
  border: none;
  height: ${props => props.$Altura || "100px"};
  outline: none;
  border: 1px solid #ced6e0;
  font-family: 'Inter', sans-serif;

  
`
