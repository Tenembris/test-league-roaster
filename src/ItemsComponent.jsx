import React, { useState, useEffect } from 'react';
import './ItemsComponent.css';

const ItemsComponent = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/item.json');
        const data = await response.json();
        const itemData = data.data;
        const processedItems = Object.keys(itemData)
          .filter(key => {
            const item = itemData[key];
            return (
              (item.maps["11"] || item.maps["12"]) && // Przejmujemy się tylko elementami, które mają 11 lub 12, ale...
              (item.inStore === undefined || item.inStore !== false || item.depth !== undefined && item.depth !== false) // ...i których inStore nie jest false lub undefined
              // ...i które posiadają właściwość depth
            );
          })
          .map(key => ({
            id: key,
            name: itemData[key].name,
            imageUrl: `https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${itemData[key].image.full}`,
            description: itemData[key].description,
            gold: itemData[key].gold,
            stats: itemData[key].stats,
            from: itemData[key].from || [],
            into: itemData[key].into || [],
            baseGold: itemData[key].gold.base,
            depth: itemData[key].depth || 0,
            Ornn: itemData[key].requiredAlly // Dodajemy głębokość elementu, jeśli istnieje
          }));
        setItems(processedItems);

        // Ustawiamy pierwszy element jako domyślnie wybrany
        if (processedItems.length > 0) {
          setSelectedItem(processedItems[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

    const formatDescription = (description) => {
    return description.replace(/<font color='#(\w+)'>/g, (match, color) => `<span style="color: #${color}">`)
                      .replace(/<\/font>/g, '</span>')
                      .replace(/<br>/g, '<br />');
  };


  // Funkcja do obsługi kliknięcia na element
  const handleItemClick = (itemId) => {
    const selectedItem = items.find(item => item.id === itemId);
    setSelectedItem(selectedItem);
  };

  // Funkcja do filtrowania elementów na podstawie tekstu wyszukiwania
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchText) || // Wyszukiwanie po nazwie
    (item.colloq && item.colloq.toLowerCase().includes(searchText)) // Wyszukiwanie po polu colloq
  );

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  // Grupowanie przedmiotów w zależności od głębokości
  const groupedItems = {
    basic: filteredItems.filter(item => item.depth === 1),
    epic: filteredItems.filter(item => item.depth === 2),
    legendary: filteredItems.filter(item => item.depth === 3),
    starter: filteredItems.filter(item => item.depth === 0),
    other: filteredItems.filter(item => item.depth > 3),
  };

  

  return (
    <div className="items-container">
      <div className='items-tool-component'>
        <div className="search-box">
          <input type="text" placeholder="Search..." value={searchText} onChange={handleSearchTextChange} />
        </div>
        <div className="items-wrapper">
        {/* <h4>Basic</h4>
          <div className="basic-items item-group">
            {groupedItems.basic.length > 0 && (
              <>
                
                {groupedItems.basic.map((item, index) => (
                  <div key={index} className="item" onClick={() => handleItemClick(item.id)}>
                    <img src={item.imageUrl} alt={item.name} />
                    <span>{item.gold.total}</span>
                  </div>
                ))}
              </>
            )}
          </div> */}
                   <h4>Starter</h4>
          <div className="starter-items item-group">
            {groupedItems.starter.length > 0 && (
              <>
                
                {groupedItems.starter.map((item, index) => (
                  <div key={index} className="item" onClick={() => handleItemClick(item.id)}>
                    <img src={item.imageUrl} alt={item.name} />
                    <span>{item.gold.total}</span>
                  </div>
                ))}
              </>
            )}
          </div>
          <h4>Epic</h4>
          <div className="epic-items item-group">
            {groupedItems.epic.length > 0 && (
              <>
                
                {groupedItems.epic.map((item, index) => (
                  <div key={index} className="item" onClick={() => handleItemClick(item.id)}>
                    <img src={item.imageUrl} alt={item.name} />
                    <span>{item.gold.total}</span>
                  </div>
                ))}
              </>
            )}
          </div>
          
          <h4>Legendary</h4>
          <div className="legendary-items item-group">
            {groupedItems.legendary.length > 0 && (
              <>
                
                {groupedItems.legendary.map((item, index) => (
                  <div key={index} className="item" onClick={() => handleItemClick(item.id)}>
                     <img src={item.imageUrl} alt={item.name} style={item.Ornn === "Ornn" ? { filter: 'sepia(100%) saturate(1000%) hue-rotate(30deg)' } : null} />
                    <span>{item.gold.total}</span>
                    
                  </div>
                ))}
              </>
            )}
          </div>
 
          <h4>Other</h4>
          {groupedItems.other.length > 0 && (
            <div className="other-items item-group">
              
              {groupedItems.other.map((item, index) => (
                <div key={index} className="item" onClick={() => handleItemClick(item.id)}>
                  <img src={item.imageUrl} alt={item.name} style={item.Ornn === 'Ornn' ? { filter: 'sepia(100%) saturate(500%) hue-rotate(30deg)' } : null}  />
                  <span>{item.gold.total}</span>
                 
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedItem && (
        <div className='item-description'>
            <h3>Into:</h3>
            <div className="related-items-wrapper">
              {selectedItem.into.map((itemId, index) => (
                <div key={index} className="related-item" onClick={() => handleItemClick(itemId)}>
                  <img src={items.find(item => item.id === itemId)?.imageUrl} alt={items.find(item => item.id === itemId)?.name} />
                </div>
              ))}
            </div>

            <div className='description-img-gold-name'>
              <img src={selectedItem.imageUrl} alt={selectedItem.name} />
              <div>
                <h2>{selectedItem.name}</h2>
                <h4>{selectedItem.gold.total} g</h4>
                
              </div>
            </div>

          
          
          <p>Stats:</p>
        
          <span dangerouslySetInnerHTML={{ __html: formatDescription(selectedItem.description) }} />
          <div className="related-items recepie-position">
            <h3>From:</h3>
            <div className='recipe-container '>
              <div className="related-items-wrapper">
                {selectedItem.from.map((itemId, index) => {
                  const fromItem = items.find(item => item.id === itemId);
                  return (
                    <div key={index} className="related-item" onClick={() => handleItemClick(itemId)}>
                      <img src={fromItem?.imageUrl} alt={fromItem?.name} style={items.requiredAlly === 'Ornn' ? { filter: 'sepia(100%) saturate(1000%) hue-rotate(30deg)' } : null}  />
                    </div>
                  );
                })}
              </div>
              {selectedItem.from.length > 0 && selectedItem.from.every(itemId => items.find(item => item.id === itemId)?.imageUrl) && (
                <span>+</span>
              )}
              <h2>{selectedItem.gold.base}g</h2>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default ItemsComponent;
