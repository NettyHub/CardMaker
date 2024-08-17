import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardGallery = () => {
  const [cardList, setCardList] = useState([]);

  const fetchAllCards = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cards`);
      setCardList(response.data);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

  useEffect(() => {
    fetchAllCards();
  }, []);

  const onRefreshButtonClick = () => {
    fetchAllCards();
  };

  return (
    <div>
      <button onClick={onRefreshButtonClick}>Refresh Cards</button>
      {cardList.length > 0 ? (
        <ul>
          {cardList.map((card) => (
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

export default CardGallery;