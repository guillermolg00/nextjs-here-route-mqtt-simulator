
import { useHereService } from "app/layouts/HereServiceContext";
import { AutosuggestItemDto, PositionDto } from "app/services/here/here.dto";
import debounce from "lodash.debounce";
import { useState } from "react";

interface AddressInputProps {
  placeholder: string;
  onSelect?: (item: AutosuggestItemDto | null) => void;
  at: PositionDto
}

export const AddressInput = ({ placeholder, onSelect, at}: AddressInputProps) => {
  const here = useHereService().service;
  if (!here) return
  const [autcompleteOptions, setAutocompleteOptions] = useState<
    AutosuggestItemDto[]
  >([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOption, setSelectedOption] =
    useState<AutosuggestItemDto | null>(null);

  const handleAutocomplete = debounce(async (query: string) => {
    const response = await here.autosuggest(query, at);
    if (!response || !response.items) {
      setAutocompleteOptions([]);
      return;
    }
    setAutocompleteOptions(response.items.filter((item) => item.address));
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    handleAutocomplete(value);
  };

  const handleSelect = (item: AutosuggestItemDto | null) => {
    setInputValue(here.formatAddress(item?.title));
    setSelectedOption(item);
    onSelect?.(item);
    setAutocompleteOptions([]);
  };

  const handleBlur = () => {
    if (autcompleteOptions.length > 0) {
      if (!selectedOption) {
        handleSelect(autcompleteOptions[0]);
      } else {
        setInputValue(here.formatAddress(selectedOption.title));
        setAutocompleteOptions([]);
      }
    } else {
      if (selectedOption) {
        setInputValue(here.formatAddress(selectedOption.title));
      } else {
        handleSelect(null);
      }
    }
  };

  return (
    <div className="relative w-full mb-8">
      <label className="block text-sm font-medium mb-2">Start place</label>
      <input
        className="w-full border px-4 py-2 rounded-sm"
        onChange={handleChange}
        value={inputValue}
        placeholder={placeholder}
      />
      {autcompleteOptions.length > 0 && (
        <div className="absolute top-[calc(100%+4px)] bg-white border border-gray-300 rounded-sm shadow-lg left-0 right-0 z-[10] overflow-hidden" onBlur={handleBlur} autoFocus>
          <ul className="text-sm font-medium text-black">
            {autcompleteOptions.map((option) => (
              <li key={option.id} className="w-full text-start">
                <button
                  className="w-full px-4 py-2 text-start hover:bg-gray-200 transition-colors"
                  onClick={() => handleSelect(option)}
                >
                  {here.formatAddress(option.title)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
