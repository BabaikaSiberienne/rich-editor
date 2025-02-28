import Konva from "konva";

export interface ShapeProps {
    x: number;
    y: number;
    width: number;
    height: number;
    tool: string;
    html: string;
    id: string;
    stageRef: React.RefObject<Konva.Stage>
    text: string; // Можно изменить на более специфичный тип, если нужно
}
