import styled from 'styled-components';

export const BackgroundCanvas = styled.canvas`
  width: 100vw;
  height: 100vh;
  z-index: -100;

  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.background};
`;
