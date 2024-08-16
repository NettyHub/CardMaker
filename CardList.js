import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardsList = () => {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cards`);
      setCards(response.data);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleRefresh = () => {
    fetchCards();
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh Cards</button>
      {cards.length > 0 ? (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              {card.title} - {card.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No cards found.</p>
      )}
    </div>
  );
};

export default CardsList;