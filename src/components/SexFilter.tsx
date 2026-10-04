import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const SexFilter: React.FC = () => {
  const [searchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex') || '';

  function getSexLink(value: string | null) {
    const newParams = getSearchWith(searchParams, {
      sex: value,
    });

    return `${newParams ? `?${newParams}` : ''}`;
  }

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <Link
        className={cn({ 'is-active': sexFilter === '' })}
        to={getSexLink(null)}
      >
        All
      </Link>
      <Link
        className={cn({ 'is-active': sexFilter === 'm' })}
        to={getSexLink('m')}
      >
        Male
      </Link>
      <Link
        className={cn({ 'is-active': sexFilter === 'f' })}
        to={getSexLink('f')}
      >
        Female
      </Link>
    </p>
  );
};
