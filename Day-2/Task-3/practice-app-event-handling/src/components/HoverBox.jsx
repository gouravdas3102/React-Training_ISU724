import { useState } from "react";

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