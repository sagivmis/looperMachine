import React, { useState, useEffect, useRef } from "react";
import AudioStrip from "../AudioStrip/AudioStrip";
import Button from "../../components/Button/Button";
import "./Panel.css";

const playbacks = [
    require("../../loopers/ALLTRACK.mp3"),
    require("../../loopers/B.mp3"),
    require("../../loopers/DRUMS.mp3"),
    require("../../loopers/HEHE.mp3"),
    require("../../loopers/HIGH.mp3"),
    require("../../loopers/JIBRISH.mp3"),
    require("../../loopers/LEAD.mp3"),
    require("../../loopers/tambourine.mp3"),
    require("../../loopers/UUHO.mp3"),
];

const Panel = ({ strips, setStrips, cards, setCards }) => {
    const [players, setPlayers] = useState({});
    // const [audioStrips, setAudioStrips] = useState();
    const [songNames, setSongNames] = useState(
        playbacks.map((song) => {
            return song.substring(14).split(".")[0];
        })
    );
    // console.log(strips);
    const playAllActiveCards = () => {};
    // useEffect(() => {
    //     setAudioStrips(
    //         playbacks.map((pb, index) => (
    //             <AudioStrip
    //                 strips={strips}
    //                 setStrips={setStrips}
    //                 key={index}
    //                 song={pb}
    //                 id={index}
    //                 name={songNames[index]}
    //                 players={players}
    //                 setPlayers={setPlayers}
    //             />
    //         ))
    //     );
    // }, []);
    return (
        <div className='panel-container'>
            <div className='panel'>
                {playbacks.map((pb, index) => (
                    <AudioStrip
                        cards={cards}
                        setCards={setCards}
                        strips={strips}
                        setStrips={setStrips}
                        key={index}
                        song={pb}
                        id={index}
                        name={songNames[index]}
                        players={players}
                        setPlayers={setPlayers}
                    />
                ))}
            </div>
            <Button
                content={"hi"}
                onClick={() => {
                    playAllActiveCards();
                }}
            />
        </div>
    );
};

export default Panel;
