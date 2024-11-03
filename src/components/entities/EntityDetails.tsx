import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Person, Planet, Starship } from '../../api/types';
import axios from 'axios';
import Loader from '../common/Loader';


const personSchema = yup.object({
  name: yup.string().required('Name is required'),
  height: yup.string().required('Height is required'),
  mass: yup.string().required('Mass is required'),
  birth_year: yup.string().required('Birth year is required'),
  gender: yup.string().required('Gender is required')
}).required();

const planetSchema = yup.object({
  name: yup.string().required('Name is required'),
  climate: yup.string().required('Climate is required'),
  terrain: yup.string().required('Terrain is required'),
  population: yup.string().required('Population is required'),
  diameter: yup.string().required('Diameter is required')
}).required();

const starshipSchema = yup.object({
  name: yup.string().required('Name is required'),
  model: yup.string().required('Model is required'),
  manufacturer: yup.string().required('Manufacturer is required'),
  cost_in_credits: yup.string().required('Cost is required'),
  length: yup.string().required('Length is required')
}).required();

type PersonFormData = Omit<Person, 'url'>;
type PlanetFormData = Omit<Planet, 'url'>;
type StarshipFormData = Omit<Starship, 'url'>;

type EntityFormData = PersonFormData | PlanetFormData | StarshipFormData;

const PersonForm: React.FC<{
  data: PersonFormData;
  onSubmit: (data: PersonFormData) => void;
  onCancel: () => void;
}> = ({ data, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonFormData>({
    resolver: yupResolver(personSchema),
    defaultValues: data
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Height</label>
        <input {...register('height')} className={`form-control ${errors.height ? 'is-invalid' : ''}`} />
        {errors.height && <div className="invalid-feedback">{errors.height.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Mass</label>
        <input {...register('mass')} className={`form-control ${errors.mass ? 'is-invalid' : ''}`} />
        {errors.mass && <div className="invalid-feedback">{errors.mass.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Birth Year</label>
        <input {...register('birth_year')} className={`form-control ${errors.birth_year ? 'is-invalid' : ''}`} />
        {errors.birth_year && <div className="invalid-feedback">{errors.birth_year.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Gender</label>
        <input {...register('gender')} className={`form-control ${errors.gender ? 'is-invalid' : ''}`} />
        {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

const PlanetForm: React.FC<{
  data: PlanetFormData;
  onSubmit: (data: PlanetFormData) => void;
  onCancel: () => void;
}> = ({ data, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PlanetFormData>({
    resolver: yupResolver(planetSchema),
    defaultValues: data
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Climate</label>
        <input {...register('climate')} className={`form-control ${errors.climate ? 'is-invalid' : ''}`} />
        {errors.climate && <div className="invalid-feedback">{errors.climate.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Terrain</label>
        <input {...register('terrain')} className={`form-control ${errors.terrain ? 'is-invalid' : ''}`} />
        {errors.terrain && <div className="invalid-feedback">{errors.terrain.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Population</label>
        <input {...register('population')} className={`form-control ${errors.population ? 'is-invalid' : ''}`} />
        {errors.population && <div className="invalid-feedback">{errors.population.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Diameter</label>
        <input {...register('diameter')} className={`form-control ${errors.diameter ? 'is-invalid' : ''}`} />
        {errors.diameter && <div className="invalid-feedback">{errors.diameter.message}</div>}
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

const StarshipForm: React.FC<{
  data: StarshipFormData;
  onSubmit: (data: StarshipFormData) => void;
  onCancel: () => void;
}> = ({ data, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<StarshipFormData>({
    resolver: yupResolver(starshipSchema),
    defaultValues: data
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Model</label>
        <input {...register('model')} className={`form-control ${errors.model ? 'is-invalid' : ''}`} />
        {errors.model && <div className="invalid-feedback">{errors.model.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Manufacturer</label>
        <input {...register('manufacturer')} className={`form-control ${errors.manufacturer ? 'is-invalid' : ''}`} />
        {errors.manufacturer && <div className="invalid-feedback">{errors.manufacturer.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Cost in Credits</label>
        <input {...register('cost_in_credits')} className={`form-control ${errors.cost_in_credits ? 'is-invalid' : ''}`} />
        {errors.cost_in_credits && <div className="invalid-feedback">{errors.cost_in_credits.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Length</label>
        <input {...register('length')} className={`form-control ${errors.length ? 'is-invalid' : ''}`} />
        {errors.length && <div className="invalid-feedback">{errors.length.message}</div>}
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

const EntityDetails: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [originalEntity, setOriginalEntity] = useState<Person | Planet | Starship | null>(null);
  const [editedEntity, setEditedEntity] = useState<Person | Planet | Starship | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntity = async () => {
      setLoading(true);
      setError(null);

      try {

        const response = await axios.get(`https://swapi.dev/api/${type}/${id}/`);
        
        if (response.data) {
          let filteredData: Person | Planet | Starship | null = null;

        if (type === 'people') {
          const { name, height, mass, birth_year, gender, url } = response.data;
          filteredData = { name, height, mass, birth_year, gender, url };
        } else if (type === 'planets') {
          const { name, climate, terrain, population, diameter, url } = response.data;
          filteredData = { name, climate, terrain, population, diameter, url };
        } else if (type === 'starships') {
          const { name, model, manufacturer, cost_in_credits, length, url } = response.data;
          filteredData = { name, model, manufacturer, cost_in_credits, length, url };
        }

        setOriginalEntity(filteredData);
        setEditedEntity(filteredData);
        } else {
          throw new Error('No data received from API');
        }
      } catch (error) {
        console.error('Error fetching entity:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch entity');
      } finally {
        setLoading(false);
      }
    };

    if (type && id) {
      fetchEntity();
    }
  }, [type, id]);

  

  const handleSubmit = (formData: EntityFormData) => {
    if (originalEntity) {
      const updatedEntity = {
        ...formData,
        url: originalEntity.url
      } as Person | Planet | Starship;
      
      setEditedEntity(updatedEntity);
      setEditMode(false);
      setSuccessMessage('Changes saved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleCancel = () => {
    setEditedEntity(originalEntity);
    setEditMode(false);
  };

  const handleReset = () => {
    setEditedEntity(originalEntity);
    setSuccessMessage('Changes reverted to original!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  if (loading) {
    return (
      <Loader></Loader>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4>Error Loading Entity</h4>
          <p>{error}</p>
          <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
            Back to List
          </button>
        </div>
      </div>
    );
  }

  if (!editedEntity) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Entity not found</div>
      </div>
    );
  }

  const formProps = {
    data: editedEntity as EntityFormData,
    onSubmit: handleSubmit,
    onCancel: handleCancel
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">{editedEntity.name}</h2>
          <div className="d-flex gap-2">
            {!editMode && (
              <>
                <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                  Edit
                </button>
                {JSON.stringify(editedEntity) !== JSON.stringify(originalEntity) && (
                  <button className="btn btn-warning" onClick={handleReset}>
                    Reset Changes
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="card-body">
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {editMode ? (
            <>
              {type === 'people' && <PersonForm {...formProps as { data: PersonFormData, onSubmit: (data: PersonFormData) => void, onCancel: () => void }} />}
              {type === 'planets' && <PlanetForm {...formProps as { data: PlanetFormData, onSubmit: (data: PlanetFormData) => void, onCancel: () => void }} />}
              {type === 'starships' && <StarshipForm {...formProps as { data: StarshipFormData, onSubmit: (data: StarshipFormData) => void, onCancel: () => void }} />}
            </>
          ) : (
            <div className="row">
              {Object.entries(editedEntity).map(([key, value]) => (
                key !== 'url' && (
                  <div key={key} className="col-md-6 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">
                          {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </h6>
                        <p className="card-text">{value}</p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
        <div className="card-footer">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntityDetails;