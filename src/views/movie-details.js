import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import MoviesAPI from './../api/movies-api';
import config from './../config';

const MovieDetails = () => {
  const [movie, setMovie] = useState({
    genres: [],
    spoken_languages: [],
    production_companies: [],
  });
  const { id: movieId } = useParams();

  const transformMovie = (movie) => ({
    ...movie,
    poster_path: movie.poster_path
      ? `${config.assets.THE_MOVIE_DB}${movie.poster_path}`
      : null,
    backdrop_path: movie.backdrop_path
      ? `${config.assets.THE_MOVIE_DB}${movie.backdrop_path}`
      : null,
    runtime: `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
  });

  const getMovieRequest = async () => {
    const response = await MoviesAPI.getMovie(movieId);
    const transformedResult = transformMovie(response);

    setMovie(transformedResult);
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

  return (
    <div className="movie-details">
      <Link to="/" className="movie-details__back">
        &lt;
      </Link>
      <img src={movie.backdrop_path} className="movie-details__backdrop"></img>

      <div className="movie-details__content movie-content">
        <div className="movie-content__header">
          <img
            src={
              movie.poster_path ||
              movie.backdrop_path ||
              config.assets.IMAGE_FALLBACK
            }
            className="movie-content__poster"
          ></img>

          <div className="movie-content__intro">
            <h3 className="movie-content__title">{movie.original_title}</h3>
            <p className="movie-content__text">Runtime: {movie.runtime}</p>
            <p className="movie-content__text">
              {movie.genres.map((genre) => genre.name).join(' | ')}
            </p>
            <p className="movie-content__text">
              {movie.spoken_languages.map((lang) => lang.name).join(', ')}
            </p>
            <div className="movie-content__ratings ratings">
              <span className="ratings__star">&#9733;</span>
              <p className="ratings__star-value">{movie.vote_average}</p>
            </div>
          </div>
        </div>

        <div className="movie-content__group">
          <h3 className="movie-content__title">Plot & Summary</h3>
          <p className="movie-content__text">{movie.overview}</p>
        </div>

        <a
          className="movie-content__book-button"
          href="https://www.cathaycineplexes.com.sg/"
        >
          Book Movie
        </a>
      </div>
    </div>
  );
};

export default MovieDetails;
