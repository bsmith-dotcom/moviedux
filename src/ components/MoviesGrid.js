import React, {useState, useEffect} from "react";

import '../styles.css';
import MovieCard from "./MovieCard";

export default function MoviesGrid()
{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    //Load the movies
    useEffect(() => {
      fetch("movies.json")
      .then(response => response.json())
      .then(data => setMovies(data));

    }, []);

    //Search for a movie
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm)
    }
    
    return(
        <div>
            <input 
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value = {searchTerm}
            onChange={handleSearchChange}
            />

        <div className="movies-grid">
            {
                movies.map(
                    (movie) => (<MovieCard movie={movie} key={movie.id}/>)
                    )
            }   
            <p>{movies.length} results</p>         
        </div>
        </div>
    );
}