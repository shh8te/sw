export const API_BASE_URL = "https://swapi.dev/api";

export const API_ROUTES = {
  CHARACTERS: "/characters",
  CURRENT_CHARACTER(name: string = ":name") {
    return `${this.CHARACTERS}/${name}`;
  },
};

export const API_SEARCH_INPUT_DELAY = 500;
