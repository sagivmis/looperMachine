import React, { useState, useEffect, useRef } from "react";
import "./Card.css";

const Card = ({ card, cards, setCards, songName, strips }) => {
    const [cardClass, setCardClass] = useState("card");

    const handleCardClick = (id) => {
        setCards(
            cards.map((card) => {
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
            })
        );
        // console.log(cards);
        console.log(strips);
        Object.values(strips).forEach((player) => {});

        cards.forEach((card) => {});
    };

    return (
        <div>
            <div
                key={card.id}
                className={cardClass}
                onClick={() => {
                    handleCardClick(card.id);
                }}
            ></div>
        </div>
    );
};

export default Card;
