import React from 'react';

function MatchModal({ dog, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">You've Been Matched!</h2>
        <div className="mb-4">
          <img
            src={dog.img}
            alt={dog.name}
            className="w-full h-64 object-cover rounded"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-semibold">{dog.name}</p>
          <p>Breed: {dog.breed}</p>
          <p>Age: {dog.age} years</p>
          <p>Location: {dog.zip_code}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default MatchModal;
