import { createContext, useState } from "react";
import type { FC, ReactNode } from "react";


interface SearchContextType {
  query: string;
  setQuery: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  query: "",
  setQuery: () => {},
});

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState("");
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};