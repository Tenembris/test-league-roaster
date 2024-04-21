import React from 'react';
import { Link } from 'react-router-dom';

const AdditionalRoleInfo = ({ role, onClose }) => {
  return (
    <div className={`additional-role-info ${role ? 'show' : ''}`}>
      {/* Wyświetlanie informacji o roli */}
      {role === 'tank' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/galio.jpg)', backgroundSize: 'cover' }}>
            <div className='role-card-info'>
              <img className='role-icon-size' src="/img/Tank_icon.webp" alt="" />
              <h1>Tank</h1>
              <h5>Frontline Protector</h5>
              <p>As a tank, your goal is to become the shield for your team, absorbing damage and provoking enemies so your allies can deal damage without hindrance. Your fearless presence on the frontline helps maintain stability and enables victory for your team.</p>
              <h6>Traits</h6>
              <ul className='ul-role-info'>
                <li>Endurance</li>
                <li>Crowd Control</li>
                <li>Disruption</li>
                <li>
                  <Link to="/champions">
                    <button>Discover Tanks</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      {role === 'support' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/thresh.jpg)', backgroundSize: 'cover' }}>
            <div className='role-card-info'>
              <img className='role-icon-size' src="/img/Support_icon.webp" alt="" />
              <h1>Support</h1>
              <h5>Guardian of Allies</h5>
              <p>Support champions provide crucial assistance to their team by offering protection, healing, crowd control, and utility. They excel at helping their allies survive and thrive during battles.</p>
              <h6>Traits</h6>
              <ul className='ul-role-info'>
                <li>Utility</li>
                <li>Protection</li>
                <li>
                <Link to="/champions">
                <button>Discover Supports</button>
              </Link>
                </li>
              </ul>
              
            </div>
          </div>
        </>
      )}
      {role === 'mage' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/brand.jpg)', backgroundSize: 'cover' }}>
            <div className='role-card-info'>
              <img className='role-icon-size' src="/img/Mage_icon.png" alt="" />
              <h1>Mage</h1>
              <h5>Master of Arcane Arts</h5>
              <p>Mages harness the power of magic to unleash devastating spells upon their enemies. They excel at dealing high burst damage and controlling the battlefield with powerful crowd control abilities.</p>
              <h6>Traits</h6>
              <ul className='ul-role-info'>
                <li>High Burst Damage</li>
                <li>Crowd Control</li>
                <li>
                <Link to="/champions">
                <button>Discover Mages</button>
              </Link>
                </li>
              </ul>
              
            </div>
          </div>
        </>
      )}
      {role === 'fighter' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/illaoi.jpg)', backgroundSize: 'cover' }}>
            <div className='role-card-info'>
              <img className='role-icon-size' src="/img/Fighter_icon.png" alt="" />
              <h1>Fighter</h1>
              <h5>Unyielding Warrior</h5>
              <p>Fighters are versatile combatants who excel at both dealing and taking damage. They are durable and possess strong sustained damage output, making them formidable opponents in prolonged engagements.</p>
              <h6>Traits</h6>
              <ul className='ul-role-info'>
                <li>Durability</li>
                <li>Sustained Damage</li>
                <li>
                <Link to="/champions">
                <button>Discover Fighters</button>
              </Link>
                </li>
              </ul>
              
            </div>
          </div>
        </>
      )}
      {role === 'marksman' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/jinx.jpeg)', backgroundSize: 'cover' }}>
            <div className='role-card-info'>
              <img className='role-icon-size' src="/img/Marksman_icon.png" alt="" />
              <h1>Marksman</h1>
              <h5>Ranged Sharpshooter</h5>
              <p>Marksman champions specialize in dealing consistent ranged damage from a safe distance. They are crucial for taking down objectives and shredding enemy champions during team fights.</p>
              <h6>Traits</h6>
              <ul className='ul-role-info'>
                <li>Ranged Damage</li>
                <li>Objective Control</li>
                <li><Link to="/champions">
                <button>Discover Marksmen</button>
              </Link></li>
              </ul>
             
            </div>
          </div>
        </>
      )}
      {role === 'assassin' && (
        <>
          <div className='wrapper-role-info' style={{ backgroundImage: 'url(/img/zed.jpg)', backgroundSize: 'cover' }}>
            <div className='role-card-info'>
              <img className='role-icon-size' src="/img/assasin-icon.png" alt="" />
              <h1>Assassin</h1>
              <h5>Stealthy Killer</h5>
              <p>Assassins specialize in swiftly eliminating high-priority targets with precision and finesse. They excel at finding and exploiting weaknesses in enemy lines, making them deadly threats to unsuspecting foes.</p>
              <h6>Traits</h6>
              <ul className='ul-role-info'>
                <li>Burst Damage</li>
                <li>Mobility</li>
                <li>
                <Link to="/champions">
                <button>Discover Assassins</button>
              </Link>
                </li>
              </ul>
             
            </div>
          </div>
        </>
      )}
      {/* Przycisk do zamknięcia */}
      <button onClick={onClose}>✕</button>
      {/* Możesz również użyć znaku "X" jako przycisku zamknięcia */}
      {/* <span onClick={onClose} style={{ cursor: 'pointer', fontSize: '24px' }}>×</span> */}
    </div>
  );
};

export default AdditionalRoleInfo;
