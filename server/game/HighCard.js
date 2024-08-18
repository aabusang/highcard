class HighCard {
    constructor() {
      this.deck = this.createDeck();
      this.players = [];
      this.currentPlayer = 0;
      this.currentCard = null;
      this.currentSuit = null;
    }
  
    createDeck() {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      const values = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      let deck = [];
  
      for (let suit of suits) {
        for (let value of values) {
          deck.push({ suit, value });
        }
      }
  
      return this.shuffleDeck(deck);
    }
  
    shuffleDeck(deck) {
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      return deck;
    }
  
    addPlayer(playerId) {
      if (this.players.length < 8) {  // Assuming a maximum of 8 players
        this.players.push({ id: playerId, hand: [] });
        return true;
      }
      return false;
    }
  
    dealCards() {
      for (let i = 0; i < 5; i++) {
        for (let player of this.players) {
          player.hand.push(this.deck.pop());
        }
      }
    }
  
    
    playCard(playerId, card) {
      const player = this.players.find(p => p.id === playerId);
      if (!player) return false;
  
      const cardIndex = player.hand.findIndex(c => c.suit === card.suit && c.value === card.value);
      if (cardIndex === -1) return false;
  
      if (this.currentCard) {
        if (card.suit !== this.currentSuit && player.hand.some(c => c.suit === this.currentSuit)) {
          return false;  // Player must play the current suit if they have it
        }
      }
  
      player.hand.splice(cardIndex, 1);
      this.currentCard = card;
      this.currentSuit = card.suit;
  
      // Check if this player has won
      // Just to start with but a player won't just win from playing their last card.
      // Yes if they are the last to play and they have the highest of the required suit.
      if (player.hand.length === 0) {
        return 'win';
      }
  
      // Move to next player
      this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
  
      return true;
    }
  
    getPlayerHand(playerId) {
        const player = this.players.find(p => p.id === playerId);
        return player ? player.hand : [];
    }

    getGameState() {
      return {
        players: this.players.map(p => ({ id: p.id, cardCount: p.hand.length })),
        currentPlayer: this.currentPlayer,
        currentCard: this.currentCard,
        currentSuit: this.currentSuit
      };
    }
  }
  
  module.exports = HighCard;