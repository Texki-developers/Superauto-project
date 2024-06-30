import SearchIcon from '../../../assets/header-icons/searchIcon';

const SearchInput = () => {
  return (
    <div className='bg-white-100 grid w-[300px] grid-cols-[1fr_40px] overflow-hidden rounded-md'>
      <input
        placeholder='Search Queries'
        type='text'
        className='input-common w-full'
      />
      <div className='grid place-items-center'>
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchInput;
