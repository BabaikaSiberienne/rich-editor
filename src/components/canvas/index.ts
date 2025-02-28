export interface Figure {
    id: string;
    width: number;
    height: number;
    type: "rect";
    x: number;
    y: number;
    html: string;
    text: string;
}

export interface CanvasProps {
    tool: "cursor" | "shape" | string;
    stageRef: React.RefObject<any>;
}
