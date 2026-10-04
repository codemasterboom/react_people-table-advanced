import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let result = people;

    const sexFilter = searchParams.get('sex');

    if (sexFilter) {
      result = result.filter(person => person.sex === sexFilter);
    }

    const queryFilter = searchParams.get('query')?.toLowerCase() || null;

    if (queryFilter) {
      result = result.filter(
        person =>
          person.name.toLowerCase().includes(queryFilter) ||
          person.fatherName?.toLowerCase().includes(queryFilter) ||
          person.motherName?.toLowerCase().includes(queryFilter),
      );
    }

    return result;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isError && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
