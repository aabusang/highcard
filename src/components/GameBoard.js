import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Hand from './Hand';
import Card from './Card';

const socket = io('http://localhost:3001');

function GameBoard() {
  const [gameState, setGameState] = useState(null);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerId, setPlayerId] = useState(null);


  useEffect(() => {
    socket.on('gameJoined', (data) => {
      setPlayerId(data.playerId);
      socket.emit('startGame');
    });

    socket.on('gameState', (state) => {
      setGameState(state);
    });

    socket.on('playerHand', (hand) => {
      console.log('Received player hand:', hand);
      setPlayerHand(hand);
    });

    socket.on('gameOver', (data) => {
      alert(`Game Over! Winner: ${data.winner}`);
    });

    socket.emit('joinGame');

    return () => {
      socket.off('gameJoined');
      socket.off('gameState');
      socket.off('gameOver');
      socket.off('playerHand');
    };
  }, []);

  const playCard = (card) => {
    socket.emit('playCard', card);
  };

  console.log('Current player hand:', playerHand);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Current Card</h2>
      {gameState && gameState.currentCard && (
        <Card suit={gameState.currentCard.suit} value={gameState.currentCard.value} />
      )}
      <h2 className="text-2xl font-bold mt-8 mb-4">Your Hand</h2>
      <Hand cards={playerHand} onCardClick={playCard} />
      {gameState && (
        <div className="mt-8">
          <h3 className="text-xl font-bold">Game State</h3>
          <p>Current Player: {gameState.currentPlayer}</p>
          <p>Current Suit: {gameState.currentSuit}</p>
          <h4 className="text-lg font-semibold mt-4">Players:</h4>
          <ul>
            {gameState.players.map((player, index) => (
              <li key={index}>
                Player {index + 1} (ID: {player.id.slice(0, 5)}...): {player.cardCount} cards
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GameBoard;