import {
  useEffect,
  useState,
} from "react";

import useDebounce
  from "./useDebounce";

import {
  getSuggestions,
} from "../services/artworkService";

export default function useSearchSuggestions(
  keyword
) {
  const debouncedKeyword =
    useDebounce(
      keyword,
      500
    );

  const [
    suggestions,
    setSuggestions,
  ] = useState([]);

  useEffect(() => {
    if (
      !debouncedKeyword ||
      debouncedKeyword.length < 2
    ) {
      setSuggestions([]);
      return;
    }

    async function load() {
      try {
        const data =
          await getSuggestions(
            debouncedKeyword
          );

        setSuggestions(data);
      } catch (error) {
        console.error(error);

        setSuggestions([]);
      }
    }

    load();
  }, [debouncedKeyword]);

  return suggestions;
}