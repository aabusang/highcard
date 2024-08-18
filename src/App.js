import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Welcome to High Card!
      </h1>

      <GameBoard />
      
    </div>
  );
}

export default App;
