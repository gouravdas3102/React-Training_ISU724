import { useState } from "react";

// HoverBox component that changes background color on hover
function HoverBox(){
    const[boxColor,setBoxColor] = useState("blue");
    return (
        <div
            onMouseEnter={()=> setBoxColor("red")}
            onMouseLeave={()=>setBoxColor("blue")}
            style={{
                width :"200px",
                height:"200px",
                backgroundColor: boxColor,
                alignItems: "center",
                color: "white"
            }}           
        >
            Hover Me !
        </div>
    );
}

export default HoverBox;