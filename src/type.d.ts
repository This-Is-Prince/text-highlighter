interface HighlightedWord {
  name: string;
  category: string;
}

interface RawRecord {
  id: number;
  desc: string;
  highlightedWords: HighlightedWord[];
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

interface AnnotationListProps {
  highlightedWords: HighlightedWord[];
  deleteWord: (name: string) => void;
}

export {
  Word,
  RawRecord,
  RecordsBarProps,
  AnnotationWindowProps,
  AnnotationListProps,
  HighlightedWord,
};
