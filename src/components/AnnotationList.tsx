import React from "react";
import { AnnotationListProps } from "../type";

const AnnotationList: React.FC<AnnotationListProps> = ({
  highlightedWords,
  deleteWord,
}) => {
  return (
    <aside className="annotation_list section">
      <header className="header">
        <h3>Annotations</h3>
      </header>
      <ul className="highlighted_words">
        {highlightedWords.map(({ category, name }) => {
          return (
            <li key={name}>
              <span className="word_name">{name}</span>
              <span className="word_category">{category}</span>
              <button
                className="delete_word"
                onClick={() => {
                  deleteWord(name);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AnnotationList;
