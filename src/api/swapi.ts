import axios from 'axios';
import { PaginatedResponse, Person, Planet, Starship } from './types';

const BASE_URL = 'https://swapi.dev/api';

export const api = {
  async getPeople(page: number): Promise<PaginatedResponse<Person>> {
    const response = await axios.get(`${BASE_URL}/people/?page=${page}`);
    return response.data;
  },

  async getPlanets(page: number): Promise<PaginatedResponse<Planet>> {
    const response = await axios.get(`${BASE_URL}/planets/?page=${page}`);
    return response.data;
  },

  async getStarships(page: number): Promise<PaginatedResponse<Starship>> {
    const response = await axios.get(`${BASE_URL}/starships/?page=${page}`);
    return response.data;
  },

  // async getEntityById(type: 'people' | 'planets' | 'starships', id: string) {
  //   const response = await axios.get(`${BASE_URL}/${type}/${id}/`);
  //   return response.data;
  // }
};