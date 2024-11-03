import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Person, PaginatedResponse } from '../../api/types';
import { api } from '../../api/swapi';
import Pagination from '../common/Pagination';

const PeopleTable: React.FC = () => {
  const [data, setData] = useState<PaginatedResponse<Person> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getPeople(currentPage);
        setData(response);
      } catch (error) {
        console.error('Error fetching people:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (url: string, entityType: string) => {
    const id = url.split('/').filter(Boolean).pop();
    navigate(`/${entityType}/${id}`);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center mt-5">No data available</div>;
  }

  const totalPages = Math.ceil(data.count / 10);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Star Wars Characters</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Birth Year</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((person) => (
              <tr
                key={person.url}
                onClick={() => handleRowClick(person.url, 'people')}
                style={{ cursor: 'pointer' }}
              >
                <td>{person.name}</td>
                <td>{person.height}</td>
                <td>{person.mass}</td>
                <td>{person.birth_year}</td>
                <td>{person.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PeopleTable;