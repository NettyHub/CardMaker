import React from 'react';
import PropTypes from 'prop-types';

const CardDetail = ({ cardId, message, imageUrl }) => {
  const fullImageUrl = `${process.env.REACT_APP_API_URL}/${imageUrl}`;

  return (
    <div className="card">
      <h2>Card Detail</h2>
      <p>Card ID: {cardId}</p>
      <div className="message">{message}</div>
      {imageUrl && <img src={fullImageUrl} alt="Card" />}
    </div>
  );
};

CardDetail.propTypes = {
  cardId: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default CardDetail;