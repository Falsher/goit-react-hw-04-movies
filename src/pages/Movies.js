import * as ApiService from '../components/apiservice/apiservice';
import { useState } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import '../components/css/movie.css';
export default function MoviesPage() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const [inputData, setInputData] = useState('');
  const handleInputChange = event => {
    setInputData(event.currentTarget.value.toLowerCase());
  };
  const [movies, setMovie] = useState([]);

  const queryHandle = () => {
    if (inputData === '') {
      toast.error('Введите название фильма!');
      return;
    }
    ApiService.fetchMovieList(inputData).then(movies =>
      setMovie(movies.data.results),
    );
  };

  return (
    <>
      <div className="pageSearchMovie">
        <button
          type="submit"
          onClick={queryHandle}
          className="buttonSearchMovie"
        >
          Search
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={inputData}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <ul className="movieSearchList">
          {movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `${url}/${slugify(
                      `${movie.original_title} ${movie.id}`,
                      { lower: true },
                    )}`,
                    state: { from: location },
                  }}
                >
                  <p>{movie.original_title}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    height="300"
                  ></img>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
