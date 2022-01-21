import React, { useEffect, useState, useRef } from "react";
import "./AudioStrip.css";
import { PlayIcon, PauseIcon, VolumeIcon, MuteIcon } from "../../icons/icons";

import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Card from "../Card/Card";

const AudioStrip = ({
    song,
    strips,
    players,
    setPlayers,
    setStrips,
    cards,
    setCards,
}) => {
    const handleMove = (e) => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
        e.target.style.setProperty("--x", `${x}px`);
        e.target.style.setProperty("--y", `${y}%`);
    };

    let songName = song.substring(14).split(".")[0];
    const playerRef = useRef();
    // console.log(strips);
    useEffect(() => {
        // console.log(Math.floor(60 / playerRef.current.getTotalSongTime()));
        setStrips((prev) => {
            return { ...prev, [songName]: playerRef };
        });
    }, []);

    const cardRef = useRef();
    useEffect(() => {
        console.log(songName);
        setCards((prev) => {
            if (cards.songName)
                return { ...prev, [songName]: [...cards?.songName, cardRef] };
            else return { ...prev, [songName]: [cardRef] };
        });
    }, []);
    console.log(cards);
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
                {cards.map((card) => (
                    <Card
                        ref={cardRef}
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
