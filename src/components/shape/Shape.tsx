import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Konva from "konva";
import { Group, Rect, Stage } from "react-konva";
import { Html } from "react-konva-utils";
import HtmlText from "../htmlText/HtmlText";
import { Editor, EditorState, RichUtils, ContentState } from "draft-js";
import 'draft-js/dist/Draft.css';
import './styles.scss'
import { ShapeProps } from ".";
// Определяем интерфейс для пропсов компонента Shape

const Shape: React.FC<ShapeProps> = (props) => {
  const { x, y, width, height, tool, html, id, text } = props;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editorState, setEditorState] = useState<EditorState>(
    () => EditorState.createWithContent(ContentState.createFromText(text))
  );

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement | null>(null);

  const renderImage = async () => {
    const htmltext = document.getElementById(`htmltext_${id}`);
    if (htmltext) {
      const { width: htmlWidth, height: htmlHeight } = htmltext.getBoundingClientRect();
      
      // Проверяем ширину и высоту элемента перед отрисовкой
      if (htmlWidth > 0 && htmlHeight > 0) {
        const canvas = await html2canvas(htmltext, {
          backgroundColor: "rgba(0,0,0,0)",
        });
        
        // Создаем изображение только если канвас имеет ненулевые размеры
        if (canvas.width > 0 && canvas.height > 0) {
          const shape = new Konva.Image({
            x: 0,
            y: height / 2,
            scaleX: 1 / window.devicePixelRatio,
            scaleY: 1 / window.devicePixelRatio,
            image: canvas,
          });
          
          if (groupRef.current) {
            groupRef.current.add(shape);
          }
          imageRef.current = shape;
        } else {
          console.warn("Canvas has zero dimensions.");
        }
      } else {
        console.warn("HTML element has zero dimensions.");
      }
    }
  };

  useEffect(() => {
    renderImage();
  }, [editorState]);

  const handleClick = () => {
    if (tool === "shape") {
      return;
    } else {
      setIsEditing((prev) => !prev);
      if (imageRef.current) {
        imageRef.current[isEditing ? 'show' : 'hide']();
      }
    }
  };

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const toggleStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
        <Rect stroke={"black"} width={width} height={height} />
        {isEditing && (
          <Html>
            <div className="block">
              <div className="fixed"></div>
              <button onClick={() => toggleStyle('BOLD')}>B</button>
              <button onClick={() => toggleStyle('ITALIC')}>I</button>
              <button onClick={() => toggleStyle('UNDERLINE')}>U</button>
              <Editor editorState={editorState} onChange={handleEditorChange} />
            </div>
          </Html>
        )}
      </Group>
      <Html>
        <HtmlText ref={htmlRef} html={html} id={id} />
      </Html>
    </>
  );
};

export default Shape;
