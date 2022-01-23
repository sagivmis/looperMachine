import { useState, useEffect } from "react";
import ControlPanel from "../ControlPanel/ControlPanel";
import Panel from "../Panel/Panel";
import "./App.css";
import GlobalContext from "../../context/globalContext";

function App() {
    const strips = useState({});
    const cards = useState([]);
    const songs = useState([
        require("../../loopers/ALLTRACK.mp3"),
        require("../../loopers/B.mp3"),
        require("../../loopers/DRUMS.mp3"),
        require("../../loopers/HEHE.mp3"),
        require("../../loopers/HIGH.mp3"),
        require("../../loopers/JIBRISH.mp3"),
        require("../../loopers/LEAD.mp3"),
        require("../../loopers/tambourine.mp3"),
        require("../../loopers/UUHO.mp3"),
    ]);
    const [generated, setGenerated] = useState(false);
    const [currentCard, setCurrentCard] = useState(0);

    const generateCards = () => {
        if (!generated) {
            let container = [];
            let temp = [];
            for (let i = 0; i < songs[0].length; i++) {
                temp = [];
                for (let j = 0; j < 12; j++) {
                    temp.push({
                        id: i * 12 + j,
                        songName: songs[0][i],
                        ref: null,
                        content: i * 12 + j,
                        active: false,
                    });
                }
                container[songs[0][i]] = temp;
            }
            cards[1](container);
        }
        setGenerated(true);
    };
    const checkIfCurrentCardIsActive = () => {
        let activeCards = Object.values(cards[0]).map((strip, stripIndex) => {
            return strip[currentCard].active;
        });
        Object.values(strips[0]).forEach((songRef, index) => {
            if (activeCards[index]) songRef.current.play();
        });
    };

    useEffect(() => {
        generateCards();
    }, [songs]);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(`Current card: ${currentCard}`);
            setCurrentCard((prev) => {
                if (prev < 11) return prev + 1;
                else return 0;
            });
            checkIfCurrentCardIsActive();
        }, 5000);
        return () => clearInterval(interval);
    }, [cards]);

    return (
        <GlobalContext.Provider value={{ cards, strips, songs, currentCard }}>
            <div className='App'>
                <Panel currentCard={currentCard} />
                <ControlPanel strips={strips[0]} />
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
