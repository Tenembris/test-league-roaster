import React, { useState, useEffect } from 'react';
import './runes.css'; // Załóżmy, że 'runes.css' zawiera Twoje style CSS
import { motion } from 'framer-motion';


const RunesComponent = () => {
    // Stan przechowujący dane run z API
    const [selectedFirstSet, setSelectedFirstSet] = useState([]);
    const [selectedSecondSet, setSelectedSecondSet] = useState([]);
    const [selectedThirdSet, setSelectedThirdSet] = useState([]);
    const [selectedFourthSet, setSelectedFourthSet] = useState([]);
    const [selectedRuneDesc, setSelectedRuneDesc] = useState("");
    const [selectedRuneName, setSelectedRuneName] = useState("");
    const [selectedRuneId, setSelectedRuneId] = useState(null); // Id aktywnej runy
    const [isActiveItem, setIsActiveItem] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(''); 

    // Funkcja pobierająca dane run z API dla danej kategorii
    const fetchRunesData = async (category) => {
        try {
            const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/runesReforged.json');
            const data = await response.json();
            const selectedCategory = data.find(cat => cat.key === category);
            if (selectedCategory && selectedCategory.slots.length > 3) {
                const runesFirstSet = selectedCategory.slots[0].runes.map(rune => {
                    const iconUrl = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
                    console.log(iconUrl); // Loguj URL ikony
                    return {
                        id: rune.id,
                        name: rune.name,
                        icon: iconUrl,
                        longDesc: formatDescription(rune.longDesc) // Formatuj opis
                    };
                });
                setSelectedFirstSet(runesFirstSet);

                const runesSecondSet = selectedCategory.slots[1].runes.map(rune => {
                    const iconUrl = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
                    console.log(iconUrl); // Loguj URL ikony
                    return {
                        id: rune.id,
                        name: rune.name,
                        icon: iconUrl,
                        longDesc: formatDescription(rune.longDesc) // Formatuj opis
                    };
                });
                setSelectedSecondSet(runesSecondSet);

                const runesThirdSet = selectedCategory.slots[2].runes.map(rune => {
                    const iconUrl = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
                    console.log(iconUrl); // Loguj URL ikony
                    return {
                        id: rune.id,
                        name: rune.name,
                        icon: iconUrl,
                        longDesc: formatDescription(rune.longDesc) // Formatuj opis
                    };
                });
                setSelectedThirdSet(runesThirdSet);

                const runesFourthSet = selectedCategory.slots[3].runes.map(rune => {
                    const iconUrl = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
                    console.log(iconUrl); // Loguj URL ikony
                    return {
                        id: rune.id,
                        name: rune.name,
                        icon: iconUrl,
                        longDesc: formatDescription(rune.longDesc) // Formatuj opis
                    };
                });
                setSelectedFourthSet(runesFourthSet);
            } else {
                setSelectedFirstSet([]);
                setSelectedSecondSet([]);
                setSelectedThirdSet([]);
                setSelectedFourthSet([]);
            }
        } catch (error) {
            console.error('Błąd pobierania danych run:', error);
        }
    };

    // Funkcja obsługująca kliknięcie na obrazek kategorii
    const handleClick = (category) => {
        // Pobierz dane run dla klikniętej kategorii
        fetchRunesData(category);
        setIsActiveItem(true);
        setSelectedCategory(category);
        
        console.log(category)
        
    };

    // Funkcja obsługująca kliknięcie na element runy
    const handleRuneClick = (longDesc, name, id) => {
        setSelectedRuneDesc(longDesc);
        setSelectedRuneName(name);
        setSelectedRuneId(id); // Ustaw id aktywnej runy
    };

    // Funkcja formatująca opis runy
    const formatDescription = (description) => {
        return description.replace(/<font color='#(\w+)'>/g, (match, color) => `<span style="color: #${color}">`)
                          .replace(/<\/font>/g, '</span>')
                          .replace(/<br>/g, '<br />')
                          .replace(/<lol-uikit-tooltipped-keyword key='([^']+)'>/g, (match, keyword) => `<strong>${keyword}</strong>`)
                          .replace(/<\/lol-uikit-tooltipped-keyword>/g, '');
    };

    // Funkcja określająca, czy dana runa jest aktywna
    const isActiveRune = (id) => {
        
        return selectedRuneId === id ? 'active' : '';
    };

    return (
        <div className='main-runes-container'>
            <div className='z-index-container'>
            <div className={`runes-info ${isActiveItem ? 'activeInfo' : ''}`}>

                    {/* Pokaż pierwszy zestaw run */}
                    <div className="runes-grid">
                        {selectedFirstSet.map((rune) => (
                            <div key={rune.id} className={`rune-item key-runes ${isActiveRune(rune.id)}`} onClick={() => handleRuneClick(rune.longDesc, rune.name, rune.id)}>
                                <img src={rune.icon} alt={rune.name} />
                                {/* <p>{rune.name}</p> */}
                            </div>
                        ))}
                    </div>
                    {/* Pokaż drugi zestaw run */}
                    <div className="runes-grid">
                        {selectedSecondSet.map((rune) => (
                            <div key={rune.id} className={`rune-item perk-runes firstRow ${isActiveRune(rune.id)}`} onClick={() => handleRuneClick(rune.longDesc, rune.name, rune.id)}>
                                <img src={rune.icon} alt={rune.name} />
                                {/* <p>{rune.name}</p> */}
                            </div>
                        ))}
                    </div>
                    {/* Pokaż trzeci zestaw run */}
                    <div className="runes-grid">
                        {selectedThirdSet.map((rune) => (
                            <div key={rune.id} className={`rune-item perk-runes secondRow ${isActiveRune(rune.id)}`} onClick={() => handleRuneClick(rune.longDesc, rune.name, rune.id)}>
                                <img src={rune.icon} alt={rune.name} />
                                {/* <p>{rune.name}</p> */}
                            </div>
                        ))}
                    </div>
                    {/* Pokaż czwarty zestaw run */}
                    <div className="runes-grid">
                        {selectedFourthSet.map((rune) => (
                            <div key={rune.id} className={`rune-item perk-runes thirdRow ${isActiveRune(rune.id)}`} onClick={() => handleRuneClick(rune.longDesc, rune.name, rune.id)}>
                                <img src={rune.icon} alt={rune.name} />
                                {/* <p>{rune.name}</p> */}
                            </div>
                        ))}
                    </div>
                    {/* Pokaż opis wybranej runy */}
                    <div className={`runes-data ${ selectedRuneId ? 'runes-data-active' : ''}`}>
                        <h2>{selectedRuneName}</h2>
                        <p dangerouslySetInnerHTML={{ __html: selectedRuneDesc }}></p>
                    </div>
                </div>

                <motion.div 
                        initial={{ y: 300, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -300, opacity: 0 }}
                        transition={{ duration: 1 }}
                >
                <div className={`Title ${isActiveItem ? 'title-hidden' : ''}`}>

                    <h1>RUNES</h1>
                    <h2>Runes are enhancements that give champions the ability to customize their playstyle.</h2>
                </div>
                </motion.div>


                
                <div className='runes-revolver'>
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src="/img/domination.png"
                    alt=""
                    onClick={() => handleClick('Domination')}
                    style={{ 
                        filter: selectedCategory === 'Domination' ? 'drop-shadow(5px 5px 15px red)' : 'none',
                        transform: selectedCategory === 'Domination' ? 'scale(1.2)' : ''
                    }}
                />
            </motion.div>
                    
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5 , delay: 0.1}}
            >
                <img
                    src="/img/precision.png"
                    alt=""
                    onClick={() => handleClick('Precision')}
                    style={{ filter: selectedCategory === 'Precision' ? 'drop-shadow(5px 5px 15px yellow)' : 'none', 
                    transform: selectedCategory === 'Precision' ? 'scale(1.2)' : ''
                     }}
                />
            </motion.div>
                    
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5 , delay: 0.2}}
            >
                <img
                    src="/img/sorcery.png"
                    alt=""
                    onClick={() => handleClick('Sorcery')}
                    style={{ filter: selectedCategory === 'Sorcery' ? 'drop-shadow(5px 5px 15px blue)' : 'none' ,
                    transform: selectedCategory === 'Sorcery' ? 'scale(1.2)' : ''}}
                   
                />
            </motion.div>
                    
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5 , delay: 0.3}}
            >
                <img
                    src="/img/resolve.png"
                    alt=""
                    onClick={() => handleClick('Resolve')}
                    style={{ filter: selectedCategory === 'Resolve' ? 'drop-shadow(5px 5px 15px green)' : 'none',
                    transform: selectedCategory === 'Resolve' ? 'scale(1.2)' : '' }}
                    
                />
            </motion.div>
                    
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5 , delay: 0.4}}
            >
                <img
                    src="/img/inspirations.png"
                    alt=""
                    onClick={() => handleClick('Inspiration')}
                    style={{ filter: selectedCategory === 'Inspiration' ? 'drop-shadow(5px 5px 15px purple)' : 'none',
                    transform: selectedCategory === 'Inspiration' ? 'scale(1.2)' : ''
                     }}
                />
            </motion.div>
        </div>
            </div>
        </div>
    );
};

export default RunesComponent;
