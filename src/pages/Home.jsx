import React, { useEffect, useState } from "react";
import { fetchMovies } from "../Api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ClipLoader from "react-spinner";
import styles from "./Home.module.css";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState("⭐️️");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 9;

    
  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genreResponse = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=a704d2932b02b0671456d391d93071fa&language=en-US"
        );
        setGenres([...genreResponse.data.genres]);
        // setGenres([{ id: "all", name: "All Genres" }, ...genreResponse.data.genres]);
    
        const searchResponse = await axios.get(
          "https://api.themoviedb.org/3/search/movie?api_key=a704d2932b02b0671456d391d93071fa&query=avengers"
        );

        setSearch(searchResponse.data.results);
        console.log("Search:", searchResponse.data.results);

      
        const moviesResponse = await fetchMovies();
        setMovies(moviesResponse);
        setFilteredMovies(moviesResponse);
        setLoading(false);
            
        console.log("Genres:", genreResponse.data.genres);
        console.log("Movies:", moviesResponse);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
      
    fetchGenresAndMovies();
  }, []);
  
  useEffect(() => {
    if (movies) {
      setRating(ratingChange(movies.vote_average));
    }
  }, [movies]);
  
  
  const ratingChange = (ratingNumber) => {
    if (ratingNumber >= 8) {
      return "⭐️⭐️⭐️⭐️⭐️";
    } else if (ratingNumber >= 7) {
      return "⭐️⭐️⭐️⭐️";
    } else if (ratingNumber >= 6) {
      return "⭐️⭐️⭐️";
    } else if (ratingNumber >= 5) {
      return "⭐️⭐️";
    } else if (ratingNumber >= 4) {
      return "⭐️";
    } else {
      return "No Rating";
    }
  };



      

  const handleSearch = async (input) => {
    setSearch(input);
    if (!input) {
      setFilteredMovies(movies);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=a704d2932b02b0671456d391d93071fa&query=${input}`
      );
      setFilteredMovies(response.data.results);
      console.log("Search:", response.data.results);
    } catch (err) {
      console.error("Error searching movies:", err);
    }
    setLoading(false);
  }


  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    
    if (genre === "all") {
      setFilteredMovies(movies);
    } else {
      const genreId = Number(genre); // Convert selected genre to a number
      setFilteredMovies(movies.filter((movie) => movie.genre_ids.includes(genreId)));
    }
  };
  

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      <div className={styles.genreSelect}>
        <select onChange={(e) => handleGenreChange(e.target.value)} value={selectedGenre}>
          <option value="all">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search movies..."
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.searchInput}
        />

      </div>
      {loading ? (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
        </div>
      ) : filteredMovies.length > 0 ? (
        <>
            <motion.div
              className={styles.movieGrid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {currentMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  className={styles.movieCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link to={`/movie/${movie.id}`}>
                    <div className={styles.posterContainer}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}` || "/placeholder.svg"}
                        alt={movie.title}
                        className={styles.movieImage}
                      />

                    </div>
                    <div className={styles.movieInfo}>
                      <h2>{movie.title || movie.name}</h2>
                      <div className={styles.movieMeta}>
                        <span>
                          {movie.genre_ids.map(id => {
                            const genre = genres.find(g => g.id === id);
                            return genre ? genre.name : "Unknown";
                          }).join(", ")}
                        </span>

                        {/* <span className={styles.rating}>Rating: {movie.vote_average.toFixed(1)}</span> */}
                        <span className={styles.rating}>
                          Rating:{ratingChange(movie.vote_average)}
                        </span>

                    
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          <div className={styles.pagination}>
            {[...Array(Math.ceil(filteredMovies.length / moviesPerPage))].map((_, index) => (
              <button
                key={index}
                className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ""}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
      <div className={styles.noMovies}>
              {/* <p>No movies found for {search ? `search term "${search}"` : `genre "${selectedGenre === "all" ? "All Genres" : genres.find(g => g.id === Number(selectedGenre)).name}"`}</p> */}
              <p>
  No movies found for{" "}
  {typeof search === "string" && search.trim() !== ""
    ? `search term "${search}"`
    : `genre "${selectedGenre === "all" ? "All Genres" : (genres.find(g => g.id === Number(selectedGenre))?.name || "Unknown Genre")}"`}
</p>


      </div>
      )}
    </div>
  )};

export default Home;
