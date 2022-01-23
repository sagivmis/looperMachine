import React, { useState, useEffect, useRef, useContext } from "react";
import "./Card.css";
import globalContext from "../../context/globalContext";

const Card = ({ card, songName }) => {
    const [cardClass, setCardClass] = useState("card");
    const {
        strips: [strips, setStrips],
        cards: [cards, setCards],
        songs: [songNames, setSongNames],
    } = useContext(globalContext);

    const getSongFullName = () => {
        return songNames.filter((name) => name.includes(songName))[0];
    };

    const getAudioStrip = (name) => {
        return Object.values(cards).filter(
            (card) => card[0].songName === getSongFullName()
        )[0];
    };
    const handleCardClick = (id) => {
        getAudioStrip().forEach((card) => {
            if (card.id === id) {
                card.active = !card.active;
                console.log(
                    `#${id} and the card: #${card.id}:${
                        card.active ? "ACTIVE" : "NOT ACTIVE"
                    }`
                );
                if (card.active) setCardClass("card active-card");
                else setCardClass("card");
            }
            return card;
        });
    };

    return (
        <div>
            <div
                className={cardClass}
                onClick={() => {
                    handleCardClick(card.id);
                }}
            >
                {card.content}
            </div>
        </div>
    );
};

export default Card;
