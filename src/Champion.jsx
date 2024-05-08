import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import ChampionSkinComponent from './ChampionSkinComponent';
import { motion } from 'framer-motion'; // Importujemy motion z framer-motion
import './index.css';

const Champion = () => {
  const { name } = useParams();
  const location = useLocation();
  const patchVersion = location.state && location.state.patchVersion;

  const [championData, setChampionData] = useState(null);
  const [imageName, setImageName] = useState('');
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [selectedSpellIndex, setSelectedSpellIndex] = useState(0);
  const [abilityVideoLink, setAbilityVideoLink] = useState('');
  const [skinNums, setSkinNums] = useState([]);

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        let imageName = name.replace(/\bWillump\b/g, '').replace(/[^\w\s]/g, '').replace(/\s/g, '');
        imageName = imageName.replace(/[ ']/g, '');

        const exceptions = {
          'KhaZix': 'Khazix',
          'BelVeth': 'Belveth',
          'ChoGath': 'Chogath',
          'Fiddlesticks': 'Fiddlesticks',
          'KaiSa': 'Kaisa',
          'LeBlanc': 'Leblanc',
          'VelKoz': 'Velkoz',
          'RenataGlasc': 'Renata',
          'Wukong': 'MonkeyKing'
        };

        imageName = exceptions[imageName] || imageName;
        setImageName(imageName);
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion/${imageName}.json`);

        setChampionData(response.data.data[imageName]);
        setSelectedSpell(response.data.data[imageName].spells[0]);
        setAbilityVideoLink(generateAbilityVideoLink(response.data.data[imageName].key, 0));
        const skins = response.data.data[imageName].skins;
        const numArray = skins.map(skin => skin.num);
        setSkinNums(numArray);

      } catch (error) {
        console.error('Błąd podczas pobierania danych bohatera:', error);
      }
    };

    if (patchVersion && name) {
      fetchChampionData();
    }
  }, [name, patchVersion]);

  const generateAbilityVideoLink = (championId, spellIndex) => {
    const formattedChampionId = championId.toString().padStart(4, '0');
    let spellName;
    switch (spellIndex) {
      case 0:
        spellName = 'Q';
        break;
      case 1:
        spellName = 'W';
        break;
      case 2:
        spellName = 'E';
        break;
      case 3:
        spellName = 'R';
        break;
      default:
        spellName = 'P'; // P for passive
    }

    return `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${formattedChampionId}/ability_${formattedChampionId}_${spellName}1.webm`;
  };

  const handleSpellClick = (spell, index) => {
    setSelectedSpell(spell);
    setSelectedSpellIndex(index);
    setAbilityVideoLink(generateAbilityVideoLink(championData.key, index));
  };

  const handleImageClick = () => {
    // For passive spell, set selectedSpellIndex to 4
    setSelectedSpellIndex(4);
    setAbilityVideoLink(generateAbilityVideoLink(championData.key, 4)); // 4 for passive
  };

  if (!championData) {
    return <div>Loading...</div>;
  }

  const splashArtName = `${imageName}_0.jpg`;

  const formatDescription = (description) => {
    return description.replace(/<font color='#(\w+)'>/g, (match, color) => `<span style="color: #${color}">`)
                      .replace(/<\/font>/g, '</span>')
                      .replace(/<br>/g, '<br />');
  };

  return (
    <motion.div // Dodajemy motion.div

    >
      <div className='component-parent-container'>
        <div className='Champion-section-Hero' style={{ backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${splashArtName})` }}>
          
          <motion.div       className='component-parent-container'
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.7 }}>

         
          <h1>{championData.name}</h1>
          <h2>{championData.title}</h2>
          </motion.div>
        </div>
      </div>

      <div className='padding'>
        <motion.div       initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.7 }}>
        <div className='champion-information'>
          <div className='stats-box'>
            <h4>
              <span className='golden-span'>
                Role
              </span>
            </h4>
            <h3>
              {championData.tags[0]}
              {championData.tags[1] && ` • ${championData.tags[1]}`}
            </h3>
          </div>
          <div className='stats-spec-info'>
            <ul>
              <li><img src="/img/statmodshealthscalingicon.webp" alt="" /> {championData.stats.hp} + {championData.stats.hpperlevel} per level</li>
              <li><img src="/img/statmodsmagicresicon.webp" alt="" /> {championData.stats.spellblock} + {championData.stats.spellblockperlevel} per level</li>
              <li><img src="/img/StatModsHealthPlusIcon.webp" alt="" /> {championData.stats.hpregen} + {championData.stats.hpregenperlevel} per level</li>
              <li><img src="/img/StatModsArmorIcon.webp" alt="" />{championData.stats.armor} + {championData.stats.armorperlevel} per level</li>
            </ul>
            <ul>
              <li><img src="/img/statmodsattackdamageicon.webp" alt="" /> {championData.stats.attackdamage} + {championData.stats.attackdamageperlevel} per level</li>
              <li><img src="/img/StatModsAttackSpeedIcon.webp" alt="" /> {championData.stats.attackspeed} + {championData.stats.attackspeedperlevel} per level</li>
              <li><img src="/img/range-icon.webp" style={{ padding: '9px' }} alt="" /> {championData.stats.attackrange}</li>
              <li><img src="/img/StatModsMovementSpeedIcon.webp" alt="" /> {championData.stats.movespeed}</li>
            </ul>
          </div>
          
        </div>
        </motion.div>
        <p className='champion-lore'>{championData.lore}</p>

        <h2 className='title-h2'>
          Abilities
        </h2>

        <div className='info-video-container'>
          <div>
            {selectedSpell && (
              <div className="selected-spell-info">
                <h2>{selectedSpell.name}</h2>
                <p>
                  <span dangerouslySetInnerHTML={{ __html: formatDescription(selectedSpell.description) }} />
                </p>
                <p>Cost: {selectedSpell.costBurn || selectedSpell.costBurn === 0 ? selectedSpell.costBurn : 'No cost'}</p>
                <p>Cooldown: {selectedSpell.cooldownBurn || selectedSpell.cooldownBurn === 0 ? selectedSpell.cooldownBurn : '0'}</p>
              </div>
            )}
          </div>

          <div className="additional-ability-videos">
            {abilityVideoLink === null ? (
              <div className="passive-video-placeholder">
                <img src="/img/placeholder.jpeg" alt="Passive Ability Placeholder" />
                <h3>There is no video for this ability</h3>
              </div>
            ) : (
              <video key={selectedSpell.id + (selectedSpellIndex === 4 ? '-passive' : '')} autoPlay={true} loop={true} muted controls={false} onError={() => setAbilityVideoLink(null)}>
                <source src={abilityVideoLink} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        <div className='champion-skills'>
          <div className='skills-container'>
            {championData.spells.map((spell, index) => (
              <div
                key={index}
                className={`spell ${selectedSpellIndex === index ? 'active' : ''}`}
                onClick={() => handleSpellClick(spell, index)}
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${spell.image.full}`}
                  alt={spell.name}
                />
                <div className='spell-details'></div>
              </div>
            ))}
            <div className='short-line-vertical'></div>
            <div
              className={`spell ${selectedSpellIndex === 4 ? 'active' : ''}`}
              onClick={() => handleSpellClick(championData.passive, 4)}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/passive/${championData.passive.image.full}`}
                alt={championData.passive.name}
              />
              <div className='spell-details'></div>
            </div>
          </div>
        </div>

        <div className='champion-tips'>
          <h3>Ally Tips:</h3>
          <ul>
            {championData.allytips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <h3>Enemy Tips:</h3>
          <ul>
            {championData.enemytips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <ChampionSkinComponent championName={championData.id} patchVersion={patchVersion} skinNums={skinNums} />
      </div>
    </motion.div> // Zamykamy motion.div
  );
}

export default Champion;
