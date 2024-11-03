export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }
  
  export interface Person {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    gender: string;
    url: string;
  }
  
  export interface Planet {
    name: string;
    climate: string;
    terrain: string;
    population: string;
    diameter: string;
    url: string;
  }
  
  export interface Starship {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    url: string;
  }