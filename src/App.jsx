import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import MainPage from './MainPage';
import ChampionList from './ChampionList';
import Champion from './Champion';
import Champions from './Champions';
import NavBar from './Navbar';
import Footer from './Footer';
import ItemsComponent from './ItemsComponent';
import RunesComponent from './RunesComponent';


function App() {
  return (
    <Router>
      <NavBar />
      <TransitionGroup>
        <CSSTransition classNames="fade" timeout={300}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/champions" element={<Champions />} />
            <Route path="/champion/:name" element={<Champion />} />
            <Route path="/items" element={<ItemsComponent />} />
            <Route path="/runes" element={<RunesComponent />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </Router>
  );
}

export default App;
