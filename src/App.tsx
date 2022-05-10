import { useEffect, useState } from "react";
import AnnotationList from "./components/AnnotationList";
import AnnotationWindow from "./components/AnnotationWindow";
import RecordsBar from "./components/RecordsBar";
import data from "./data";
import { Word, RawRecord } from "./type";
import { v4 as uuidv4 } from "uuid";

/* 
Give any records with highlighted words and a raw string. 
This app will highlight the given word in this string.
*/
function App() {
  const [text, setText] = useState<string>("");
  const [category, setCategory] = useState("person");
  const [rawRecords, setRawRecords] = useState<RawRecord[]>([]);
  const [highlightedWords, setHighlightedWords] = useState<Word[]>([]);

  const deleteWord = (id: string) => {
    setHighlightedWords((prevHighlightedWords) => {
      return prevHighlightedWords.filter((word) => {
        if (word.id === id) {
          const elm = document.getElementById(id) as HTMLSpanElement;
          if (elm !== null) {
            elm.remove();
          }
          return false;
        } else {
          return true;
        }
      });
    });
  };

  useEffect(() => {
    const localRecords = localStorage.getItem("records");
    if (localRecords === null) {
      localStorage.setItem("records", JSON.stringify(data));
      setRawRecords(data);
    } else {
      setRawRecords(JSON.parse(localRecords));
    }
  }, []);

  return (
    <main className="main">
      <RecordsBar rawRecords={rawRecords} setText={setText} />
      <AnnotationWindow
        text={text}
        category={category}
        setCategory={setCategory}
        setHighlightedWords={setHighlightedWords}
      />
      <AnnotationList
        deleteWord={deleteWord}
        highlightedWords={highlightedWords}
      />
    </main>
  );
}

export default App;
