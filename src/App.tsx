import { useEffect, useState } from 'react';
import './App.css';
import { useAppStore } from './app/store';
import Canvas from './components/Canvas';

function App() {
  const score = useAppStore((state) => state.score);
  const difficulty = useAppStore((state) => state.difficulty);
  const setDifficulty = useAppStore((state) => state.setDifficulty);
  const addTarget = useAppStore((state) => state.addTarget);

  useEffect(() => {
    setInterval(() => {
      addTarget();
    }, 2000);
  }, []);

  const handleDifficulty = (difficulty: number) => {
    setDifficulty(difficulty);
  };

  return (
    <div className="w-screen h-screen bg-slate-700 flex flex-col justify-center items-center">
      <div className="absolute top-0 left-1/2 mt-12 text-white font-semibold text-xl select-none flex">
        SCORE: {score}
        <div className="ml-8">Difficulty</div>
        <div
          className="px-2 rounded shadow border border-green-400 text-green-400 ml-4 cursor-pointer hover:bg-green-400 hover:text-slate-700"
          onClick={() => {
            handleDifficulty(2);
          }}
        >
          Easy
        </div>
        <div
          className="px-2 rounded shadow border border-yellow-400 text-yellow-400 ml-4 cursor-pointer hover:bg-yellow-400 hover:text-slate-700"
          onClick={() => {
            handleDifficulty(1.5);
          }}
        >
          Medium
        </div>
        <div
          className="px-2 rounded shadow border border-red-400 text-red-400 ml-4 cursor-pointer hover:bg-red-400 hover:text-slate-700"
          onClick={() => {
            handleDifficulty(1);
          }}
        >
          Hard
        </div>
      </div>
      <Canvas />
    </div>
  );
}

export default App;
