import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getBreeds, searchDogs, getDogs, matchDog } from '../api/dogs';
import DogCard from '../components/DogCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import './SearchPage.css';

function SearchPage() {
  const { logout } = useAuth();
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedDog, setMatchedDog] = useState(null);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const DOGS_PER_PAGE = 20;

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    fetchDogs();
  }, [selectedBreed, sortOrder, currentPage]);

  const fetchBreeds = async () => {
    try {
      const breedList = await getBreeds();
      setBreeds(breedList);
    } catch (error) {
      console.error('Failed to fetch breeds:', error);
    }
  };

  const fetchDogs = async () => {
    setLoading(true);
    try {
      const params = {
        breeds: selectedBreed ? [selectedBreed] : undefined,
        sort: `breed:${sortOrder}`,
        size: DOGS_PER_PAGE,
        from: (currentPage - 1) * DOGS_PER_PAGE,
      };

      const searchResults = await searchDogs(params);
      const dogsData = await getDogs(searchResults.resultIds);
      setDogs(dogsData);
      setTotalPages(Math.ceil(searchResults.total / DOGS_PER_PAGE));
    } catch (error) {
      console.error('Failed to fetch dogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBreedChange = (breed) => {
    setSelectedBreed(breed);
    setCurrentPage(1);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const toggleFavorite = (dogId) => {
    setFavorites((prev) =>
      prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
    );
  };

  const handleGenerateMatch = async () => {
    if (favorites.length === 0) return;

    try {
      const { match } = await matchDog(favorites);
      const [matchedDogData] = await getDogs([match]);
      setMatchedDog(matchedDogData);
      setShowMatchModal(true);
    } catch (error) {
      console.error('Failed to generate match:', error);
    }
  };

  const favoriteDogs = dogs.filter(dog => favorites.includes(dog.id));

  const toggleFavoritesModal = () => {
    setShowFavoritesModal(!showFavoritesModal);
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <div className="header-content">
          <h1>Dog Adoption Search</h1>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="search-content">
        <FilterBar
          breeds={breeds}
          selectedBreed={selectedBreed}
          sortOrder={sortOrder}
          onBreedChange={handleBreedChange}
          onSortChange={handleSortChange}
        />

        <div className="actions-bar">
          <div className="favorites-count">{favorites.length} dogs favorited</div>
          <button onClick={toggleFavoritesModal} disabled={favorites.length === 0} className="match-button">
            View Favorites
          </button>
          <button onClick={handleGenerateMatch} disabled={favorites.length === 0} className="match-button">
            Generate Match
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="dogs-grid">
            {dogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} isFavorite={favorites.includes(dog.id)} onToggleFavorite={() => toggleFavorite(dog.id)} />
            ))}
          </div>
        )}

        {showFavoritesModal && (
          <div className="modal-overlay" onClick={toggleFavoritesModal}>
            <div className="favorites-modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 style={{display: "inline"}}>Your Favorites ({favorites.length})</h2>
              <button className="close-button" onClick={toggleFavoritesModal}>&times;</button>
              <div className="favorites-grid">
              {favoriteDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} isFavorite={favorites.includes(dog.id)} onToggleFavorite={() => toggleFavorite(dog.id)} />
            ))}
              </div>
            </div>
          </div>
        )}

        {showMatchModal && matchedDog && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Your Perfect Match!</h2>
              <img className="show-match-modal" src={matchedDog.img} alt={matchedDog.name} />
              <p>Meet {matchedDog.name}, a {matchedDog.breed}!</p>
              <button onClick={() => setShowMatchModal(false)}>Close</button>
            </div>
          </div>
        )}

        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
      </main>
    </div>
  );
}

export default SearchPage;
