import React from 'react'
import "../css/Favorites.css";
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import Navbar from '../../../../React--Movie-Recommendation/Frontend/src/components/Navbar';

const Favorites = () => {
  const { favorites } = useMovieContext();
  if(favorites){
      return(
        <div className='favorites-container'>
          <h2>Your Favorite Movies</h2>
          <div className='favorites-list'>
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>      

      )
    
  }
  return (
    <>
    <Navbar/>
    <div className='favorites-empty'>
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
    </>
  )
}

export default Favorites