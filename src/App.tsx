import { useEffect, useState } from "react";
import AnnotationList from "./components/AnnotationList";
import AnnotationWindow from "./components/AnnotationWindow";
import RecordsBar from "./components/RecordsBar";
import data from "./data";
import { RawRecord, Word } from "./type";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [rawRecords, setRawRecords] = useState<RawRecord[]>([]);
  const [rawRecord, setRawRecord] = useState<RawRecord>();

  const [words, setWords] = useState<Word[]>([]);

  const highlightWord = (category: string) => {
    if (rawRecord !== undefined) {
      const { desc, highlightedWord } = rawRecord;

      const persons: string[] = highlightedWord
        .reduce((prevPerson, currPerson) => {
          if (currPerson.category === category) {
            prevPerson.push(currPerson.name);
          }
          return prevPerson;
        }, [] as string[])
        .sort((a, b) => {
          return b.length - a.length;
        });

      let output: Word[] = [];
      if (
        persons.some((person) => {
          return person === desc;
        })
      ) {
        output.push({ name: desc, category, id: uuidv4() });
        setWords(output);
        return;
      }

      output.push({ name: desc, category: "", id: uuidv4() });

      persons.forEach((person) => {
        let result: Word[] = [];

        output.forEach((word) => {
          if (word.category !== "") {
            result.push(word);
          } else {
            let index = word.name.indexOf(person);
            if (index < 0) {
              result.push(word);
            } else {
              result.push({
                name: word.name.substring(0, index),
                category: "",
                id: uuidv4(),
              });
              result.push({
                name: person,
                category,
                id: word.id,
              });
              result.push({
                name: word.name.substring(index + person.length),
                category: "",
                id: uuidv4(),
              });
            }
          }
        });
        output = result;
      });
      setWords(output);
    }
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

  useEffect(() => {
    setWords(() => {
      if (rawRecord !== undefined) {
        return rawRecord.desc.split(" ").map((word, index) => {
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
      <AnnotationWindow highlightWord={highlightWord} words={words} />
      <AnnotationList />
    </main>
  );
}

export default App;
