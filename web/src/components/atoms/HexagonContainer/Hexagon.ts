import styled from 'styled-components';

interface Props {
  w?: number;
  h?: number;
  maxDim: number;
}

export const Hexagon = styled.div<Props>`
  --mainColor: white;
  --width: calc(100%);
  --maxDim: ${({ maxDim }) => `${maxDim}px`};

  position: relative;
  width: var(--maxDim);
  aspect-ratio: 300 / 173.21;
  background-color: var(--mainColor);
  margin: calc(var(--maxDim) * 86.6 / 300) 0;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    border-left: calc(var(--maxDim) / 2) solid transparent;
    border-right: calc(var(--maxDim) / 2) solid transparent;
  }

  &:before {
    bottom: 100%;
    border-bottom: calc(var(--maxDim) * 86.6 / 300) solid var(--mainColor);
  }

  &:after {
    top: 100%;
    width: 0;
    border-top: calc(var(--maxDim) * 86.6 / 300) solid var(--mainColor);
  }
`;

export const HexagonOuter = styled.div<Props>`
  --mainColor: black;
  --width: calc(100%);
  --maxDim: ${({ maxDim }) => `${maxDim}px`};

  position: relative;
  width: var(--maxDim);
  aspect-ratio: 300 / 173.21;
  background-color: var(--mainColor);
  margin: calc(var(--maxDim) * 86.6 / 300) 0;

  display: flex;
  justify-content: center;
  align-items: center;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    border-left: calc(var(--maxDim) / 2) solid transparent;
    border-right: calc(var(--maxDim) / 2) solid transparent;
  }

  &:before {
    bottom: 100%;
    border-bottom: calc(var(--maxDim) * 86.6 / 300) solid var(--mainColor);
  }

  &:after {
    top: 100%;
    width: 0;
    border-top: calc(var(--maxDim) * 86.6 / 300) solid var(--mainColor);
    z-index: -1;
  }
`;

export const RotatingElement = styled.div`
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 200px;
  transform: translate(-50%, -50%);
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
  z-index: -1;

  @keyframes spin {
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
