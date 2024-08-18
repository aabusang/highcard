import React from 'react';
import Card from './Card';

function Hand({ cards, onCardClick }) {
  console.log('Cards in Hand component:', cards);

  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card, index) => (
        <div key={index} onClick={() => onCardClick(card)} className="cursor-pointer">
          <Card suit={card.suit} value={card.value} />
        </div>
      ))}
    </div>
  );
}

export default Hand;


// import React from 'react';
// import Card from './Card';


// function Hand({ cards }) {
//   return (
//     <div className="flex flex-wrap justify-center">
//       {cards.map((card, index) => (
//         <div key={index} onClick={() => onCardClick(card)} className="cursor-pointer">
//           <Card suit={card.suit} value={card.value} />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Hand;