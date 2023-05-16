type Film = string;
type Species = string;
type Vehicle = string;
type Starship = string;

export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Film[];
  species: Species[];
  vehicles: Vehicle[];
  starships: Starship[];
  created: string;
  edited: string;
  url: string;
};

export type PeopleListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};

export type Data = {
  count: number;
  next: string;
  previous: string;
  results: Person[];
};
