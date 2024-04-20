import React, { useState } from 'react';
import AdditionalRoleInfo from './AdditionalRoleInfo'; // Importuj komponent

const MainPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [clickedImage, setClickedImage] = useState(null); // Dodaj stan dla klikniętego obrazka

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setClickedImage(role); // Ustawia stan na nazwę klikniętej roli
  };

  const handleClose = () => {
    setSelectedRole(null); // Usuwa wybraną rolę
    setClickedImage(null); // Resetuje stan klikniętego obrazka
  };

  return (
    <>
      <div className='hero-section'>
        <video className='video-hero' src="/img/hd-roaster-converted.webm" autoPlay muted loop preload='auto' />
        <h1>Welcome to League Roaster</h1>
        <div className='black-gradient' />
      </div>
      <div className='option-section'>
        <div className='black-gradient-top' />
        <div className='Role-container'>
          <div className='Role-title-div'>
            <h1>Choose Your Role</h1>
            <h3>Be part of Team</h3>
          </div>
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
