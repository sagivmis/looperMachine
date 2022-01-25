import React, { useEffect, useState, useRef, useContext } from "react";
import "./AudioStrip.css";

import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Card from "../Card/Card";
import globalContext from "../../context/globalContext";

const AudioStrip = ({ song, players, setPlayers }) => {
    const {
        strips: [strips, setStrips],
        cards: [cards, setCards],
    } = useContext(globalContext);
    const handleMove = (e) => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
        e.target.style.setProperty("--x", `${x}px`);
        e.target.style.setProperty("--y", `${y}%`);
    };

    const songName = song.substring(14).split(".")[0];
    const playerRef = useRef();
    useEffect(() => {
        setStrips((prev) => {
            return { ...prev, [songName]: playerRef };
        });
        setCards((prev) => {
            if (cards.songName)
                return { ...prev, [songName]: [...cards.songName, cardRef] };
            else return { [songName]: [cardRef] };
        });
    }, []);

    const cardRef = useRef();

    return (
        <div className='audio-strip shiny' onMouseMove={handleMove}>
            <AudioPlayer
                ref={playerRef}
                setPlayers={setPlayers}
                players={players}
                song={song}
                songName={songName}
            />
            <div className='playable-grid'>
                {cards[song]?.map((card) => (
                    <Card
                        strips={strips}
                        songName={songName}
                        card={card}
                        setCards={setCards}
                        cards={cards}
                        key={card.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default AudioStrip;
