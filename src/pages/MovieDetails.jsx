// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const MovieDetails = () => {
//   const { id } = useParams(); // Get movie ID from URL
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`https://api.themoviedb.org/3/movie/${id}?api_key=a704d2932b02b0671456d391d93071fa&language=en-US`)
//       .then((response) => {
//         setMovie(response.data);
//       })
//       .catch((error) => console.error("Error fetching movie details:", error));
//   }, [id]);

//   if (!movie) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{movie.title}</h1>
//       <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//       <p>{movie.overview}</p>
//       <p>Release Date: {movie.release_date}</p>
//     </div>
//   );
// };

// export default MovieDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=a704d2932b02b0671456d391d93071fa&language=en-US`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  if (!movie) return <p className="loading">Loading...</p>;

  return (
    // <motion.div 
    //   className="movie-details"
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   transition={{ duration: 0.5 }}
    // >
    //   <motion.h1
    //     className="movie-title"
    //     initial={{ y: -50 }}
    //     animate={{ y: 0 }}
    //     transition={{ type: "spring", stiffness: 100 }}
    //   >
    //     {movie.title}
    //   </motion.h1>
    //   <div className="movie-content">
    //     <motion.img
    //       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    //       alt={movie.title}
    //       whileHover={{ scale: 1.05 }}
    //       transition={{ type: "tween", duration: 0.2 }}
    //     />
    //     <div className="movie-info">
    //       <motion.p
    //         className="movie-overview"
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ delay: 0.2 }}
    //       >
    //         {movie.overview}
    //       </motion.p>
    //       <motion.p
    //         className="movie-release-date"
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ delay: 0.3 }}
    //       >
    //         Release Date: {movie.release_date}
    //       </motion.p>
    //       <motion.p
    //         className="movie-rating"
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ delay: 0.4 }}
    //       >
    //         Rating: {movie.vote_average}
    //       </motion.p>
    //       <motion.a
    //         href={`https://www.themoviedb.org/movie/${movie.id}`}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="movie-link"
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ delay: 0.5 }}
    //       >
    //         View on TMDB
    //       </motion.a>
    //       <motion.img
    //         src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
    //         alt={movie.title}
    //         className="movie-backdrop"
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ delay: 0.6 }}
    //       />


        

    //     </div>
    //   </div>
    // </motion.div>
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
    <p className="movie-tagline">{movie.tagline}</p>
    <p className="movie-overview">{movie.overview}</p>
    <p className="movie-release-date">Release Date: {movie.release_date}</p>
          <p className="movie-rating">Rating: {movie.vote_average}</p>
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