import styled from "styled-components";

export const CardContainer = styled.div`
  border-radius: 8px;
  width: 240px;
  height: 160px; /* ligeiramente maior para melhor UX */
  padding: 0px 5px 5px 5px  ;
    color: #4b5563;

  background-color: white;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  opacity: ${({ $disabled }) => ($disabled ? 0.7 : 1)};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  position: relative;
  will-change: transform, box-shadow; /* performance [web:25] */

  &:hover:not([disabled]) {
    background-color: rgba(14, 248, 248, 0.1);
    box-shadow: 0 8px 25px rgba(0, 157, 200, 0.15);
    transform: translateY(-4px);
  }

  &:focus-within {
    outline: 2px solid #009dc8;
    outline-offset: 2px;
  }

  p,
  h4 {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
  }


  .divLeito {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2px;

    p {
      background: linear-gradient(135deg, #009dc8, #0077a3);
      height: 24px;
      width: 70px;
      color: white;
      text-align: center;
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 12px rgba(0, 157, 200, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .divLeitoPendencia {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2px;
    p {
      background: linear-gradient(135deg, #e67e22, #d35400);
      height: 24px;
      width: 70px;
      color: white;
      text-align: center;
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 12px rgba(0, 157, 200, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .divIdentificacao {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 4px;

    img {
      height: 32px;
      flex-shrink: 0;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    h4 {
      font-family: "Inter", sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      color: #1f2937;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 190px;
      /* border: 2px solid red; */
    }
  }

  /* Lista de infos com melhor spacing */
  p {
    margin-bottom: 2px;
    font-weight: 500;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .precaucao {
    display: flex;
    gap: 2px;
    justify-content: center;
    align-items: center;
    /* border: 2px solid red; */
    div {
      display: flex;
      align-items: center;
      gap: 2px;
    }
  }
.precaucaoPendencia {
    display: flex;
    gap: 2px;
    justify-content: space-between;
    align-items: last baseline;
    /* border: 2px solid red; */
    div {
      display: flex;
      align-items: center;
      gap: 2px;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
    height: 170px;
  }
`;
export const InternacaoSpan = styled.span`
 margin-left: 10px;
    color: #b32f2f;
`
export const AlergiaPrecaucao = styled.span`
  font-size: 0.65rem;
  padding: 2px 4px;
  /* width: 60px; */
  margin: 0;
  background: linear-gradient(135deg, #ffeaa7a4, #ffd53b96);
  border-radius: 12px;
  color: #744210;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 8px rgba(255, 234, 167, 0.4);
  white-space: nowrap;

  img {
    height: 14px;
    flex-shrink: 0;
  }
`;

export const AlergiaSpan = styled.span`
  font-size: 0.65rem;
  padding: 2px 4px;
  margin: 0;
  background: linear-gradient(135deg, #fab0a0a8, #ff6b6bdc);
  border-radius: 12px;
  color: #8b2828;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(250, 177, 160, 0.4);
  white-space: nowrap;
`;
export const PendenciaP =styled.p`
color: #d35400;
`