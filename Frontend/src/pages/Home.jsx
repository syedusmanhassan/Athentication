import React, { useEffect } from 'react'
import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import "../css/Home.css"
import { searchMovies, getPopularMovies } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';



const Home = () => {
   const [searchQuery , setSearchQuery] = useState("");
   const [movies, setMovies] = useState([]);
   const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

    }, [navigate]);

    // const handleLogout =()=>{
    //     localStorage.removeItem("token")
    //     navigate("/login");
    

  useEffect(()=>{
    const loadPopularMovies = async()=>{
        try{
          const popularMovies = await getPopularMovies();  
          setMovies(popularMovies);
        }catch(error){
            console.error("Error fetching popular movies:", error);
            setError("Failed to load popular movies. Please try again later.");
        }finally{
            setLoading(false);
        }
    }
    loadPopularMovies();
  }, [])

    const handleSearch = async (e)=>{
        e.preventDefault();
        if(!searchQuery.trim()) return;
        if(loading) return;
        setLoading(true);
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        }catch(error){
            console.error("Error searching movies:", error);
            setError("Failed to load search results. Please try again later.");
            setError("Failed to load movies. Please try again later.");
        }finally{
            setLoading(false);
        }
    }

  return (
            <>
            <Navbar/>
      <div className='home'>
        <form onSubmit={handleSearch} className='search-form'>
            <input type="text" placeholder='Search for a movie' className='search-input' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value) }
            />
            <button type='submit' className='search-button'>Search</button> 
        </form>
        {error && <div className='error-message'>{error}</div>}
        {loading ? <div className='loading'>Loading...</div> : <div className='movies-grid'>
        {movies.map((movie)=>(
            <MovieCard movie={movie} key={movie.id}/>
        ))}
        </div> }
     
    </div>
        </>
  )
}

export default Home