import React, { useRef, useEffect, useState } from "react";
import "./Cursor.css";

const Cursor = ({ currentCard }) => {
    const [currentSecond, setCurrentSecond] = useState(0);

    const cursorRef = useRef();
    // const [audioStrips, setAudioStrips] = useState();

    useEffect(() => {
        console.log("log");
        let interval;
        setTimeout(() => {
            interval = setInterval(() => {
                setCurrentSecond((prev) => {
                    if (prev < 57) return prev + 1;
                    // if (prev < 60) return 57;
                    else return 0;
                });
            }, 1000);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    console.log(currentSecond);
    cursorRef.current?.style.setProperty("left", `${40 + currentSecond}%`);
    // console.log(currentCard, currentSecond);
    return <div className='cursor' ref={cursorRef}></div>;
};

export default Cursor;
