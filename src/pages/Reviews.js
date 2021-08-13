import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as ApiService from '../components/apiservice/apiservice';
export default function Reviews() {
  const { slug } = useParams();
  const moviesId = slug.match(/[a-z0-9]+$/)[0];
  const [reviews, setReviews] = useState('');

  useEffect(() => {
    ApiService.fetchReviews(moviesId).then(reviews =>
      setReviews(reviews.data.results),
    );
  }, [moviesId]);

  return (
    <>
      {reviews && (
        <>
          <ul>
            {reviews.map(review => (
              <li key={review.id}>{review.content}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
