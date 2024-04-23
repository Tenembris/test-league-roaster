import React from 'react';

const ChampionSkinComponent = ({ championName, patchVersion, skinNums }) => {
  return (
    <div className='Skin-Container'>
      <h1>{championName}</h1>
      <h2>{patchVersion}</h2>
      {skinNums.map((skinNum, index) => (
        <img
          key={index}
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skinNum}.jpg`}
          alt={`Skin ${index}`}
        />
      ))}
    </div>
  );
};

export default ChampionSkinComponent;
