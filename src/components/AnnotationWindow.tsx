import React from "react";
import { AnnotationWindowProps } from "../type";
import { v4 as uuidv4 } from "uuid";

const AnnotationWindow: React.FC<AnnotationWindowProps> = ({
  text,
  category,
  setCategory,
  setHighlightedWords,
}) => {
  return (
    <section className="annotation_window section">
      <header className="header">
        <button
          className={`btn ${category === "person" ? "active" : ""}`}
          onClick={() => setCategory("person")}
        >
          person
        </button>
        <button
          className={`btn ${category === "org" ? "active" : ""}`}
          onClick={() => setCategory("org")}
        >
          org
        </button>
      </header>
      <article
        onClick={(e) => {
          let selection = window.getSelection();
          if (selection != null) {
            const text = selection.toString();
            if (text !== "") {
              const userSelection = selection.getRangeAt(0);
              const newNode = document.createElement("span");
              const id = uuidv4();
              newNode.classList.add("category");
              try {
                userSelection.surroundContents(newNode);

                newNode.id = id;
                const selectedTextSpan = document.createElement("span");
                const categorySpan = document.createElement("span");
                selectedTextSpan.textContent = text;
                categorySpan.textContent = category;

                newNode.innerHTML = "";
                newNode.appendChild(selectedTextSpan);
                newNode.appendChild(document.createTextNode(" "));
                newNode.appendChild(categorySpan);
                setHighlightedWords((prevHighlightedWords) => {
                  return [
                    ...prevHighlightedWords,
                    { name: text, category, id },
                  ];
                });
              } catch (error) {
                selection.removeAllRanges();
              }
            }
          }
        }}
        className="annotation_container"
      >
        {text}
      </article>
    </section>
  );
};

export default AnnotationWindow;
