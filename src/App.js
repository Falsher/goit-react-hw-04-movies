import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from './components/appbar/appbar';
const HomeMovies = lazy(() =>
  import('./pages/homeMovies' /* webpackChunkName:"Home-Movies" */),
);
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage' /*webpackChunkName:"Movies-Page"*/),
);
const Movies = lazy(() =>
  import('./pages/Movies' /*webpackChunkName:"Movies"*/),
);
const NoteFound = lazy(() =>
  import('./pages/NoteFound' /*webpackChunkName:"NoteFound"*/),
);
export default function App() {
  return (
    <div className="App">
      <AppBar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact>
            <HomeMovies />
          </Route>
          <Route exact path="/movies">
            <Movies />
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailsPage />
          </Route>
          <Route path="/:slug">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NoteFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
