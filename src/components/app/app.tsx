import { FC, useRef, useState } from "react";
import Canvas from "../canvas/Canvas";
import Control from "../control/Control";

const App: FC = () => {
  const [tool, setTool] = useState("cursor");
  const stageRef = useRef(null);
  return (
    <>
      <Canvas tool={tool} stageRef={stageRef} />
      <Control tool={tool} setTool={setTool} />
    </>
  );
}

export default App;
