import { Store } from '@/store';
import { useContext } from 'react';
import SearchIcon from './icons/SearchIcon';

function ProductToSearchInput() {
  const { state, dispatch } = useContext(Store);
  const { productToSearch } = state;

  const handleChangeSearchInput = (e) => {
    dispatch({
      type: 'SET_PRODUCT_TO_SEARCH',
      payload: e.target.value,
    });
  };

  const resetSearchInput = () => {
    dispatch({
      type: 'RESET_PRODUCT_TO_SEARCH',
    });
  };

  return (
    <div className="flex shrink gap-1 min-w-[140px]  border rounded-md items-center">
      <input
        type="text"
        className="w-full focus:ring-0 border-none"
        placeholder="search product"
        name="searchInput"
        value={productToSearch}
        onChange={handleChangeSearchInput}
      />
      {productToSearch ? (
        <button
          className="mr-2 text-lg font-bold  text-blue-600"
          onClick={resetSearchInput}
        >
          X
        </button>
      ) : (
        <SearchIcon className="w-[1.5rem] h-[1.5rem] mr-2 fill-blue-600" />
      )}
    </div>
  );
}

export default ProductToSearchInput;
