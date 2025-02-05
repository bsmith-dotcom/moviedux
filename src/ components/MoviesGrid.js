import React, {useState, useEffect} from "react";

import '../styles.css';
import MovieCard from "./MovieCard";

export default function MoviesGrid()
{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("All Genres");
    const [rating, setRating] = useState("All Ratings");

    //Load the movies
    useEffect(() => {
      fetch("movies.json")
      .then(response => response.json())
      .then(data => setMovies(data));

    }, []);

    //Search for a movie
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    //Handle a genre change
    const handleGenreChange = (e) => { 
        setGenre(e.target.value);
    }

    //Handle a rating change
    const handleRatingChange = (e) => {
        setRating(e.target.value);
    }



    const matchesGenre = (movie, genre) => {
        return genre === "All Genres" || movie.genre.toLowerCase() === genre.toLowerCase();
    }

    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    }

    const matchesRating = (movie, rating) => {
        switch(rating){
            case "All Ratings":
                return true;
            case "Good":
                return movie.rating >= 8;
            case "Ok":
                return movie.rating >= 5 && movie.rating < 8;
            case "Bad":
                return movie.rating < 5;
            default:
                return false;
        }
    }

    const filteredMovies = movies.filter(movie =>
        matchesGenre(movie, genre) && 
        matchesRating(movie, rating) &&
        matchesSearchTerm(movie, searchTerm)
    )



    
    return(
        <div>

            <input 
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value = {searchTerm}
            onChange={handleSearchChange}
            />

            <div className="filter-bar">
                <div className="filter-slot">
                <label>Genre</label>
                <select className="filter-dropdown" 
                onChange={handleGenreChange}>
                    value={genre}
                    <option value="All Genres">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                </select>
                </div>
                <div className="filter-slot">
                    <label>Rating</label>
                    <select className="filter-dropdown" 
                    value={genre}
                    onChange={handleRatingChange}>
                    <option value="All Ratings">All Ratings</option>
                    <option value="Good">Good</option>
                    <option value="Ok">Ok</option>
                    <option value="Bad">Bad</option>
                </select>
                </div>
            </div>

        <div className="movies-grid">
            {
                filteredMovies.map(
                    (movie) => (<MovieCard movie={movie} key={movie.id}/>)
                    )
            }   
            <p>{filteredMovies.length} results</p>         
        </div>
        </div>
    );
}