import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { SortType } from '../../const';
import { getSortType } from '../../store/offers-process/offers-process.selectors';
import { setSortType, getOffers } from '../../store/offers-process/offers-process.slice';

function Sort(): JSX.Element {
  const [opened, setOpened] = useState<boolean>(false);
  const selectedSortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();

  function handleToggle() {
    setOpened(!opened);
  }

  function handleChangeSorting(item: SortType) {
    dispatch(setSortType(item));
    dispatch(getOffers());
    setOpened(false);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleToggle}>
        {selectedSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${opened ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((sortItem) => (
          <li
            className={`places__option ${selectedSortType === sortItem ? 'places__option--active' : ''}`}
            key={sortItem}
            tabIndex={0}
            onClick={() => handleChangeSorting(sortItem)}
          >
            {sortItem}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
