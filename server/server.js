const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const HighCard = require('./game/HighCard');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let game = new HighCard();

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('joinGame', () => {
    const joined = game.addPlayer(socket.id);
    if (joined) {
      socket.emit('gameJoined', { playerId: socket.id });
      io.emit('gameState', game.getGameState());
    } else {
      socket.emit('gameFull');
    }
  });

  socket.on('startGame', () => {
    game.dealCards();
    io.emit('gameState', game.getGameState());
    game.players.forEach(player => {
      const hand = game.getPlayerHand(player.id);
      console.log(`Sending hand to ${player.id}`, hand);
      io.to(player.id).emit('playerHand', hand);
        // io.to(player.id).emit('playerHand', game.getPlayerHand(player.id));
  });
});

  socket.on('playCard', (card) => {
    const result = game.playCard(socket.id, card);
    if (result === 'win') {
      io.emit('gameOver', { winner: socket.id });
      game = new HighCard();  // Reset the game
    } else if (result) {
      io.emit('gameState', game.getGameState());
      io.to(socket.id).emit('playerHand', game.getPlayerHand(socket.id));
    }
  });
  
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Handle player disconnection (e.g., remove from game, end game if not enough players)
  });

});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});