import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <div className='hero-section'>
        <video className='video-hero'  src="/img/hd-roaster-converted.webm"  autoPlay muted loop preload='auto' />
        <h1>Welcome to League Roaster</h1>
        <div className='black-gradient' />
      </div>
      <div className='option-section'>
      <div className='black-gradient-top' />
      <div className='option-card-container'>
  <div className='option-card'>
    <img src="/img/League-of-legends-9073196.webp" alt="" />
    <h4>Champions</h4>
  </div>
  <div className='option-card'>
    <img src="/img/placeholder.webp" alt="" />
  </div>
  <div className='option-card'>
    <img src="/img/placeholder.webp" alt="" />
  </div>
</div>

      </div>
    </>
  );
}

export default MainPage;
