import React, { useState, useEffect, useRef, useContext } from "react";
import AudioStrip from "../AudioStrip/AudioStrip";
import Button from "../../components/Button/Button";
import "./Panel.css";
import globalContext from "../../context/globalContext";
import Cursor from "../Cursor/Cursor";

const Panel = ({ currentCard }) => {
    const {
        strips: [strips, setStrips],
        cards: [cards, setCards],
        songs: [songNames],
    } = useContext(globalContext);
    const [players, setPlayers] = useState({});

    return (
        <div className='panel-container'>
            <div className='panel'>
                <Cursor currentCard={currentCard} />
                {songNames &&
                    songNames.map((song, index) => (
                        <AudioStrip
                            cards={cards}
                            setCards={setCards}
                            strips={strips}
                            setStrips={setStrips}
                            key={index}
                            song={song}
                            id={index}
                            name={songNames[index]}
                            players={players}
                            setPlayers={setPlayers}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Panel;
