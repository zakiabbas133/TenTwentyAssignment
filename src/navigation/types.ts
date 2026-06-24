import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MovieSummary } from '../services/WatchServices';

export type RootStackParamList = {
    TenTwentyTabs: undefined;
    MovieDetails: { movieId: number };
    BookTicket: { title: string; releaseDate: string };
    Pay: { date: string; time: number; title: string };
    Search: { movies: MovieSummary[] };
};

export type BottomTabParamList = {
    Dashboard: undefined;
    Watch: undefined;
    Media: undefined;
    More: undefined;
};

export type WatchNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, 'Watch'>,
    NativeStackNavigationProp<RootStackParamList>
>;

export type WatchScreenProps = {
    navigation: WatchNavigationProp;
};
