import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Planet, PaginatedResponse } from '../../api/types';
import { api } from '../../api/swapi';
import Pagination from '../common/Pagination';

const PlanetsTable: React.FC = () => {
  const [data, setData] = useState<PaginatedResponse<Planet> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getPlanets(currentPage);
        setData(response);
      } catch (error) {
        console.error('Error fetching planets:', error);
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
      <h2 className="mb-4">Star Wars Planets</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Climate</th>
              <th>Terrain</th>
              <th>Population</th>
              <th>Diameter</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((planet) => (
              <tr
                key={planet.url}
                onClick={() => handleRowClick(planet.url, 'planets')}
                style={{ cursor: 'pointer' }}
              >
                <td>{planet.name}</td>
                <td>{planet.climate}</td>
                <td>{planet.terrain}</td>
                <td>{planet.population}</td>
                <td>{planet.diameter}</td>
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

export default PlanetsTable;