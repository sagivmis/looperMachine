import React, { useRef, useEffect, useState } from "react";
import "./Cursor.css";

const Cursor = ({ currentCard }) => {
    const [currentSecond, setCurrentSecond] = useState(0);
    const [startPercent, setStartPercent] = useState(40);
    const cursorRef = useRef();
    // const [audioStrips, setAudioStrips] = useState();

    const handleResize = () => {
        var width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;

        if (width < 1300 || width > 1000)
            setStartPercent((prev) => {
                return 47;
            });

        if (width < 1000 || width > 900)
            setStartPercent((prev) => {
                return 44;
            });

        if (width < 900 || window.width < 900)
            setStartPercent((prev) => {
                return 5;
            });
    };
    useEffect(() => {
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

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    cursorRef.current?.style.setProperty(
        "left",
        `${startPercent + currentSecond}%`
    );
    // console.log(currentCard, currentSecond);
    return <div className='cursor' ref={cursorRef}></div>;
};

export default Cursor;
