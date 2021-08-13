import { useParams } from 'react-router-dom';
import * as ApiService from '../components/apiservice/apiservice';
import { useState, useEffect } from 'react';
export default function CastActor() {
  const { slug } = useParams();
  const moviesId = slug.match(/[a-z0-9]+$/)[0];
  const [actors, setActor] = useState([]);

  useEffect(() => {
    ApiService.fetchActorId(moviesId).then(actor => setActor(actor.data.cast));
  }, [moviesId]);

  return (
    <>
      {actors && (
        <>
          <ul>
            {actors.map(actor => (
              <li key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  height="150"
                ></img>
                <p>{actor.name}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
