import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './Components/ErrorComponent';
import Page404 from './Components/Page404'; // 

import './App.css';

const MovieDetails = lazy(() => import('./pages/MovieDetails'));

function App() {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
