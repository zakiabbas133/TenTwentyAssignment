import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { IMAGE_BASE_URL, type MovieSummary } from "../../services/WatchServices";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../../navigation/types";

interface RenderSearchMovieProps {
    data: MovieSummary;
    navigation: NativeStackNavigationProp<RootStackParamList>;
}

const RenderSearchMovie: React.FC<RenderSearchMovieProps> = ({ data, navigation }) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('MovieDetails', {
                movieId: data.id,
            });
        }} key={data?.id}>
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

export default RenderSearchMovie;

const styles = StyleSheet.create({
    image: {
        width: (Dimensions.get('screen').width / 2) - 30,
        height: 180,
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