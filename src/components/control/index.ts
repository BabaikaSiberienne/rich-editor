export interface ControlProps {
  tool: string ; // Указываем возможные значения для tool
  setTool: (tool: "shape" | "cursor") => void; // Типизируем функцию setTool
}

