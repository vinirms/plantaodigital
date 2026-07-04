import styled from "styled-components";
import borda from "../../assets/Images/borda.png";
import enf from "../../assets/Images/AiEnf.png";
import Bgenf from "../../assets/Images/bgEnfs.png";
export const Main = styled.main`
  width: 100%;
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow-y: hidden;
`;

export const SessaoChamada = styled.section`
  width: 80%;
  min-height: 100vh;
  position: relative;

  .tituloChamada {
    display: flex;
    justify-content: space-between;
    height: 100vh;

    img {
      height: 80vh;
    }
  }
  .divImg {
    margin-top: auto;
  }

  .subChamada {
    box-sizing: border-box;
    width: 1000px;
    margin-top: 100px;

    h1 {
      color: #058fb6;
      font-family: "Inter", sans-serif;
      text-transform: uppercase;
      font-size: 4.9rem;
      font-weight: 300;
      margin: 0;
      padding: 0;
    }

    h3 {
      color: black;
      font-family: "Inter", sans-serif;
      text-transform: uppercase;
      font-size: 1.2rem;
      font-weight: 500;
      margin: 0;
      padding: 0;
      margin-top: 40px;
    }
    p {
      font-family: "Inter", sans-serif;
      max-width: 420px;
      font-size: 1rem;
      line-height: 1.6;
      color: #000000;
      margin: 0;
      padding: 0;
    }
  }

  .MainBeneficios {
    border-radius: 20px;
    border-top: 1px solid #009dc8;
    min-height: 30vh;

    display: flex;
    flex-direction: column;

    h1 {
      color: #00c7b2;
      font-family: "Inter", sans-serif;
      text-transform: uppercase;
      font-size: 0.9rem;
      font-weight: 400;
      width: 250px;
      margin-left: 50px;
    }
    .beneficios {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-top: 20px;
    }

    .topicosBeneficios {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      padding: 5px;
      border-radius: 10px;

      width: 250px;
      height: 170px;
      background-color: white;
      -webkit-box-shadow: 1px 5px 10px -2px rgba(0, 0, 0, 0.1);
      box-shadow: 1px 5px 10px -2px rgba(0, 0, 0, 0.1);

      p {
        width: 230px;
        text-align: justify;
        font-family: "Inter", sans-serif;
      }
    }

    h2 {
      color: #00c7b2;
      font-family: "Inter", sans-serif;
      text-transform: uppercase;
      font-size: 0.9rem;
      font-weight: 100;

      min-height: 48px;
    }
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${Bgenf});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    opacity: 0.4;
    z-index: -999;
    pointer-events: none;
    -webkit-mask-image: linear-gradient(to left, white 10%, transparent 100%);
    mask-image: linear-gradient(to left, white 10%, transparent 100%);
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const BtnSobre = styled.button`
  width: 80px;
  background-color: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #c7ecee;
    color: #00b3e4;
  }
`;
export const BtnLogin = styled.button`
  width: 150px;
  color: white;
  margin-top: 20px;
  background: linear-gradient(135deg, #01b6a4, #00b3e4);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 4px;
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
export const SessaoLogin = styled.section`
  /* border: 2px solid red; */
  box-sizing: border-box;
  width: 20%;
  height: 100vh;
  background-color: #57c785;
  background: linear-gradient(
    165deg,
    rgba(1, 182, 164, 1) 2%,
    rgba(2, 144, 184, 1) 60%,
    rgba(4, 143, 182, 1) 35%,
    rgba(42, 123, 155, 1) 100%
  );
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: -12px 2px 14px -11px rgba(0, 0, 0, 0.44);
  box-shadow: -12px 2px 14px -11px rgba(0, 0, 0, 0.44);

  @media (max-width: 1024px) {
    position: relative; 
    min-height:100vh;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-position: bottom 0% left 0%;
    background-image: url(${enf});
    background-repeat: no-repeat;
    background-size: 320px; 
    opacity: 0.5; 
    z-index: 0;
    pointer-events: none; 

    
  }


  & > * {
    position: relative;
    z-index: 1;
  }
  }

  h1 {
    text-transform: uppercase;
    color: white;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 20px;
    /* border: 2px solid red; */
  }

  .footer {
   
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: #ffffff;
 
    p {
      margin: 0;
      padding: 0;
      font-family: "Inter", sans-serif;
      font-size: 0.7rem;
    }
    h5{
      margin: 0;
      padding: 0;
      margin-bottom: 20px;
    }
    a {
      text-decoration: underline;
      color: white;
    }
    @media (max-width: 1024px) {
      /* margin-top: 5px; */
      align-self: self-end;
      /* border: 2px solid black; */
    }
  }

  .divBtnSobreUso {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    min-height: 100vh;
    box-shadow: none; /* opcional, pra não ficar sombra “estranha” no mobile */
  }
`;

export const AcessoSeguro = styled.div`
display: flex;
align-items: center;
 img{
      height: 20px;
    }
`

export const CamposLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 99%;
  border: 2px solid black;
`;

export const LoginHeader = styled.div`
  /* border: 2px solid red; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    height: 100px;
  }
`;
export const LoginFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0px;

  p {
    background: linear-gradient(135deg, #ffeaa7a4, #ffd53b96);
    color: #744210;
    border-radius: 6px;
    padding: 2px;
  }

  .campo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10px;
    label {
      align-self: start;
      margin-bottom: 2px;
      color: white;
      font-size: 0.8rem;
      font-family: "Inter", sans-serif;
    }
    select,
    input {
      width: 250px;
      font-size: 18px;
      height: 24px;
      border: 1px solid #c2ccdb;
      outline: none;
      font-family: "Inter", sans-serif;
      padding: 2px 5px;
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
  }
`;
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  position: relative;
`;

export const InputIcon = styled.div`
  color: #fff;
  font-size: 1.2rem;
  padding: 0.75rem 0.75rem 0.75rem 1rem; // Ajuste pro seu gradiente
  background: rgba(255,255,255,0.1);
  border-radius: 0.5rem 0 0 0.5rem;
  flex-shrink: 0;
`;

export const InputStyled = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  background: rgba(255,255,255,0.9);
  font-size: 1rem;
  outline: none;
  
  &:focus {
    background: #fff;
    box-shadow: 0 0 0 2px rgba(87,199,133,0.5);
  }
`;