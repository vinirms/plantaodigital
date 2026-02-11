import styled from "styled-components";

export const Main = styled.section`

    background-color: #009DC8;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const NavDiv = styled.div`
    background-color: #009DC8 ;
    height: 12vh;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    /* border: 2px solid red; */

.divLogo{
     /* border: 2px solid red; */
    img{
        height: 120px;
    }
}
.divTitulo{
    /* border: 2px solid red; */
    width: 35%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    h1{
        margin: 0;
        padding:0 ;
        color: #ffffff ;
        font-family: 'Poppins', sans-serif;
        text-transform: uppercase;
        font-size:2.9rem;
        font-weight:300;
    }
}
`
export const MainContainer = styled.div`
    background-color: #f5f6fa ;
    height: 88vh;
    width: 99%;
    border-radius: 20px;

`
export const NavCampos = styled.div`
    display: flex;
    height: 15vh;
    width: 100%;
    align-items: center;
.quantitativo{
    display: flex;
    gap: 10px;
    margin: 10px;
    
}
.filtros{
    display: flex;
    gap: 10px;
    margin: 10px;
  
    justify-content: center;
    align-items: center;

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
}
`

export const Cards =styled.div`
    padding: 10px;
    background-color: #ffffff ;
    /* border: 1px solid red; */
    width: 120px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 9px 1px rgba(0,0,0,0.46); 
    box-shadow: 0px 0px 9px 1px rgba(0,0,0,0.1);
    h3{
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        font-weight: 400;
        color: #00C7B2;
         /* border: 1px solid red; */
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

export const CampoFiltro = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
label{
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #636e72;
}

`
export const FiltroEnf = styled.input`
    font-size: 18px;
    border-radius: 5px;
    width: 100px;
    outline: none;
    border: none;
    border-bottom: 1px solid #7f8fa6;
    padding: 3px;
    /* background-color: #ffffff ; */
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
`
