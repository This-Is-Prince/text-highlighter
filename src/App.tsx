import { useEffect, useState } from "react";
import AnnotationList from "./components/AnnotationList";
import AnnotationWindow from "./components/AnnotationWindow";
import RecordsBar from "./components/RecordsBar";
import data from "./data";
import { HighlightedWord, RawRecord, Word } from "./type";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [rawRecords, setRawRecords] = useState<RawRecord[]>([]);
  const [rawRecord, setRawRecord] = useState<RawRecord>();
  const [words, setWords] = useState<Word[]>([]);

  const highlightWord = (category: string) => {
    if (rawRecord !== undefined) {
      const { desc, highlightedWords } = rawRecord;

      const persons = highlightedWords
        .reduce((prevPerson, currPerson) => {
          if (currPerson.category === category) {
            prevPerson.push(currPerson);
          }
          return prevPerson;
        }, [] as HighlightedWord[])
        .sort((a, b) => {
          return b.name.length - a.name.length;
        });

      let output: Word[] = [];

      if (
        persons.some((person) => {
          if (person.name === desc) {
            output.push({ name: person.name, category, id: uuidv4() });
            return true;
          }
          return false;
        })
      ) {
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
            let index = word.name.indexOf(person.name);

            if (index < 0) {
              result.push(word);
            } else {
              result.push({
                name: word.name.substring(0, index),
                category: "",
                id: uuidv4(),
              });
              result.push({ name: person.name, category, id: uuidv4() });
              result.push({
                name: word.name.substring(index + person.name.length),
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

  const deleteWord = (name: string) => {
    setWords((prevWords) => {
      return prevWords.filter((word) => {
        return word.name !== name;
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

  useEffect(() => {
    setWords(() => {
      if (rawRecord !== undefined) {
        return rawRecord.desc.split(" ").map((word) => {
          return { name: word, category: "", id: uuidv4() } as Word;
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
      <AnnotationList
        highlightedWords={
          rawRecord === undefined ? [] : rawRecord.highlightedWords
        }
        deleteWord={deleteWord}
      />
    </main>
  );
}

export default App;
