interface RawRecord {
  id: number;
  desc: string;
  highlightedWord: { name: string; category: "person" | "org" }[];
}

interface RecordsBarProps {
  rawRecords: RawRecord[];
  setRawRecord: React.Dispatch<React.SetStateAction<RawRecord | undefined>>;
}

interface Word {
  name: string;
  category: string;
  id: number;
}

interface AnnotationWindowProps {
  highlightPerson: () => void;
  highlightOrg: () => void;
  words: Word[];
}

export { Word, RawRecord, RecordsBarProps, AnnotationWindowProps };
