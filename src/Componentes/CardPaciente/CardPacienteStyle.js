import styled from "styled-components";

export const CardContainer = styled.div`

    border: 1px solid #009DC8;
    border-radius: 6px;
    width: 240px;
    height: 150px;
    padding: 0px 5px;
     cursor: ${props => (props.disabled ? 'wait' : 'pointer')};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  transition: opacity 0.2s ease;
    &:hover{
        background-color: #93f7f7;
        transition:0.3s ease-in;
    }
p ,h4{
    margin: 0;
    padding:0 ;
    font-size: 0.8rem;
}

.divLeito{

    display: flex;
    justify-content: center;
    align-items: center;
    p{
        background-color: #009DC8;
        height: 20px;
        width: 50px;
        color: white;
        text-align: center;
        font-size: 0.9rem;
        border-radius: 0px 0px 6px 6px;
     -webkit-box-shadow: 0px 6px 10px -5px rgba(0,0,0,0.38); 
box-shadow: 0px 6px 10px -5px rgba(0,0,0,0.38);
    }
}
.divIdentificacao{
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
    h4{
        padding: 0;
        margin: 0;
        font-family: 'Inter', sans-serif;
        font-size: 0.8rem;
        white-space: nowrap;    /* Impede quebra de linha */
        overflow: hidden;       /* Esconde o excesso */
        text-overflow: ellipsis;
    }
}
        img{
            height: 30px;
            align-self: flex-start;
        }
    
`