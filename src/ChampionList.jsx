import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChampionList = ({ champions, patchVersion }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [loadedImages, setLoadedImages] = useState([]);

  const navigate = useNavigate();

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChampionClick = (championName) => {
    navigate(`/champion/${championName}`, { state: { patchVersion } });
  };

  useEffect(() => {
    // Preload images
    const preloadedImages = champions.map(champion => {
      const img = new Image();
      img.src = champion.image;
      img.onload = () => {
        setLoadedImages(prevState => [...prevState, champion.image]);
      };
      return img;
    });

    return () => {
      // Clean up
      preloadedImages.forEach(img => img.onload = null);
    };
  }, [champions]);

  const filteredChampions = champions.filter(champion => {
    const tagMatch = !selectedTag || champion.tags.includes(selectedTag);
    const nameMatch = champion.name.toLowerCase().includes(searchText.toLowerCase());
    return tagMatch && nameMatch;
  });

  return (
    <div className="champion-list">
      <div className='filter-options'>
        <div className="filter-buttons">
          <button
            onClick={() => handleTagSelect(null)}
            style={{
              borderBottom: selectedTag === null ? '2px solid #D0A85C' : 'none',
              opacity: selectedTag === null ? 1 : 0.5
            }}
          >
            All
          </button>
          {['Fighter', 'Tank', 'Mage', 'Assassin', 'Support', 'Marksman'].map(tag => (
            <button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              style={{
                borderBottom: selectedTag === tag ? '2px solid #D0A85C' : 'none',
                opacity: selectedTag === tag ? 1 : 0.5
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search..." value={searchText} onChange={handleSearchTextChange} />
        </div>
      </div>
      <div className='champion-grid fade-in'>
        {filteredChampions.map((champion, index) => (
          <div key={champion.name} className="champion-item-wrapper" onClick={() => handleChampionClick(champion.name)}>
            {loadedImages.includes(champion.image) ? (
              <img src={champion.image} alt={champion.name} className='champion-image' />
            ) : (
              <div className='placeholder-image' style={{ width: '100%', height: '100%' }} />
            )}
            <div className='champion-info-min'>
              <span className='championName'>{champion.name}</span>
              {champion.tags.length > 0 && (
                <span className='championTag'> {champion.tags[0]}
                {champion.tags[1] && ` • ${champion.tags[1]}`}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionList;
