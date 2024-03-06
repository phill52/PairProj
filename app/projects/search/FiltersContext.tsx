"use client";
import React, {
	createContext,
	useState,
	useContext,
	Dispatch,
	SetStateAction,
} from "react";

export interface FilterObject {
	label: string;
	value: string;
}

type FiltersContextType = {
	filtersSelected: FilterObject[];
	setFiltersSelected: Dispatch<SetStateAction<FilterObject[]>>;
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
};

const FiltersContext = createContext<FiltersContextType | null>(null);

export const useFilters = () => {
	const context = useContext(FiltersContext);
	if (!context) {
		throw new Error("useFilters must be used within a FiltersProvider");
	}
	return context;
};

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [filtersSelected, setFiltersSelected] = useState<FilterObject[]>([]);
	const [query, setQuery] = useState<string>("");

	const value = {
		filtersSelected,
		setFiltersSelected,
		query,
		setQuery,
	};

	return (
		<FiltersContext.Provider value={value}>
			{children}
		</FiltersContext.Provider>
	);
};
