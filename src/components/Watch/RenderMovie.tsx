import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { IMAGE_BASE_URL } from "../../services/WatchServices";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

type MovieDetailsNavigator = {
    navigate: (screen: 'MovieDetails', params: { movieId: number }) => void;
};

interface RenderMovieProps {
    data: Movie;
    navigation: MovieDetailsNavigator;
}

const RenderMovie: React.FC<RenderMovieProps> = ({ data, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', {
            movieId: data?.id
        })} key={data?.id}>
            <ImageBackground source={{ uri: IMAGE_BASE_URL + data?.poster_path }} style={styles.image} imageStyle={styles.imageRadius}>
                <LinearGradient
                    colors={['transparent', '#000000']}
                    style={styles.gradient}>
                    <Text style={styles.title}>{data?.title}</Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default RenderMovie;

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 200,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    imageRadius: {
        borderRadius: 16,
    },
    gradient: {
        width: '100%',
        justifyContent: 'flex-end',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        padding: 20
    },
    title: {
        color: '#fff',
        fontFamily: 'Poppins-Medium',
        fontSize: 18
    },
});