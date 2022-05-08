import React from "react";
import { AnnotationWindowProps } from "../type";

const AnnotationWindow: React.FC<AnnotationWindowProps> = ({
  words,
  highlightPerson,
  highlightOrg,
}) => {
  return (
    <section className="annotation_window section">
      <header className="header">
        <button className="btn" onClick={highlightPerson}>
          person
        </button>
        <button className="btn" onClick={highlightOrg}>
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
