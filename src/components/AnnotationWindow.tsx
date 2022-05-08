import React from "react";
import { AnnotationWindowProps } from "../type";

const AnnotationWindow: React.FC<AnnotationWindowProps> = ({ record }) => {
  return (
    <section className="annotation_window section">
      <header className="header">
        <button className="btn active">person</button>
        <button className="btn">org</button>
      </header>
      <article className="annotation_container">
        {record !== undefined && record.rawtext}
      </article>
    </section>
  );
};

export default AnnotationWindow;
