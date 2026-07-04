import styled from "styled-components";

export const ContainerImagemOverlay = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999999999;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    min-height: 90vh;
    max-width: 100%;
  }

img{
  width:100%;
  height:350px;
  border-radius:10px;
  object-fit:contain;

}


`;

export const ContainerImagem = styled.div`
  background: #fff;
  width: 30%;
  max-height: 75%;
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  
  @media (max-width: 900px) {
    min-height: 90vh;
    min-width: 90%;
  }
p{
    margin: 0;
    padding: 0;
}
.analise{
  display: flex;
  flex-direction: column;
  width:100%;

  h4{
    margin:0 ;
    padding: 0;
    color: #17a2b8;
    font-size: 0.86rem;
    margin-top:5px ;
  }
  p{
    font-size: 0.9rem;
    text-indent:15px;
    text-align: justify;
  }
}

.fechar{
    width:40px;
    height:40px;
    border:none;
    border-radius:50%;
    cursor:pointer;
    font-size:20px;
}
.header{
/* border: 2px solid red; */
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
  h3{
    margin: 0;
    padding: 0;
    width: 500px;
    box-sizing: border-box;
    text-align: center;
    color: #17a2b8;
  }

}
`
export const Spinner = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: girar 0.6s linear infinite;
  margin-right: 6px;
  @keyframes girar {
    to { transform: rotate(360deg); }
  }
`;
export const BtnAnalisar = styled.button`
display: flex;
  width: 125px;
  color: white;
  background: linear-gradient(135deg, #00c6b2, #00b3e4);
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 8px 4px;
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