import React, { useState } from "react";
import "./ControlPanel.css";
import Button from "../Button/Button";

const ControlPanel = ({ strips }) => {
    const [playing, setPlaying] = useState(false);
    const [looping, setLooping] = useState(false);
    const [muted, setMuted] = useState(false);

    return (
        <div className='control-panel-container'>
            <div className='control-panel'>
                <div className='play'>
                    {playing ? (
                        <Button
                            content='STOP'
                            size='big'
                            onClick={() => {
                                Object.values(strips).forEach((strip) => {
                                    strip.current.stop();
                                });
                                setPlaying(false);
                            }}
                        />
                    ) : (
                        <Button
                            content='PLAY'
                            size='big'
                            onClick={() => {
                                Object.values(strips).forEach((strip) => {
                                    strip.current.play();
                                });
                                setPlaying(true);
                            }}
                        />
                    )}
                </div>
                <div className='loop'>
                    {looping ? (
                        <Button
                            content='UN-LOOP'
                            size='big'
                            onClick={() => {
                                Object.values(strips).forEach((strip) => {
                                    strip.current.unloop();
                                });
                                setLooping(false);
                            }}
                        />
                    ) : (
                        <Button
                            content='LOOP'
                            size='big'
                            onClick={() => {
                                Object.values(strips).forEach((strip) => {
                                    strip.current.loop();
                                });
                                setLooping(true);
                            }}
                        />
                    )}
                </div>
                <div className='mute'>
                    {muted ? (
                        <Button
                            content='UN-MUTE'
                            size='big'
                            onClick={() => {
                                Object.values(strips).forEach((strip) => {
                                    strip.current.unmute();
                                });
                                setMuted(false);
                            }}
                        />
                    ) : (
                        <Button
                            content='MUTE'
                            size='big'
                            onClick={() => {
                                Object.values(strips).forEach((strip) => {
                                    strip.current.mute();
                                });
                                setMuted(true);
                            }}
                        />
                    )}
                    <Button
                        content={"-5"}
                        size='big'
                        onClick={() => {
                            Object.values(strips).forEach((strip) => {
                                strip.current.deductFromEnd(5);
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
