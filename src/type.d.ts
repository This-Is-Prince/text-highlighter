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
  id: string | number;
}

interface AnnotationWindowProps {
  highlightWord: (category: string) => void;
  words: Word[];
}

export { Word, RawRecord, RecordsBarProps, AnnotationWindowProps };
