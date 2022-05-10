interface RawRecord {
  id: number;
  desc: string;
}

interface RecordsBarProps {
  rawRecords: RawRecord[];
  setText: React.Dispatch<React.SetStateAction<string>>;
}

interface Word {
  name: string;
  category: string;
  id: string;
}

interface AnnotationWindowProps {
  text: string;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setHighlightedWords: React.Dispatch<React.SetStateAction<Word[]>>;
}

interface AnnotationListProps {
  highlightedWords: Word[] | undefined;
  deleteWord: (id: string) => void;
}

export {
  RawRecord,
  RecordsBarProps,
  AnnotationWindowProps,
  AnnotationListProps,
  Word,
};
