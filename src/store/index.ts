import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ITextHighlighterStore } from "../type";

const useTextHighlighterStore = create<ITextHighlighterStore>()(
  devtools(persist((set) => ({}), { name: "textHighlighter" }))
);

export default useTextHighlighterStore;
