import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Starship, PaginatedResponse } from '../../api/types';
import { api } from '../../api/swapi';
import Pagination from '../common/Pagination';

const StarshipsTable: React.FC = () => {
  const [data, setData] = useState<PaginatedResponse<Starship> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getStarships(currentPage);
        setData(response);
      } catch (error) {
        console.error('Error fetching starships:', error);
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
      <h2 className="mb-4">Star Wars Starships</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Cost</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((starship) => (
              <tr
                key={starship.url}
                onClick={() => handleRowClick(starship.url, 'starships')}
                style={{ cursor: 'pointer' }}
              >
                <td>{starship.name}</td>
                <td>{starship.model}</td>
                <td>{starship.manufacturer}</td>
                <td>{starship.cost_in_credits}</td>
                <td>{starship.length}</td>
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

export default StarshipsTable;