import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './MainPage';
import ChampionList from './ChampionList';
import Champion from './Champion';
import Champions from './Champions';
import NavBar from './Navbar'
import Footer from './Footer';
import ItemsComponent from './ItemsComponent';

function App() {
  return (
    <Router>
      <NavBar /> {/* Include the navigation bar here */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/champions" element={<Champions />} />
        <Route path="/champion/:name" element={<Champion />} />
        <Route path="/items" element={<ItemsComponent />} />
      </Routes>

      <Footer /> {/* Include the footer here */}
    </Router>
  );
}

export default App;
