import { useState } from "react";

// Function Component to toggle between ON and OFF states
function Toggle(){
    const[isOn,setIsOn] = useState(false);
    return(
        <div>
            <h2>{isOn ? "ON":"OFF"}</h2>
            <button onClick={() => setIsOn(!isOn)}>Toggle</button>
        </div>
    );
}

export default Toggle;