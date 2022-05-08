import React from "react";
import { AnnotationWindowProps } from "../type";

const AnnotationWindow: React.FC<AnnotationWindowProps> = ({
  words,
  highlightWord,
}) => {
  return (
    <section className="annotation_window section">
      <header className="header">
        <button className="btn" onClick={() => highlightWord("person")}>
          person
        </button>
        <button className="btn" onClick={() => highlightWord("org")}>
          org
        </button>
      </header>
      <article className="annotation_container">
        {words.map(({ category, id, name }) => {
          return (
            <span key={id} className={`${category === "" ? "" : "category"}`}>
              <span>{name}</span> <span>{category}</span>
            </span>
          );
        })}
      </article>
    </section>
  );
};

export default AnnotationWindow;
