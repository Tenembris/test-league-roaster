import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

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
      <h1 className=''>AVAILABLE SKINS</h1>
      <Carousel
        showArrows={true}
        selectedItem={currentSlide}
        onChange={(index) => setCurrentSlide(index)}
        infiniteLoop={true}
        
        interval={8000}
        autoPlay={true}
        stopOnHover={true}
        thumbWidth={220}
        animationHandler="fade"
        showIndicators={false}
      swipeable={false}
      >
        
        {skinNums.map((skinNum, index) => (
          <div key={index} className='skin-img-container'>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skinNum}.jpg`}
              alt={`Skin ${index + 1}`}
              className='Hero-skin'
            />
            <h3 className='skin-name'>{skinsData.length > 0 && skinsData[index].name}</h3>
          </div>
        ))}
      </Carousel>

    </div>
  );
};

export default ChampionSkinComponent;
