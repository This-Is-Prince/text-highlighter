import { useEffect, useState } from "react";
import AnnotationList from "./components/AnnotationList";
import AnnotationWindow from "./components/AnnotationWindow";
import RecordsBar from "./components/RecordsBar";
import data from "./data";
import { Record } from "./type";

function App() {
  const [records, setRecords] = useState<Record[]>([]);
  const [record, setRecord] = useState<Record>();

  useEffect(() => {
    const localRecords = localStorage.getItem("records");
    if (localRecords === null) {
      console.log("localRecords, is null");
      localStorage.setItem("records", JSON.stringify(data));
      setRecords(data);
    } else {
      setRecords(JSON.parse(localRecords));
    }
    setRecord(records[0]);
  }, []);
  return (
    <main className="main">
      <RecordsBar records={records} setRecord={setRecord} />
      <AnnotationWindow record={record} />
      <AnnotationList />
    </main>
  );
}

export default App;
