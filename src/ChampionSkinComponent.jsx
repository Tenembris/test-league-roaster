import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChampionSkinComponent.css';

const ChampionSkinComponent = ({ championName, patchVersion, skinNums }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [skinsData, setSkinsData] = useState([]);

  useEffect(() => {
    const fetchSkinsData = async () => {
      try {
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion/${championName}.json`);
        const championData = response.data.data[championName];
        setSkinsData(championData.skins);
      } catch (error) {
        console.error('Błąd podczas pobierania danych o skórkach:', error);
      }
    };

    if (championName && patchVersion) {
      fetchSkinsData();
    }
  }, [championName, patchVersion]);

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='Skin-Container'>
      <div className="fade-carousel">
        {skinNums.map((skinNum, index) => (
          <div key={index} className={currentSlide === index ? 'active' : 'inactive'}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skinNum}.jpg`}
              alt={`Skin ${index + 1}`}
            />
            <p>{skinsData.length > 0 && skinsData[index].name}</p>
          </div>
        ))}
      </div>
      <h1>{championName}</h1>
      <h2>{patchVersion}</h2>
    </div>
  );
};

export default ChampionSkinComponent;
