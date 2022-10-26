import { useRef, useState } from 'react';
import { useAppStore } from '../app/store';
import Target from './Target';

function Canvas() {
  const activeTargets = useAppStore((state) => state.activeTargets);
  const [lastClickX, setLastClickX] = useState(0);
  const [lastClickY, setLastClickY] = useState(0);
  const [showMarker, setShowMarker] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  let timer = useRef(0);

  const onCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    clearTimeout(timer.current);
    setShowMarker(true);
    timer.current = setTimeout(() => {
      setShowMarker(false);
    }, 1000);
    setLastClickX(event.clientX - canvasRef.current!.offsetLeft);
    setLastClickY(event.clientY - canvasRef.current!.offsetTop);
  };

  return (
    <div
      className="w-5/6 h-5/6 bg-slate-400 flex relative"
      onClick={(e) => {
        onCanvasClick(e);
      }}
      ref={canvasRef}
    >
      {activeTargets.map((e, i) => {
        return (
          <Target
            id={e.id}
            key={e.id}
            startingX={e.startingX}
            startingY={e.startingY}
          />
        );
      })}
      {showMarker && (
        <div
          className="w-4 h-4 absolute rounded-full bg-yellow-600 opacity-50 flex items-center justify-center"
          style={{ left: lastClickX - 8, top: lastClickY - 8 }}
        ></div>
      )}
    </div>
  );
}

export default Canvas;
