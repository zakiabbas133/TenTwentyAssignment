import { ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";
import { IMAGE_BASE_URL } from "../services/moviesApi";
import { LinearGradient } from "expo-linear-gradient";

interface Movie {
    id: number;
    original_title: string;
    poster_path: string;
}

interface RenderMovieProps {
    data: Movie;
    index: number;
    listOrGrid: number;
    navigation: any;
}

const RenderMovie: React.FC<RenderMovieProps> = ({ data, listOrGrid, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('MovieDetails', { movieDetails: data })
            }
            style={{
                width: listOrGrid === 1 ? '48%' : '100%',
                height: 200,
                marginTop: 20,
            }}
        >
            <ImageBackground
                source={{ uri: `${IMAGE_BASE_URL}${data.poster_path}` }}
                imageStyle={{ borderRadius: 20 }}
                style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.85)']}
                    style={styles.gradient}
                />

                <Text style={styles.movieTitle}>{data.original_title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default RenderMovie;

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    movieTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
});

