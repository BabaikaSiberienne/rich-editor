import React, { forwardRef } from "react";
import { HtmlTextProps } from ".";
// Определяем интерфейс для пропсов


// Рендеринг дива
const HtmlText = forwardRef<HTMLDivElement, HtmlTextProps>(({ html, id }, ref) => {
  return (
    <div
      id={`htmltext_${id}`} // Исправлено: добавлены фигурные скобки для интерполяции строки
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        position: "fixed",
        overflow: "hidden",
        left: "10px",
        top: "10px",
        color: 'wheat',
      }}
      ref={ref}
    />
  );
});

// Указываем displayName для отладки
HtmlText.displayName = "HtmlText";

export default HtmlText;
