import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
    const [compareItems, setCompareItems] = useState(() => {
        const saved = localStorage.getItem("compare");

        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "compare",
            JSON.stringify(compareItems)
        );
    }, [compareItems]);

    const addCompare = (artwork) => {
        const exists = compareItems.some(
            (item) => item.id === artwork.id
        );

        if (exists) return;

        if (compareItems.length >= 2) {
            alert("Maximum 2 artworks can be compared.");
            return;
        }

        setCompareItems((prev) => [
            ...prev,
            artwork,
        ]);
    };

    const removeCompare = (id) => {
        setCompareItems((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
        );
    };

    const isCompared = (id) => {
        return compareItems.some(
            (item) => item.id === id
        );
    };

    return (
        <CompareContext.Provider
            value={{
                compareItems,
                addCompare,
                removeCompare,
                isCompared,
            }}
        >
            {children}
        </CompareContext.Provider>
    );
}

export const useCompare = () =>
    useContext(CompareContext);