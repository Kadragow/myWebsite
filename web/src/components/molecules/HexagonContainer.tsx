import {
  Hexagon,
  HexagonOuter,
  RotatingElement
} from 'components/atoms/HexagonContainer/Hexagon';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const TempContainer = styled.div`
  width: 200px;
  height: 150px;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`;

interface Dimensions {
  h: number;
  w: number;
}

type Props = {
  children?: React.ReactChild | React.ReactChild[];
};

const HexagonContainer: React.FC<Props> = ({ children }) => {
  const [c, setC] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    h: 0,
    w: 0
  });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        h: containerRef.current?.clientHeight,
        w: containerRef.current?.clientWidth
      });
    }
  }, [containerRef]);

  return (
    <TempContainer ref={containerRef}>
      <HexagonOuter
        h={dimensions.h}
        w={dimensions.w}
        maxDim={Math.min(
          dimensions.w + 10,
          dimensions.h + 10 - dimensions.h / 6
        )}
      >
        <Hexagon
          h={dimensions.h}
          w={dimensions.w}
          maxDim={Math.min(dimensions.w, dimensions.h - dimensions.h / 6)}
        >
          {children}
          <button onClick={() => setC((p) => p + 1)}>dsad</button>
          {c}
        </Hexagon>
        <RotatingElement />
      </HexagonOuter>
    </TempContainer>
  );
};

export default HexagonContainer;
