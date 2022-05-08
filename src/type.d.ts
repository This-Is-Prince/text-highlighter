interface Record {
  id: number;
  rawtext: string;
  highlightedText: { name: string; category: "person" | "org" }[];
}

interface RecordsBarProps {
  records: Record[];
  setRecord: React.Dispatch<React.SetStateAction<Record | undefined>>;
}

interface AnnotationWindowProps {
  record: Record | undefined;
}

export { Record, RecordsBarProps, AnnotationWindowProps };
