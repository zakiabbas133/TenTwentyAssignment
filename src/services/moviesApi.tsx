export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmU5YTFiNmY4NGMzMTIwOTk0ODk4YzU2ZDQxNTExNCIsIm5iZiI6MTc2ODQ5MDk5Ni43NTcsInN1YiI6IjY5NjkwN2Y0NDU4MmU3ZDkxOTIzNmJkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FK-8XyrDMmK5t9cXnZoLxTUfbZOpIC_152rCSz8O-JE';

export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
}

export interface DiscoverMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export const getPopularMovies = async (
    page: number = 1
): Promise<DiscoverMoviesResponse> => {
    const url = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: 'application/json',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`TMDB Error (${response.status}): ${errorText}`);
    }

    return response.json();
};
