import "./App.css";
import { useMachine } from "@xstate/react";
import dryImage from "./image/dry.jpeg";
import moistImage from "./image/moist.jpg";
import wetImage from "./image/wet.jpg";
import deadImage from "./image/dead.jpg";
import sprinklerMachine from "./sprinkler";

function FlowerSprinker() {
  // eslint-disable-next-line
  const [flower, send] = useMachine(sprinklerMachine);

  return (
    <div className="container">
      <h1 className="header">SPRINKLER MACHINE</h1>
      <div className="div1">
        <h1>Moisture Level</h1>
        <h1>{flower.context.moisture_level}</h1>
      </div>
      <div className="div2">
        <h1>Soil Status</h1>
        {flower.context.moisture_level < 40 &&
        flower.context.moisture_level > 0 ? (
          <img className="imagesMoisture" alt="Dry Soil" src={dryImage}></img>
        ) : flower.context.moisture_level < 60 &&
          flower.context.moisture_level >= 40 ? (
          <img
            className="imagesMoisture"
            alt="Moist  Soil"
            src={moistImage}
          ></img>
        ) : flower.context.moisture_level < 80 &&
          flower.context.moisture_level >= 60 ? (
          <img className="imagesMoisture" alt="Wet Soil" src={wetImage}></img>
        ) : flower.context.moisture_level === 0 ? (
          <img
            className="imagesMoisture"
            alt="Dead Plant"
            src={deadImage}
          ></img>
        ) : (
          <img className="imagesMoisture" alt="Wet Soil" src={wetImage}></img>
        )}
      </div>
      <div className="div3">
        {flower.context.moisture_level < 40 &&
        flower.context.moisture_level > 0 ? (
          <div><h1>DRY</h1><button className="sprinkleBtn" onClick={() => send("SPRINKLE")}>SPRINKLE</button></div>
        ) : flower.context.moisture_level < 60 &&
          flower.context.moisture_level >= 40 ? (
          <h1>MOIST</h1>
        ) : flower.context.moisture_level < 80 &&
          flower.context.moisture_level >= 60 ? (
          <h1>WET</h1>
        ) : flower.context.moisture_level === 0 ? (
            <div><h1>THE PLANT DIED.</h1><button className="resetBtn" onClick={() => send("RESET")}>RESET</button></div>
        ) : (
          <h1>WET</h1>
        )}
      </div>
    </div>
  );
}

export default FlowerSprinker;
