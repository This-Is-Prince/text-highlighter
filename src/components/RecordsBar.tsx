import React, { useState } from "react";
import { RecordsBarProps } from "../type";

const RecordsBar: React.FC<RecordsBarProps> = ({
  rawRecords,
  setRawRecord,
}) => {
  const [activeRecord, setActiveRecord] = useState(-1);
  return (
    <aside className="records_bar section">
      <header className="header">
        <h3>Records</h3>
      </header>
      <ul className="records">
        {rawRecords.map((rawRecord) => {
          return (
            <li
              key={rawRecord.id}
              onClick={() => {
                setRawRecord(rawRecord);
                setActiveRecord(rawRecord.id);
              }}
              className={`record ${
                activeRecord === rawRecord.id ? "active_record" : ""
              }`}
            >
              {rawRecord.desc.substring(0, 30)} ...
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default RecordsBar;
