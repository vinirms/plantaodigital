import styled from "styled-components";

export const CardLogContainer =styled.div`
/* margin-top: 2px; */
width: 100%;
min-height: 30px;
box-sizing: border-box;
display: flex;
flex-direction: column;
padding: 0px 10px;
flex-wrap: wrap;
justify-content: center;
border: 1px solid #ced4da8a;
background-color: #ced4da8a ;
span{
    margin: 0;
    padding: 2px;
    font-size: 0.8rem;
    border: 2px solid red;
    color: #7b7f83;

}
 @media (max-width: 900px) {
    min-height: 110px;
    flex-direction: row;
    justify-content: flex-start;

    padding:0 ;
}

`
export const TagPModeloCard = styled.p`
    margin: 0;
    padding: 2px;
    font-size: 0.8rem;
    width:  ${(props) => props.$largura || "20px"};
    box-sizing: border-box;
     @media (max-width: 1000px) {
     width:  ${(props) => props.$larguraResponsiva || ""};
    }
`
export const DivTopInfos = styled.div`
display: flex;
align-items: center;
min-height: 24px;
gap: 5px;

 @media (max-width: 1000px) {
     flex-wrap: wrap;
    }

`
