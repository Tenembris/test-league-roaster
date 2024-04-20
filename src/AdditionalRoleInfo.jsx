import React from 'react';

const AdditionalRoleInfo = ({ role, onClose }) => {
  return (
    <div className="additional-role-info">
      {/* Wyświetlanie informacji o roli */}
      {role === 'tank' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/galio.jpg)', backgroundSize: 'cover' }}>
            
            <div>
              <img className='role-icon-size' src="/img/Tank_icon.webp" alt="" />
              <h1>Tank</h1>
              <p>dsadsdadsdsadsadsdsdsa</p>
            </div>
          </div>
        </>
      )}
      {role === 'support' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/thresh.jpg)', backgroundSize: 'cover' }}>
            
            <div>
            <img className='role-icon-size' src="/img/Support_icon.webp" alt="" />
              <h1>Supoort</h1>
              <p>dsadsdadsdsadsadsdsdsa</p>
            </div>
          </div>
        </>
      )}
      {role === 'mage' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/brand.jpg)', backgroundSize: 'cover' }}>
            
            <div>
            <img className='role-icon-size' src="/img/Mage_icon.png" alt="" />
              <h1>Mage</h1>
              <p>Placeholder description</p>
            </div>
          </div>
        </>
      )}
      {role === 'fighter' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/illaoi.jpg)', backgroundSize: 'cover' }}>
          
            <div>
            <img className='role-icon-size' src="/img/Fighter_icon.png" alt="" />
              <h1>Fighter</h1>
              <p>Placeholder description</p>
            </div>
          </div>
        </>
      )}
      {role === 'marksman' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/jinx.jpeg)', backgroundSize: 'cover' }}>
            
            <div>
            <img className='role-icon-size' src="/img/Marksman_icon.png" alt="" />
              <h1>Marksman</h1>
              <p>Placeholder description</p>
            </div>
          </div>
        </>
      )}
      {role === 'assassin' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/zed.jpg)', backgroundSize: 'cover' }}>
           
            <div>
            <img className='role-icon-size' src="/img/assasin-icon.png" alt="" />
              <h1>Assassin</h1>
              <p>Placeholder description</p>
            </div>
          </div>
        </>
      )}
      
      {/* Przycisk do zamknięcia */}
      <button onClick={onClose}>Close</button>
      {/* Możesz również użyć znaku "X" jako przycisku zamknięcia */}
      {/* <span onClick={onClose} style={{ cursor: 'pointer', fontSize: '24px' }}>×</span> */}
    </div>
  );
};

export default AdditionalRoleInfo;
