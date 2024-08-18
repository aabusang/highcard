import React from 'react';

function Card({ suit, value }) {
  return (
    <div className="w-20 h-32 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-center m-2">
      <span className={`text-2xl ${suit === 'Hearts' || suit === 'Diamonds' ? 'text-red-500' : 'text-black'}`}>
        {value} {suit === 'Hearts' ? '♥' : suit === 'Diamonds' ? '♦' : suit === 'Clubs' ? '♣' : '♠'}
      </span>
    </div>
  );
}

export default Card;