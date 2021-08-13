import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as ApiService from '../components/apiservice/apiservice';
import '../components/css/home.css';
export default function HomeMovies() {
  const location = useLocation();
  const [movie, setMovie] = useState([]);
  const { url } = useRouteMatch();
  useEffect(() => {
    ApiService.fetchMoviePopular().then(movie => setMovie(movie.data.results));
  }, []);

  return (
    <>
      <ul className="newMovieList">
        {movie.map(mov => {
          return (
            <li key={mov.id}>
              <Link
                to={{ pathname: `${url}${mov.id}`, state: { from: location } }}
              >
                <p> {mov.original_title}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                  alt={mov.original_title}
                  height="300"
                ></img>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
