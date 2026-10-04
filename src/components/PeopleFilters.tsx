import { Link, useSearchParams } from 'react-router-dom';
import { NameFilter } from './NameFilter';
import { SexFilter } from './SexFilter';
import { getSearchWith } from '../utils/searchHelper';
import { CenturiesFilter } from './CenturiesFilter';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();

  const getResetLink = () => {
    const newParams = getSearchWith(searchParams, {
      sex: null,
      query: null,
      centuries: null,
    });

    return `${newParams ? `?${newParams}` : ''}`;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <NameFilter />
      <CenturiesFilter />

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={getResetLink()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
