import React from 'react';

function FilterBar({ breeds, selectedBreed, sortOrder, onBreedChange, onSortChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <select
        value={selectedBreed}
        onChange={(e) => onBreedChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Breeds</option>
        {breeds.map(breed => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
}

export default FilterBar;