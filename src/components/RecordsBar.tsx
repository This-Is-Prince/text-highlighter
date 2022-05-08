import React, { useState } from "react";
import { RecordsBarProps } from "../type";

const RecordsBar: React.FC<RecordsBarProps> = ({ records, setRecord }) => {
  const [activeRecord, setActiveRecord] = useState(-1);
  return (
    <aside className="records_bar section">
      <header className="header">
        <h3>Records</h3>
      </header>
      <ul className="records">
        {records.map((record) => {
          return (
            <li
              key={record.id}
              onClick={() => {
                setRecord(record);
                setActiveRecord(record.id);
              }}
              className={`${
                activeRecord === record.id ? "record active_record" : "record"
              }`}
            >
              {record.rawtext.substring(0, 30)} ...
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default RecordsBar;
