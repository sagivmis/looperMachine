import { useState } from "react";
import ControlPanel from "../ControlPanel/ControlPanel";
import Panel from "../Panel/Panel";
import Slider from "../Slider/Slider";
import "./App.css";

function App() {
    const [strips, setStrips] = useState({});
    const [cards, setCards] = useState([
        {
            id: 0,
            active: false,
        },
        {
            id: 1,
            active: false,
        },
        {
            id: 2,
            active: false,
        },
        {
            id: 3,
            active: false,
        },
        {
            id: 4,
            active: false,
        },
        {
            id: 5,
            active: false,
        },
        {
            id: 6,
            active: false,
        },
        {
            id: 7,
            active: false,
        },
        {
            id: 8,
            active: false,
        },
        {
            id: 9,
            active: false,
        },
        {
            id: 10,
            active: false,
        },
        {
            id: 11,
            active: false,
        },
    ]);
    // const [cards, setCards] = useState({});
    // console.log(strips);
    return (
        <div className='App'>
            <Slider />
            <Panel
                setStrips={setStrips}
                strips={strips}
                cards={cards}
                setCards={setCards}
            />
            <ControlPanel strips={strips} />
        </div>
    );
}

export default App;
