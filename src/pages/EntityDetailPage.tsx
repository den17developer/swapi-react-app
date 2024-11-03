import React from 'react';
import { useParams } from 'react-router-dom';
import EntityDetails from '../components/entities/EntityDetails';

const EntityDetailPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  console.log("Type:", type, "ID:", id, 'page');
  return (
    <div>
      <h1>Entity Detail for {type}: {id}</h1>
      <EntityDetails />
    </div>
  );
};

export default EntityDetailPage;
