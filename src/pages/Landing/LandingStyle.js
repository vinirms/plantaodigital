import styled from "styled-components";
import borda from '../../assets/Images/borda.png'
export const Main = styled.main`
    width: 100%;
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
   
   `

export const SessaoChamada = styled.section`
/* border: 2px solid red; */
width:75%;
 min-height: 100vh;
background-color: #F4F7FC;

.tituloChamada{
     display: flex;
    align-items: center;
    justify-content: space-between;
    height:70vh;


img{
    transform: scaleX(-1);
    height:640px;

}
}


.subChamada{

width: 1000px;
    h1{
        color:#009DC8 ;
        font-family: 'Poppins', sans-serif;
        text-transform: uppercase;
        font-size:4.9rem;
        font-weight:300;
      
    }
    h3{
        color:black ;
        font-family: 'Inter', sans-serif;
        text-transform: uppercase;
        font-size:1.2rem;
        font-weight:300;
        margin: 0;
        padding: 0;
    }
     p{
         font-family: 'Inter', sans-serif;
       max-width: 620px;
font-size: 1rem;
line-height: 1.6;
color: #4a4a4a;
     }
}


.MainBeneficios{

    border-radius: 20px;
    border-top: 1px solid #009DC8;
    min-height:30vh;
  
    display: flex;
    flex-direction: column;

    h1{
        color:#00C7B2 ;
        font-family: 'Inter', sans-serif;
        text-transform: uppercase;
        font-size:0.9rem;
        font-weight:400;
        width:250px ;
    margin-left: 50px ;
}
.beneficios{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top:20px;
    
}

.topicosBeneficios{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction:column;
    padding:5px;
    border-radius:10px;
   
    width: 250px;
    height: 170px;
    background-color:white;
    -webkit-box-shadow: 1px 5px 10px -2px rgba(0, 0, 0, 0.1); 
    box-shadow: 1px 5px 10px -2px rgba(0,0,0,0.1);

    
p{
        width: 230px;
        text-align: justify;
        font-family: 'Inter', sans-serif;
     }
}

h2{
    color:#00C7B2 ;
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
    font-size:0.9rem;
    font-weight:100;
   
     min-height: 48px;
}
 

}


`


export const SessaoLogin = styled.section`

/* border: 2px solid blue; */
    width:25%;
    min-height: 100vh;
    background-color:#009DC8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
-webkit-box-shadow: -12px 2px 14px -11px rgba(0,0,0,0.44); 
box-shadow: -12px 2px 14px -11px rgba(0,0,0,0.44);
h1{
    text-transform: uppercase;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 20px;
}
.camposLogin{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    /* border: 2px solid blue; */
button{
    width:200px;
    color: white;
    background-color: #00C6B2;
    font-size:16px;
    cursor: pointer;
    margin-top:20px;
    border: none;
    font-weight: 600;
    border-radius: 10px;
    padding: 10px;
    -webkit-box-shadow: 0px 3px 12px -6px #0090B8; 
    box-shadow: 0px 3px 12px -6px #0090B8;
    &:hover{
        background-color: #00B3E4;
    }
}
}
.campo{
    display: flex;
 align-items: center;
justify-content: center;
flex-direction: column;
margin-bottom: 10px;
label{
    align-self: start;
    margin-bottom: 2px;
    color: white;
    font-family: 'Inter', sans-serif;
}
select, input{
width: 250px;
border: none;
border-radius: 5px;
font-size: 18px;
outline: none;
height: 24px;
padding: 2px;
}
}

.footer{
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 100px;
    color: #c7ecee;
    p{
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        font-size: .7rem;
     }
}
`