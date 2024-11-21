import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CharactersPage from './pages/characters-page';
import FavoritesPage from './pages/favorites-page';
import CharacterPage from './pages/character-page';
import FilmsPage from './pages/films-page';
import FilmPage from './pages/film-page';
import SpeciesPage from './pages/species-page';
import Race from './components/Race/Race';
import SearchPage from './pages/search-page';
import Header from './components/Header/Header';
import Error from './components/Error/Error';
import HomePage from './pages/home-page';
import Footer from './components/Footer/Footer';

import styles from './App.module.css';

function App() {

  return (
    <main className={styles.container}>
      <div id={styles.stars}></div>
      <div id={styles.stars2}></div>
      <div id={styles.stars3}></div>

      <div className={styles.wrapper}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/star-wars-fan' element={<HomePage />} />
          <Route path='/characters' element={<CharactersPage />} />
          <Route path='/characters/:id' element={<CharacterPage />} />
          <Route path='/films' element={<FilmsPage />} />
          <Route path='/films/:id' element={<FilmPage />} />
          <Route path='/species' element={<SpeciesPage />} />
          <Route path='/species/:id' element={<Race />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/favorites' element={<FavoritesPage />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
