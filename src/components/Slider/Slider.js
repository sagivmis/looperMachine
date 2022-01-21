import React, { useState } from "react";
import "./Slider.css";
import ItemsCarousel from "react-items-carousel";
import Button from "../Button/Button";

const Slider = () => {
    const [activeItem, setActiveItem] = useState(0);

    return (
        <div className='slider-container'>
            <div className='slider'>
                <ItemsCarousel
                    requestToChangeActive={setActiveItem}
                    activeItemIndex={activeItem}
                    numberOfCards={3}
                    leftChevron={<Button content={"<"} size='small' />}
                    rightChevron={<Button content={">"} size='small' />}
                    outsideChevron
                    chevronWidth={50}
                >
                    <div className='item'>First card</div>
                    <div className='item'>Second card</div>
                    <div className='item'>Third card</div>
                    <div className='item'>Fourth card</div>
                    <div className='item'>Fifth card</div>
                    <div className='item'>Sixth card</div>
                    <div className='item'>Seventh card</div>
                    <div className='item'>Eighth card</div>
                </ItemsCarousel>
            </div>
        </div>
    );
};

export default Slider;
