import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import Button from "../Button/Button";
import "./AudioPlayer.css";

const AudioPlayer = React.forwardRef(
    ({ players, setPlayers, songName, song }, ref) => {
        useImperativeHandle(ref, () => ({
            toggle() {
                togglePlayPause();
            },
            play() {
                playSound();
                changeRange();
                getVals();
            },
            stop() {
                stopSound();
                changeRange();
                getVals();
            },
            isPlaying() {
                return isPlaying;
            },
            loop() {
                setLoop(true);
                setLoopClass("control-btn active");
            },
            unloop() {
                setLoop(false);
                setLoopClass("control-btn");
            },
            mute() {
                audioPlayer.current.muted = true;
                setMuteClass("control-btn active");
            },
            unmute() {
                audioPlayer.current.muted = false;
                setMuteClass("control-btn");
            },
            deductFromEnd(number) {
                setSlideEndValue((slideEndValue) => slideEndValue - number);
                changeRange();
                getVals();
            },
            getTotalSongTime() {
                return (
                    endProgressBarThumb.current.value -
                    startProgressBarThumb.current.value
                );
            },
        }));
        const [isPlaying, setIsPlaying] = useState(false);

        // state
        const [duration, setDuration] = useState();
        const [currentTime, setCurrentTime] = useState(0);
        const [slideStartValue, setSlideStartValue] = useState(0);
        const [slideEndValue, setSlideEndValue] = useState(17);
        const [slideCurrentValue, setSlideCurrentValue] = useState(1);
        const [loop, setLoop] = useState(false);
        const [mute, setMute] = useState(false);

        const [loopClass, setLoopClass] = useState("control-btn");
        const [muteClass, setMuteClass] = useState("control-btn");

        // references
        const audioPlayer = useRef(); // reference our audio component
        const startProgressBarThumb = useRef(); // reference our progress bar
        const currentProgressBarThumb = useRef(); // reference our progress bar
        const endProgressBarThumb = useRef(); // reference our progress bar
        const animationRef = useRef(); // reference the animation

        const audioContainer = useRef(); // reference the animation

        const calculateTime = (secs) => {
            const minutes = Math.floor(secs / 60);
            const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${returnedMinutes}:${returnedSeconds}`;
        };

        const playSound = () => {
            setIsPlaying(true);

            setSlideCurrentValue(slideStartValue);
            audioPlayer.current.currentTime = slideStartValue;

            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        };

        const stopSound = () => {
            setIsPlaying(false);

            setSlideCurrentValue(slideStartValue);
            audioPlayer.current.currentTime = slideStartValue;

            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        };

        const togglePlayPause = () => {
            const prevValue = isPlaying;
            setIsPlaying(!prevValue);

            setSlideCurrentValue(slideStartValue);
            audioPlayer.current.currentTime = slideStartValue;

            if (!prevValue) {
                audioPlayer.current.play();
                animationRef.current = requestAnimationFrame(whilePlaying);
            } else {
                audioPlayer.current.pause();
                cancelAnimationFrame(animationRef.current);
            }
        };

        const whilePlaying = () => {
            setSlideCurrentValue(parseInt(audioPlayer.current.currentTime));
            currentProgressBarThumb.current.value =
                audioPlayer.current.currentTime;
            changePlayerCurrentTime();

            animationRef.current = requestAnimationFrame(whilePlaying);

            if (audioPlayer.current.currentTime >= slideEndValue) {
                if (!loop) {
                    audioPlayer.current.pause();
                    cancelAnimationFrame(animationRef.current);
                    setIsPlaying((prev) => !prev);
                }
                audioPlayer.current.currentTime = 0;
                setSlideCurrentValue(parseInt(audioPlayer.current.currentTime));
            }
        };

        const changeRange = () => {
            audioPlayer.current.currentTime =
                currentProgressBarThumb.current.value;
            changePlayerCurrentTime();
        };

        const changePlayerCurrentTime = () => {
            startProgressBarThumb.current.style.setProperty(
                "--seek-before-width",
                `${(startProgressBarThumb.current.value / duration) * 100}%`
            );
            endProgressBarThumb.current.style.setProperty(
                "--seek-after-width",
                `${
                    ((duration - endProgressBarThumb.current.value) /
                        duration) *
                    100
                }%`
            );
            setCurrentTime(currentProgressBarThumb.current.value);
        };

        const getVals = () => {
            // Get slider values
            let parent = audioContainer.current.parentNode;
            let slides = parent.getElementsByTagName("input");
            let slide1 = parseFloat(slides[0].value);
            let slide2 = parseFloat(slides[2].value);
            // Neither slider will clip the other, so make sure we determine which is larger
            if (slide1 > slide2) {
                let tmp = slide2;
                slide2 = slide1;
                slide1 = tmp;
            }

            let displayElement =
                parent.getElementsByClassName("range-values")[0];
            displayElement.innerHTML = slide1 + " - " + slide2;
        };

        const toggleLoop = () => {
            let prev = loop;
            setLoop(!prev);
            setLoopClass(prev ? "control-btn" : "control-btn active");
        };
        const toggleMute = () => {
            let prev = mute;
            audioPlayer.current.muted = !audioPlayer.current.muted;
            setMute(!prev);
            setMuteClass(prev ? "control-btn" : "control-btn active");
        };
        useEffect(() => {
            const seconds = Math.floor(audioPlayer.current.duration);
            setDuration(seconds);
            startProgressBarThumb.current.max = seconds;
            endProgressBarThumb.current.max = seconds;
        }, [
            audioPlayer?.current?.loadedmetadata,
            audioPlayer?.current?.readyState,
        ]);

        useEffect(() => {
            startProgressBarThumb.current.oninput = getVals;
            currentProgressBarThumb.current.oninput = getVals;
            endProgressBarThumb.current.oninput = getVals;
            startProgressBarThumb.current.oninput();
            setPlayers((prev) => {
                return { ...prev, [songName]: audioPlayer.current };
            });
        }, []);

        return (
            <div className={"audio-player"} ref={audioContainer}>
                <audio ref={audioPlayer} src={song} preload='metadata'></audio>
                <button onClick={togglePlayPause} className={"play-pause"}>
                    {isPlaying ? <FaPause /> : <FaPlay className={"play"} />}
                </button>
                <div className='control-btns-container'>
                    <button className={muteClass} onClick={toggleMute}>
                        MUTE
                    </button>
                    <button className={loopClass} onClick={toggleLoop}>
                        LOOP
                    </button>
                </div>
                {/* current time */}
                <div className={"current-time"}>
                    {calculateTime(currentTime)}
                </div>

                {/* progress bar */}
                <section className='range-slider'>
                    <span className='range-values'></span>
                    <input
                        ref={startProgressBarThumb}
                        className='progress-bar start'
                        value={slideStartValue}
                        min='0'
                        max='17'
                        step='1'
                        type='range'
                        onChange={(e) => {
                            setSlideStartValue(e.target.value);
                            changeRange();
                            getVals();
                        }}
                    />
                    <input
                        ref={currentProgressBarThumb}
                        className='progress-bar current'
                        value={slideCurrentValue}
                        min={"0"}
                        max={"17"}
                        step='1'
                        type='range'
                        onChange={(e) => {
                            setSlideCurrentValue(e.target.value);
                            changePlayerCurrentTime();
                            audioPlayer.current.currentTime =
                                currentProgressBarThumb.current.value;
                            getVals();
                        }}
                    />
                    <input
                        ref={endProgressBarThumb}
                        className='progress-bar end'
                        value={slideEndValue}
                        min='0'
                        max='17'
                        step='1'
                        type='range'
                        onChange={(e) => {
                            setSlideEndValue(e.target.value);
                            changeRange();
                            getVals();
                        }}
                    />
                </section>
            </div>
        );
    }
);

export default AudioPlayer;
