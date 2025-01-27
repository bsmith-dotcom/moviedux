import React, {useState, useEffect} from "react";

import '../styles.css';
import MovieCard from "./MovieCard";

export default function MoviesGrid()
{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSEarchTerm] = useState("");

    //Load the movies
    useEffect(() => {
      fetch("movies.json")
      .then(response => response.json())
      .then(data => setMovies(data));

    }, []);
    
    return(
        <div>
            <input 
            type="text"
            placeholder="Search movies..."
            className="search-input"
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