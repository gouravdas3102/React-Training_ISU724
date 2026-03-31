import { useState } from "react";

// Function Component to manage text input and mirror it instantly
function TextInput(){
    const [text,setText] = useState("");
    return (
        <div>
            <input type= "text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text here..."
            />
            <p>You entered: {text}</p>
        </div>
    );
}

export default TextInput;