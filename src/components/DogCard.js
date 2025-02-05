import React from 'react';
import './DogCard.css';

function DogCard({ dog, isFavorite, onToggleFavorite }) {
  return (
    <div className="dog-card">
      <img
        src={dog.img}
        alt={dog.name}
        className="dog-image"
      />
      <button
        onClick={onToggleFavorite}
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
      >
        ❤
      </button>
      <div className="dog-info">
        <h3>{dog.name}</h3>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age} years</p>
        <p>Location: {dog.zip_code}</p>
      </div>
    </div>
  );
}

export default DogCard;