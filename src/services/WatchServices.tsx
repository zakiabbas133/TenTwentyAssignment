import Constants from 'expo-constants';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = Constants.expoConfig?.extra?.apiKey;

export interface MovieSummary {
    id: number;
    title: string;
    poster_path: string;
}

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genres?: Array<{ id: number; name: string }>;
}

interface MovieListResponse {
    results?: MovieSummary[];
}

interface MovieTrailerResponse {
    results?: Array<{ key?: string }>;
}

export const getUpcomingMovies = async (): Promise<MovieSummary[]> => {
    try {
        const response = await fetch(
            `${BASE_URL}/discover/movie`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            },
        );

        const data = (await response.json()) as MovieListResponse;

        return data?.results ?? [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            },
        );

        const data = (await response.json()) as MovieDetails;

        return data || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getMovieTrailer = async (movieId: number): Promise<string> => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}/videos`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            },
        );

        const data = (await response.json()) as MovieTrailerResponse;
        const url = data?.results?.[0]?.key;
        return url || '';
    } catch (error) {
        console.error(error);
        return '';
    }
};