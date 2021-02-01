import React from 'react';
import { Link } from 'react-router-dom';

import config from './../config';

const MovieCard = (props) => (
  <Link to={`/movies/${props.movie.id}`} className="movie-card">
    <img
      src={
        props.movie.poster_path ||
        props.movie.backdrop_path ||
        config.assets.IMAGE_FALLBACK
      }
      alt={props.movie.original_title}
      className="movie-card__image"
    ></img>
    <div className="movie-card__details">
      <h3 className="movie-card__title">{props.movie.original_title}</h3>
      <div className="ratings">
        <span className="ratings__star">&#9733;</span>
        <p className="ratings__star-value">{props.movie.vote_average}</p>
      </div>
      <p className="movie-card__popularity">
        Popularity: {props.movie.popularity}
      </p>
    </div>
  </Link>
);

export default MovieCard;
