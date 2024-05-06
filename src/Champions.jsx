import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChampionList from './ChampionList';
import { motion } from 'framer-motion';

const Champions = () => {
  const [currentPatch, setCurrentPatch] = useState(null);
  const [champions, setChampions] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [imageCache, setImageCache] = useState({});
  const [animationInProgress, setAnimationInProgress] = useState(true);

  useEffect(() => {
    axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => {
        const currentPatchVersion = response.data[0];
        setCurrentPatch(currentPatchVersion);

        axios.get(`https://ddragon.leagueoflegends.com/cdn/${currentPatchVersion}/data/en_US/champion.json`)
          .then(response => {
            const championData = response.data.data;

            const champions = Object.keys(championData).map(championKey => {
              const imageName = getChampionImageName(championData[championKey].name);
              const cachedImage = imageCache[imageName];
              const imageUrl = cachedImage ? cachedImage : `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${imageName}_0.jpg`;

              if (!cachedImage) {
                setImageCache(prevCache => ({
                  ...prevCache,
                  [imageName]: imageUrl
                }));
              }

              return {
                name: championData[championKey].name,
                image: imageUrl,
                tags: championData[championKey].tags
              };
            });

            setChampions(champions);
            setAnimationInProgress(false);
          })
          .catch(error => {
            console.error('Wystąpił błąd podczas pobierania danych o postaciach:', error);
          });
      })
      .catch(error => {
        console.error('Wystąpił błąd podczas pobierania numeru patcha:', error);
      });
  }, []);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const filteredChampions = selectedTag
    ? champions.filter(champion => champion.tags.includes(selectedTag))
    : champions;

  return (
    <>
      <motion.div
        className='component-parent-container'
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className='Component-title-container'>
          <h1>CHAMPIONS</h1>
          <p>Explore over 140 diverse champions, each with their own distinct playstyle and abilities in League of Legends. Whether you favor cunning mages, mighty warriors, or agile assassins, unleash their powers and strive for victory on the battlefield.</p>
          <h2>{currentPatch}</h2>
        </div>
        <ChampionList champions={filteredChampions} patchVersion={currentPatch} />
        <div></div>
      </motion.div>
    </>
  );
};

const getChampionImageName = (championName) => {
  let imageName = championName.replace(/\bWillump\b/g, '').replace(/[^\w\s]/g, '').replace(/\s/g, '');
  imageName = imageName.replace(/[ ']/g, '');

  const exceptions = {
    'KhaZix': 'Khazix',
    'BelVeth': 'Belveth',
    'ChoGath': 'Chogath',
    'Fiddlesticks': 'FiddleSticks',
    'KaiSa': 'Kaisa',
    'LeBlanc': 'Leblanc',
    'VelKoz': 'Velkoz',
    'RenataGlasc': 'Renata',
    'Wukong': 'MonkeyKing'
  };

  return exceptions[imageName] || imageName;
};

export default Champions;
