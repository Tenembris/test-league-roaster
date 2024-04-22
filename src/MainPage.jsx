import React, { useState, useEffect } from 'react';
import AdditionalRoleInfo from './AdditionalRoleInfo';
import axios from 'axios';

const MainPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [clickedImage, setClickedImage] = useState(null); 
  const [currentPatch, setCurrentPatch] = useState(null);


  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setClickedImage(role); // Ustawia stan na nazwę klikniętej roli
  };

  const handleClose = () => {
    setSelectedRole(null); // Usuwa wybraną rolę
    setClickedImage(null); // Resetuje stan klikniętego obrazka
  };

  useEffect(() => {
    // Pobierz numer patcha z zewnętrznego API
    axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => {
        const currentPatchVersion = response.data[0];
        setCurrentPatch(currentPatchVersion);
      })
      .catch(error => {
        console.error('Wystąpił błąd podczas pobierania numeru patcha:', error);
      });
  }, []);

  return (
    <>
      <div className='hero-section'>
        <video className='video-hero' src="/img/hd-roaster-converted.webm" autoPlay muted loop preload='auto' />
        <h1>Welcome to League Roaster</h1>

        <div className='black-gradient' />
        <div className='news-info-section'>
          <div>
          <h4>Patch</h4>
          <h3>{currentPatch}</h3>
          
          </div>

      </div>
      </div>
      <div>
      <div className='info-news-website'>
          <h4>Informations</h4> 
          <p>
          <span className='gold-span'>League Roaster</span> was created for both <span className='green-span'>newcomers</span> and <span className='red-span'>veterans</span> of League of Legends. For newcomers, the platform offers comprehensive champion information, including skills accompanied by videos, lore, and upcoming skin releases. As for veterans, the website provides basic statistics, with plans to expand to include detailed champion stats, items, and tables with more in-depth data. Whether you're just starting your journey or seeking advanced insights, League Roaster aims to be your ultimate resource for all things League of Legends.
          </p>
          </div>
      </div>
     
      <div className='option-section'>
        <div className='black-gradient-top' />
        <div className='Be-part-of-team-container'>
          <img src="/img/Teamwork.webp" alt="" />
          <h2>Be part of Team</h2>
          <div className="short-line"></div>
          <p>Join millions of players worldwide in League of Legends, the ultimate 5v5 multiplayer battle arena. With over a hundred champions to choose from, each with unique abilities, the strategy is endless. Best of all, it's free to play! Defend your nexus and discover new tactics every game. Choose your role, master it, and dominate the rift.</p>
        </div>
        <div className='Role-container'>

          <div className='role-selection'>
            <div className='role' onClick={() => handleRoleClick('tank')}>
              <img src="/img/galio.jpg" alt="" />
              <div>
                <h3>Tank</h3>
                <img className='icon-role role-icon-size' src="/img/Tank_icon.webp" alt="" />
                <h4>Frontline Protector</h4>
              </div>
        
            </div>
            <div className='role' onClick={() => handleRoleClick('fighter')}>
              <img className='fighter-splash' src="/img/illaoi.jpg" alt="" />
              <div>
                <h3>Fighter</h3>
                <img className='icon-role role-icon-size' src="/img/Fighter_icon.png" alt="" />
                <h4>Relentless Warrior</h4>
              </div>
            </div>
          
            <div className='role ' onClick={() => handleRoleClick('mage')}>
              <img className='mage-splash' src="/img/brand.jpg" alt="" />
              <div>
                <h3>Mage</h3>
                <img className='icon-role role-icon-size' src="/img/Mage_icon.png" alt="" />
                <h4>Sorcery Savant</h4>
              </div>
              
            </div>
            <div className='role' onClick={() => handleRoleClick('assassin')}>
              <img className='assasin-splash' src="/img/zed.jpg" alt="" />
              <div>
                <h3>Assasin</h3>
                <img className='icon-role role-icon-size' src="/img/assasin-icon.png" alt="" />
                <h4>Silence Death</h4>
              </div>
            </div>
            <div className='role' onClick={() => handleRoleClick('marksman')}>
              <img className='marksmen-splash' src="/img/jinx.jpeg" alt="" />
              <div>
                <h3>Marksman</h3>
                <img className='icon-role role-icon-size' src="/img/Marksman_icon.png" alt="" />
                <h4>Projectile Precisionist</h4>
              </div>
            </div>
            <div className='role' onClick={() => handleRoleClick('support')}>
              <img className='support-splash' src="/img/thresh.jpg" alt="" />
              <div>
                <h3>Support</h3>
                <img className='icon-role role-icon-size' src="/img/Support_icon.webp" alt="" />
                <h4>Savior in the Shadows</h4>
              </div>
            </div>
            {selectedRole && <AdditionalRoleInfo role={selectedRole} onClose={handleClose} />} {/* Wyświetl komponent tylko jeśli wybrano rolę */}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default MainPage;
