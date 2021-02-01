import React, { useState } from 'react';
import Select from 'react-select';
import PullToRefresh from 'react-simple-pull-to-refresh';

import MoviesAPI, { DEFAULT_SORT_OPTION, MOVIE_SORT_OPTIONS } from './../api/movies-api';
import MovieCard from './../components/movie-card';
import config from './../config';

const Movies = () => {
  const [isFetchingMovies, setIsFetchingMovies] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_OPTION.value);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: '#353c50',
      backgroundColor: state.isSelected ? '#f8a412' : '#ffffff',
    }),
  };

  const transformMovies = (movies) =>
    movies.map((movie) => ({
      ...movie,
      poster_path: movie.poster_path
        ? `${config.assets.THE_MOVIE_DB}${movie.poster_path}`
        : null,
      backdrop_path: movie.backdrop_path
        ? `${config.assets.THE_MOVIE_DB}${movie.backdrop_path}`
        : null,
    }));

  const getMovieRequest = async (page = 1, sort_by) => {
    setIsFetchingMovies(true);
    const response = await MoviesAPI.getMovies({
      page,
      sort_by,
    });
    const transformedResult = transformMovies(response.results);

    setCurPage(response.page);
    setSortBy(sort_by);
    setIsFetchingMovies(false);
    return transformedResult;
  };

  const selectSort = async (option) => {
    const result = await getMovieRequest(1, option.value);
    setMovies(result);
  };

  const handleRefresh = async () => {
    const result = await getMovieRequest(1, DEFAULT_SORT_OPTION.value);
    setMovies(result);
  };

  const handleFetchMore = async () => {
    const result = await getMovieRequest(curPage + 1, sortBy);
    setMovies([...movies, ...result]);
  };

  return (
    <div className="movies">
      <PullToRefresh
        onRefresh={handleRefresh}
        canFetchMore={!isFetchingMovies}
        onFetchMore={handleFetchMore}
        className="movies__list"
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </PullToRefresh>
      <div className="movies__actions">
        <Select
          options={MOVIE_SORT_OPTIONS}
          defaultValue={sortBy}
          onChange={selectSort}
          styles={customStyles}
          menuPlacement="auto"
          placeholder="Sort by"
        />
      </div>
    </div>
  );
};
export default Movies;
