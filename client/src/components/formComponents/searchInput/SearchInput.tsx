import React, { useState, useEffect, ChangeEvent } from 'react';
import SearchIcon from '../../../assets/header-icons/searchIcon';
import { useSearchParams } from 'react-router-dom';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const [searchParmas, setSearchParams] = useSearchParams();
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
      searchParmas.set("query", query)
      setSearchParams(searchParmas)
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [query]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className='bg-white-100 grid w-[300px] grid-cols-[1fr_40px] overflow-hidden rounded-md'>
      <input
        placeholder='Search Queries'
        type='text'
        className='input-common w-full'
        value={query}
        onChange={handleInputChange}
      />
      <div className='grid place-items-center'>
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchInput;
