import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
`;

export const Box = styled.div`
  padding: 14px 20px;
  border-radius: 8px;
  color: #fff;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);

  &.success { background: #2ecc71; }
  &.error   { background: #e74c3c; }
  &.warning { background: #f1c40f; color:#000; }
`;
