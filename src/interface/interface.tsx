export const urlApi = import.meta.env.VITE_REACT_APP_API_KEY;


export interface Movie {
 Title: string
 Year: string
 imdbID: string
 Type: string
 Poster: string
}

// Define the state structure for movie search
export  interface MoviesState {
 entities: Movie[]
 isLoading: boolean; // Add this line
  error: string | null

}
export interface MovieDetailsState {
  movieDetails: Movie[];
  isLoading: boolean;
  error: string | null;
}
export  interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface Rating {
  Source: string;
  Value: string;
}