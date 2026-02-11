import styled from "styled-components";

export const Main = styled.section`

    background-color: #009DC8;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (max-width: 900px) {
    width: 100%;
    min-height: 100vh;

  }
`

export const NavDiv = styled.div`
    background-color: #009DC8 ;
    height: 12vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
        @media (max-width: 900px) {
            justify-content: center;
            
            

            .divLogo{
                display: none;
              img{
                display: none;
        }
            }
            .divSetor{
                display: none;
            }
        }

.divTitulo{
    /* border: 2px solid red; */
    max-width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 900px) {
    width: 100%;
    min-height: 100vh;
  }
    h1{
        margin: 0;
        padding:0 ;
        color: #ffffff ;
        font-family: 'Poppins', sans-serif;
        text-transform: uppercase;
        font-size: clamp(1.8rem, 0.2vw, 0.9rem);
        font-weight:300;
        flex-wrap: wrap;
    }
    
}
.divSetor{
    h3{
        margin: 0;
        padding:0 ;
        color: #ffffff ;
        font-size: 16px;
        font-weight: 200;
    }
}
button{
    height: 28px;
}
`

export const Btnlogout= styled.button`
width: 30px ;
border: none;
display: flex;
align-items: center;
justify-content: center;
background-color: transparent;
cursor: pointer;
img{
    height: 22px;
}


`
export const MainContainer = styled.div`
    background-color: #f5f6fa ;
    height: 88vh;
    width: 99%;
    border-radius: 20px;
 @media (max-width: 900px) {
    width: 100%;
    min-height: 100vh;

  }
`
export const BtnModeResponsive = styled.button`
display: none;
border: none;
cursor: pointer;
img{
    height: 22px;
}
@media (max-width: 1140px) {
    display: block;
  }

`
export const NavCampos = styled.div`
    display: flex;
    min-height: 15vh;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
  @media (max-width: 1457px) {
    /* border: 1px solid green; */
    margin-bottom: 10px;
  }

.quantitativo{
    display: flex;
    gap: 10px;
    margin: 10px;
    
}

`
export const ContainerFiltros = styled.div`
    display: flex;
    gap: 10px;
    margin: 10px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

     @media (max-width: 1140px) {
        border-top:0.1px solid #b2bec3 ;
        border-bottom:0.1px solid #b2bec3 ;
        padding: 4px 0px;
        display: ${({ visible }) => (visible ? "Flex" : "none")};
  }
    button{
        height: 38px;
        cursor: pointer;
        border: none;
        background-color: #f5f6fa;
        align-self: flex-end;

    }
    img{
       height:28px;
    }
    

`

export const Cards =styled.div`
    padding: 10px;
    background-color: #ffffff ;
    /* border: 1px solid red; */
    max-width: 120px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 9px 1px rgba(0,0,0,0.46); 
    box-shadow: 0px 0px 9px 1px rgba(0,0,0,0.1);

    @media (max-width: 1000px) {
        padding: 3px;
        min-width: 90px;
        max-height: 60px;
        
  }

    h3{
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        font-weight: 400;
        color: #00C7B2;
         /* border: 1px solid red; */
         @media (max-width: 1000px) {
        font-size: 0.7rem;
            
            max-width: 100%;
  }
    }
.cardImage{
    display: flex;
    justify-content: space-around;
    height: 50px;
    align-items: center;
    /* border: 1px solid red; */
    img{
        height: 30px;
    }
    p{
        height: 30px;
        width: 30px;
        text-align: center;
        color: #00C7B2;
        font-family: 'Inter', sans-serif;
        font-size: 24px;
    }
}
`

export const CampoFiltroEnfLeito = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
label{
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #636e72;
     @media (max-width: 1000px) {
    max-width: 60px;
  }
}
 @media (max-width: 1000px) {
    max-width: 100px;

  }

`
export const FiltroEnf = styled.input`
    font-size: 18px;
    border-radius: 5px;
    max-width: 100px;
    outline: none;
    border: none;
    border-bottom: 1px solid #7f8fa6;
    padding: 3px;
    /* background-color: #ffffff ; */
     @media (max-width: 1000px) {
        max-width: 50px;

  }
`

export const CampoFiltroNome = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
label{
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #636e72;
     @media (max-width: 1000px) {
    max-width: 60px;
  }
}
 @media (max-width: 1000px) {
    max-width: 275px;

  }

`
export const FiltroNome = styled.input`
    font-size: 18px;
    border-radius: 5px;
    width:300px;
    outline: none;
    border: none;
    border-bottom: 1px solid #7f8fa6;
    padding: 3px;
    /* background-color: #ffffff ; */
     @media (max-width: 1000px) {
        max-width: 100%;

  }
`
export const CampoFiltroClinica = styled.div`
display: flex;
flex-direction: column;
gap: 5px;

label{
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #636e72;
     @media (max-width: 1000px) {
    max-width: 100px;
  }
}
 @media (max-width: 1000px) {
 
    max-width: 275px;

  }

`
export const FiltroClinica = styled.select`
    font-size: 18px;
    border-radius: 5px;
    width:150px;
    outline: none;
    border: none;
    border-bottom: 1px solid #7f8fa6;
    padding: 3px;
    cursor: pointer;
    /* background-color: #ffffff ; */
`

export const Botoes = styled.div`
display: flex;
gap: 20px;
margin-left: 30px;
 @media (max-width: 1000px) {
    /* max-width: 275px; */

  }
button{
    height: 35px;
    width: 150px;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    border-radius: 6px;
    
    &:first-child {
        background-color: transparent;
        border: 1px solid #009DC8;
        color: #009DC8;
    
    &:hover{
        color: white; 
        background-color: #009DC8;
        transition: 0.3s ease-in ;
    }
    }
     &:nth-child(2) {
        background-color: transparent;
        border: 1px solid #ff7675;
        color: #ff7675;
    
    &:hover{
        color: white; 
        background-color: #ff7675;
        transition: 0.3s ease-in ;
    }
    }

    
}


`

export const FlowLista = styled.div`
background-color: white;
height: 66vh;
padding: 20px;
display: flex   ;
flex-wrap: wrap;
gap: 10PX;
overflow-y: auto;
align-items: center;
justify-content: center;

`
