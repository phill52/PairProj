import React, { useState, useEffect, useRef } from "react";

interface AutocompleteProps {
	options: string[];
	onSelect: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options, onSelect }) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
	const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputValue) {
			setFilteredOptions(
				options.filter((option) =>
					option.toLowerCase().includes(inputValue.toLowerCase()),
				),
			);
			setIsOptionsVisible(true);
		} else {
			setFilteredOptions([]);
			setIsOptionsVisible(false);
		}
	}, [inputValue, options]);

	const handleSelect = (value: string) => {
		setInputValue("");
		setIsOptionsVisible(false);
		onSelect(value);
	};

	return (
		<div className="relative">
			<input
				ref={inputRef}
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
				onFocus={() => setIsOptionsVisible(true)}
				onBlur={() => {
					// Delay hiding the options so that onClick can register for list items
					setTimeout(() => setIsOptionsVisible(false), 100);
				}}
			/>
			{isOptionsVisible && filteredOptions.length > 0 && (
				<ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white">
					{filteredOptions.map((option, index) => (
						<li
							key={index}
							className="cursor-pointer p-2 hover:bg-gray-100"
							onMouseDown={() => handleSelect(option)}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Autocomplete;
