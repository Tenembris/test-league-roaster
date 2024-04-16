import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <div className='hero-section'>
        <video className='video-hero' src="/img/full-hd-league.mp4" autoPlay muted loop />
        <h1>Welcome to League Roaster</h1>
        <div className='black-gradient' />
      </div>
      <div className='option-section'>
      <div className='black-gradient-top' />
      <div className='option-card-container'>
      <div className='option-card'>
      <Link to="/champions">Champions</Link>
        
      </div>
      <div className='option-card'>
      <h4>work in progress</h4>
      </div>

      <div className='option-card'>
      <h4>work in progress</h4>
      </div>

      </div>
      </div>
    </>
  );
}

export default MainPage;
