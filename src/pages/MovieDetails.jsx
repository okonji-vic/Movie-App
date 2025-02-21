import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(`https://api.themoviedb.org/3/movie/${id}?api_key=a704d2932b02b0671456d391d93071fa&language=en-US`)
  //     .then((response) => {
  //       setMovie(response.data);
  //     })
  //     .catch((error) => console.error("Error fetching movie details:", error));
  // }, [id]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=a704d2932b02b0671456d391d93071fa&language=en-US`)
      .then((movieResponse) => {
        axios
          .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=a704d2932b02b0671456d391d93071fa`)
          .then((videoResponse) => {
            // Find the first YouTube trailer
            const trailer = videoResponse.data.results.find(
              (video) => video.type === "Trailer" && video.site === "YouTube"
            );
  
            // Set Movie & Trailer
            setMovie({
              ...movieResponse.data,
              trailerKey: trailer ? trailer.key : null,
            });
          })
          .catch((error) => console.error("Error fetching movie trailer:", error));
      })
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);
  

  if (!movie) return <p className="loading">Loading...</p>;

  return (
    <motion.div 
  className="movie-details"
  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <div className="movie-overlay"></div>
  <motion.h1 className="movie-title">
    {movie.title}
  </motion.h1>
  <div className="movie-content">
    <motion.img 
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
      alt={movie.title}
      className="movie-poster"
        />
        <div className="movie-info">
        {movie.trailerKey ? (
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${movie.trailerKey}`}
    frameBorder="0"
    allowFullScreen
    title="Movie Trailer"
  ></iframe>
) : (
  <p>No trailer available</p>
)}
    <p className="movie-tagline">{movie.tagline}</p>
    <p className="movie-overview">{movie.overview}</p>
    <p className="movie-release-date">Release Date: {movie.release_date}</p>
          <p className="movie-rating">Rating: {movie.vote_average.toFixed(1)}</p>
          <a
            href={`https://www.themoviedb.org/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="movie-link"
          >
            View on TMDB
          </a>
          </div>
  </div>
</motion.div>

  );
};

export default MovieDetails;