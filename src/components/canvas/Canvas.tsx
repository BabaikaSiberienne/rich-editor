import React, { useState } from "react";
import { Layer, Stage } from "react-konva";
import Konva from "konva";
import Shape from "../shape/Shape";
import {CanvasProps, Figure} from './index'

const Canvas: React.FC<CanvasProps> = ({ tool, stageRef }) => {
  const [figures, setFigures] = useState<Figure[]>([]);

  const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === "cursor") return;

    const stage = e.target.getStage();
    
    // Проверка на null
    if (!stage) return;

    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();

    if (point) {
      setFigures((prev) => [
        ...prev,
        {
          id: Date.now().toString(36),
          width: 100,
          height: 100,
          type: "rect",
          x: point.x - stageOffset.x,
          y: point.y - stageOffset.y,
          html: "",
          text: "",
        },
      ]);
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "cursor"}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure) => (
          <Shape key={figure.id} {...figure} stageRef={stageRef} tool={tool} />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
