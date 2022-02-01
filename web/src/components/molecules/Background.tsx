import React, { useEffect, useRef, useState } from 'react';
import { BackgroundCanvas } from 'components/atoms/Background/BackgroundCanvas';
import { Dimensions, Particle } from 'models/Background';

const G = 0.000006;

const Background: React.FC<{ particle: string }> = ({ particle }) => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [particles, setParticles] = useState<Array<Particle>>([]);
  const [dimensions] = useState<Dimensions>({
    w: window.innerWidth,
    h: window.innerHeight
  });

  const drawLine = (p: Particle, part: string) => {
    if (!context) return;
    const maxDist = Math.min(dimensions.h / 5, 400);

    for (let i = 0; i < particles.length; i++) {
      const p2 = particles[i];
      const distance = Math.hypot(p2.x - p.x, p2.y - p.y);
      if (distance > maxDist) continue;

      const opacity = Math.min(
        (p.age * p2.age) / (110 * 110) - (1 * distance) / maxDist,
        1
      );

      context.strokeStyle = `rgba(${part}, ${opacity})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(p.x, p.y);
      context.lineTo(p2.x, p2.y);
      context.stroke();

      const ySign = Math.sign(p2.y - p.y);
      const xSign = Math.sign(p2.x - p.x);
      const vInc = opacity * G;

      if ((xSign && p2.xs < 0.5) || (!xSign && p2.xs > -0.5))
        p2.xs = p2.xs + xSign * vInc;

      if ((ySign && p2.ys < 0.5) || (!ySign && p2.ys > -0.5))
        p2.ys = p2.ys + ySign * vInc;
    }
  };

  const move = (part: string) => {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.xs;
      p.y += p.ys;
      if (p.age >= p.maxAge) p.reachMaxAge = true;
      if (p.reachMaxAge) p.age -= 0.01;
      else p.age += 0.01;

      if (p.x > dimensions.w + 10 || p.x < -10) p.xs = -p.xs;

      if (p.y > dimensions.h + 10 || p.y < -10) p.ys = -p.ys;

      if (p.age < 0) {
        p.age = 0;
        p.maxAge = Math.random() * 100 + 10;
        p.reachMaxAge = false;
      }

      drawLine(p, part);
    }
  };

  const draw = (part: string) => {
    if (!context) return;

    context.clearRect(0, 0, dimensions.w, dimensions.h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      context.strokeStyle = `rgba(${part}, ${p.age / 110})`;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(p.x, p.y);
      context.lineTo(p.x, p.y);
      context.stroke();
    }
    move(part);
  };

  const initData = () => {
    if (!context) return;
    context.lineCap = 'round';

    const init = [];
    const maxPart = Math.min(dimensions.w / 5, 250);

    for (let i = 0; i < maxPart; i++) {
      init.push({
        x: Math.random() * dimensions.w,
        y: Math.random() * dimensions.h,
        xs: ((Math.random() - 0.5) * maxPart) / 500,
        ys: ((Math.random() - 0.5) * maxPart) / 500,
        age: Math.random() * 80 + 10,
        maxAge: Math.random() * 100 + 10,
        reachMaxAge: false
      });
    }

    setParticles(init);
  };

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    const canvas: HTMLCanvasElement = currentCanvas;
    const currentCtx = canvas.getContext('2d');
    if (!currentCtx) return;
    setContext(currentCtx);
  }, [canvasRef.current]);

  useEffect(() => {
    if (!context) return;

    if (particles.length === 0) initData();

    if (!intervalId && particles.length > 0) {
      setIntervalId(setInterval(() => draw(particle), 30));
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [context, intervalId, particles]);

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }, [particle]);

  return (
    <BackgroundCanvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default Background;
