
// Traffic Light Component that displays a specific message for each color prop received
function TrafficLight({ color }) {
    let message;
    switch (color){
        case "red":
            message ="Stop";
            break;
        case "yellow":
            message = "Slow Down";
            break;
        case "green":
            message = "Go";
            break;
        default:
            message = "Invalid Color";
    }
    return (
        <div>
            <h2>Light : {color}</h2>
            <p>{message}</p>
        </div>
    )
}

export default TrafficLight;