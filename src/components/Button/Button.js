import "./Button.css";
const Button = ({
    content,
    onClick,
    classN = "",
    color = "black",
    fontColor = "white",
    size,
}) => {
    let paddingSide;
    let margin;
    let fontSize;
    let fontWeight;
    let borderRadius;
    let zIndex;
    let padding;
    switch (size) {
        case "big":
            padding = ("2rem", "2.5rem");
            paddingSide = "3rem";
            margin = "3.5px";
            fontSize = "26px";
            fontWeight = 300;
            borderRadius = "5px";
            break;
        case "small":
            padding = ("0rem", "0.89rem");
            margin = "3.5px";
            fontSize = "12px";
            fontWeight = 300;
            borderRadius = "5px";
            break;
        case "wide":
            padding = "2rem";
            paddingSide = "18rem";
            margin = "3.5px";
            fontSize = "26px";
            fontWeight = 300;
            borderRadius = "5px";
            zIndex = 1000;
            break;
        default:
            padding = ("1rem", "1.5rem");
            margin = "3.5px";
            fontSize = "22px";
            fontWeight = 300;
            borderRadius = "5px";
            zIndex = 1000;
    }
    let style;
    if (size)
        style = {
            color: fontColor,
            padding: padding ? padding : "",
            paddingRight: paddingSide ? paddingSide : "",
            paddingLeft: paddingSide ? paddingSide : "",
            margin: margin,
            fontSize: fontSize,
            fontWeight: fontWeight,
            borderRadius: borderRadius,
            zIndex: zIndex,
        };
    return (
        <button
            onClick={onClick}
            className={`btn ${classN}`}
            style={style ? style : null}
        >
            {content}
        </button>
    );
};

export default Button;
