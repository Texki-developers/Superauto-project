import Button from '../button.tsx/Button';
import SearchInput from '../formComponents/searchInput/SearchInput';
import AddIcon from '../../assets/header-icons/add-icon.svg';

interface IAddAndSearchItemProps {
  onAddButtonClick?: () => void;
  addButtonText: string;
  onSearch?: (search: string) => void
  hideSearch?: boolean;
}
const AddAndSearchItem = (props: IAddAndSearchItemProps) => {
  return (
    <div className='flex justify-between'>
      <div>
        {!props?.hideSearch && <SearchInput onSearch={props.onSearch} />}
      </div>
      <div>
        <Button
          onClick={props?.onAddButtonClick}
          bg='primary'
          icon={<img alt='AddIcon' className='w-[15px]' src={AddIcon} />}
          text={props?.addButtonText}
        />
      </div>
    </div>
  );
};

export default AddAndSearchItem;
