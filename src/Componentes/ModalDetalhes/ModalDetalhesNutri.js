import styled from "styled-components";

// ─── Sistema de Abas ──────────────────────────────────────────────────────────

export const TabBar = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 12px;
  gap: 4px;
  padding: 0 4px;
`;

export const TabBtn = styled.button`
  padding: 8px 22px;
  border: none;
  border-bottom: 3px solid
    ${({ $ativo }) => ($ativo ? "#17a2b8" : "transparent")};
  background: none;
  cursor: pointer;
  font-weight: ${({ $ativo }) => ($ativo ? "700" : "500")};
  color: ${({ $ativo }) => ($ativo ? "#17a2b8" : "#666")};
  font-size: 13px;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  border-radius: 4px 4px 0 0;

  &:hover {
    color: #17a2b8;
  }
`;

export const TabSection = styled.div`
  display: ${({ $visivel }) => ($visivel ? "block" : "none")};
  width: 100%;
`;

// ─── Layout Nutrição ──────────────────────────────────────────────────────────

export const RowNutri = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 10px;
  align-items: flex-start;
`;
export const RowNutriTriagem = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  margin-top: 10px;
`;
export const NutriTriagemontainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-end;
`;
export const CampoNutri = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  /* flex: ${({ $flex }) => $flex || "1 1 60px"}; */

  input[type="date"] {
    width: 110px;
  }
`;
export const CampoNutriDietaPrescrita = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  /* flex: ${({ $flex }) => $flex || "1 1 60px"}; */
`;

export const LabelNutri = styled.span`
  font-size: 12px;
  color: #555;
  font-weight: 600;
`;

export const SectionTitleNutri = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #17a2b8;
  letter-spacing: 1px;
  margin-bottom: 4px;
  display: block;
  p{
    margin: 0;
    padding:0;
    color: red;
  }
`;

export const DividerNutri = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 10px 0;
`;

// ─── Inputs Nutrição ──────────────────────────────────────────────────────────

export const InputNutri = styled.input`
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 5px 8px;
  font-size: 13px;
  width: 100%;
  box-sizing: border-box;
  background: ${({ readOnly }) => (readOnly ? "#f5f5f5" : "#fff")};
  font-weight: ${({ readOnly }) => (readOnly ? "600" : "400")};
  color: #333;

  &:focus {
    outline: none;
    border-color: #17a2b8;
    box-shadow: 0 0 0 2px rgba(23, 162, 184, 0.15);
  }
`;
export const InputNutriDietaPrescrita = styled.input`
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 5px 8px;
  font-size: 13px;
  width: 420px;
  box-sizing: border-box;
  background: ${({ readOnly }) => (readOnly ? "#f5f5f5" : "#fff")};
  font-weight: ${({ readOnly }) => (readOnly ? "600" : "400")};
  color: #333;

  &:focus {
    outline: none;
    border-color: #17a2b8;
    box-shadow: 0 0 0 2px rgba(23, 162, 184, 0.15);
  }

  @media (max-width: 900px) {
    width: 340px;
  }
`;
export const SelectNutri = styled.select`
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 5px 8px;
  font-size: 13px;
  width: 100%;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #17a2b8;
    box-shadow: 0 0 0 2px rgba(23, 162, 184, 0.15);
  }
`;

export const TextareaNutri = styled.textarea`
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 13px;
  width: 240px;
  resize: vertical;
  min-height: 60px;
  box-sizing: border-box;
  font-family: inherit;
  /* border: 2px solid red; */
  &:focus {
    outline: none;
    border-color: #17a2b8;
    box-shadow: 0 0 0 2px rgba(23, 162, 184, 0.15);
  }
  @media (max-width: 900px) {
    width: 340px;
  }
`;

// ─── Botão de seleção (triagem, via alimentação, aceitação) ───────────────────

export const BtnNutri = styled.button`
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid ${({ $ativo }) => ($ativo ? "#17a2b8" : "#ced4da")};
  background: ${({ $ativo }) => ($ativo ? "#17a2b8" : "#fff")};
  color: ${({ $ativo }) => ($ativo ? "#fff" : "#555")};
  cursor: pointer;
  font-size: 12px;
  font-weight: ${({ $ativo }) => ($ativo ? "700" : "400")};
  transition: all 0.15s;

  &:hover {
    border-color: #17a2b8;
    color: ${({ $ativo }) => ($ativo ? "#fff" : "#17a2b8")};
  }
`;

// ─── Faixa de identificação do paciente (topo da aba nutrição) ────────────────

export const IdentificacaoPaciente = styled.div`
  background: #f0f8ff;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 10px;
  font-size: 13px;
  color: #444;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: 96%;
  /* border: 1px solid red; */
  strong {
    font-weight: 700;
    color: #333;
  }
`;

// ─── Label de classificação IMC ───────────────────────────────────────────────

export const ImcClassificacao = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ $normal }) => ($normal ? "#28a745" : "#e67e22")};
`;

// ─── Wrapper inline para suplemento (botões + input condicional) ──────────────

export const SuplementoWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
`;
