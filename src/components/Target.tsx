import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAppStore } from '../app/store';
import Direction from '../enums/Direction';

type TargetProps = {
  id: string;
  startingX: number;
  startingY: number;
};

function Target({ id, startingX, startingY }: TargetProps) {
  const hit = useAppStore((state) => state.hit);
  const difficulty = useAppStore((state) => state.difficulty);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [direction, setDirection] = useState('HOR');
  const [shot, setShot] = useState(false);
  const directions = ['HOR', 'VER', 'DIA'];

  useEffect(() => {
    setDirection(directions[Math.floor(Math.random() * direction.length)]);
  }, []);

  useEffect(() => {
    switch (direction) {
      case 'HOR':
        setTargetX(200);
        setTargetY(0);
        break;
      case 'VER':
        setTargetX(0);
        setTargetY(200);
        break;
      case 'DIA':
        setTargetX(200);
        setTargetY(200);
        break;
      default:
        console.log('def');
        break;
    }
  }, [direction]);

  const onClick = () => {
    hit(id);
    setShot(true);
  };

  if (shot) return null;
  return (
    <>
      <motion.div
        onClick={onClick}
        className={`w-12 h-12 rounded-full bg-violet-700 absolute select-none`}
        style={{ top: startingY, left: startingX }}
        animate={{ x: targetX, y: targetY }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: difficulty,
        }}
      >
        <div className="w-8 h-32 rounded-full cursor-crosshair bg-violet-700 select-none ml-2 mt-12"></div>
      </motion.div>
    </>
  );
}

export default Target;
