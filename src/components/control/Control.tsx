import React from "react";
import { ControlProps } from ".";


// Определяем интерфейс для пропсов
const Control: React.FC<ControlProps> = ({ tool, setTool }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTool(e.target.value as "shape" | "cursor"); // Приводим к нужному типу
  };

  return (
    <div style={{ position: "absolute", top: 0 }}>
      <div>
        <input
          type="radio"
          id="cursor"
          name="control"
          value="cursor"
          checked={tool === "cursor"}
          onChange={handleOnChange}
        />
        <label htmlFor="cursor">Взаимодействие</label>
      </div>

      <div>
        <input
          type="radio"
          id="shape"
          name="control"
          value="shape"
          checked={tool === "shape"}
          onChange={handleOnChange}
        />
        <label htmlFor="shape">Добавление</label>
      </div>
    </div>
  );
};

export default Control;
