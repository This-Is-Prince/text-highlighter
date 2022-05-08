import { useEffect, useState } from "react";
import AnnotationList from "./components/AnnotationList";
import AnnotationWindow from "./components/AnnotationWindow";
import RecordsBar from "./components/RecordsBar";
import data from "./data";
import { RawRecord, Word } from "./type";

function App() {
  const [rawRecords, setRawRecords] = useState<RawRecord[]>([]);
  const [rawRecord, setRawRecord] = useState<RawRecord>();

  const [words, setWords] = useState<Word[]>([]);

  const highlightPerson = () => {};
  const highlightOrg = () => {};

  useEffect(() => {
    const localRecords = localStorage.getItem("records");
    if (localRecords === null) {
      localStorage.setItem("records", JSON.stringify(data));
      setRawRecords(data);
    } else {
      setRawRecords(JSON.parse(localRecords));
    }
  }, []);

  useEffect(() => {
    setWords(() => {
      if (rawRecord !== undefined) {
        return rawRecord.desc.split(" ").map((word, index) => {
          if (index % 7 == 0) {
            return { name: word, category: "person", id: index } as Word;
          }
          return { name: word, category: "", id: index } as Word;
        });
      } else {
        return [];
      }
    });
  }, [rawRecord]);

  return (
    <main className="main">
      <RecordsBar rawRecords={rawRecords} setRawRecord={setRawRecord} />
      <AnnotationWindow
        highlightPerson={highlightPerson}
        highlightOrg={highlightOrg}
        words={words}
      />
      <AnnotationList />
    </main>
  );
}

export default App;
