import * as ApiService from '../components/apiservice/apiservice';
import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import '../components/css/movie.css';
export default function MoviesPage() {
  const location = useLocation();
  const history = useHistory();

  const { url } = useRouteMatch();
  const [inputData, setInputData] = useState('');

  const handleInputChange = event => {
    setInputData(event.target.value.toLowerCase());
  };
  const [movies, setMovie] = useState([]);
  const sortMovie =
    new URLSearchParams(location.search).get('sortBy') ?? inputData;

  const queryHandle = () => {
    if (sortMovie === '') {
      toast.error('Введите название фильма!');
      return;
    }
    history.push({
      ...location,
      search: `sortBy=${inputData}`,
    });
    ApiService.fetchMovieList(inputData).then(movies =>
      setMovie(movies.data.results),
    );
  };
  useEffect(() => {
    if (sortMovie === '') {
      return;
    }
    ApiService.fetchMovieList(sortMovie).then(movies =>
      setMovie(movies.data.results),
    );
  }, []);

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
          value={sortMovie}
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
