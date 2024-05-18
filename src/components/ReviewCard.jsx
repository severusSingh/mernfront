import React from 'react';

const ReviewCard = ({ review }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = `reviews__star--${review.rating >= i ? 'active' : 'inactive'}`;
      stars.push(<svg key={i} className={`reviews__star ${starClass}`}><use xlinkHref="/img/icons.svg#icon-star" /></svg>);
    }
    return stars;
  };

  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img className="reviews__avatar-img" src={`https://mernback-a2n5.onrender.com/uploads/${review.user.photo}`} alt={review.user.name} />
        <h6 className="reviews__user">{review.user.name}</h6>
      </div>
      <p className="reviews__text">{review.review}</p>
      <div className="reviews__rating">{renderStars()}</div>
    </div>
  );
};

export default ReviewCard;
