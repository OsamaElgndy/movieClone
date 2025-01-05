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
}

