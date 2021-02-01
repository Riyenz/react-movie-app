import config from '../config';
import http from './http';

export const MOVIE_SORT_OPTIONS = [
  {
    label: 'Popularity Desc',
    value: 'popularity.desc',
  },
  {
    label: 'Popularity Asc',
    value: 'popularity.asc',
  },
  {
    label: 'Release Date Desc',
    value: 'release_date.desc',
  },
  {
    label: 'Release Date Asc',
    value: 'release_date.asc',
  },
  {
    label: 'Alphabetical Desc',
    value: 'original_title.desc',
  },
  {
    label: 'Alphabetical Asc',
    value: 'original_title.asc',
  },
  {
    label: 'Rating Desc',
    value: 'vote_average.desc',
  },
  {
    label: 'Rating Asc',
    value: 'vote_average.asc',
  },
];

export const DEFAULT_SORT_OPTION = MOVIE_SORT_OPTIONS[0];

const MoviesAPI = {
  getMovies: (queryParams = {}) =>
    http().get('/discover/movie', {
      params: {
        api_key: config.apiKeys.THE_MOVIE_DB,
        ...queryParams,
      },
    }),
  getMovie: (id) =>
    http().get(`/movie/${id}`, {
      params: {
        api_key: config.apiKeys.THE_MOVIE_DB,
      },
    }),
};

export default MoviesAPI;
