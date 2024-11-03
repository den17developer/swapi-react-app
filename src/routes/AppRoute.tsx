import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import LoginPage from '../pages/LoginPage';
import PeoplePage from '../pages/PeoplePage';
import PlanetsPage from '../pages/PlanetsPage';
import StarshipsPage from '../pages/StarshipsPage';
import PrivateRoute from './PrivateRoute';
import EntityDetailPage from '../pages/EntityDetailPage';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/people" replace /> : <LoginPage />
        } 
      />
      <Route
        path="/people"
        element={
          <PrivateRoute>
            <PeoplePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/:type/:id"
        element={
          <PrivateRoute>
            <EntityDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/planets"
        element={
          <PrivateRoute>
            <PlanetsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/starships"
        element={
          <PrivateRoute>
            <StarshipsPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/people" replace />} />
      <Route path="*" element={<Navigate to="/people" replace />} />
    </Routes>
  );
};

export default AppRoutes;