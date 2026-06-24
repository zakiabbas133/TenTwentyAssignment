import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { WatchSvg } from "../../assets/svgs/Watch";
import RenderMovie from "../components/Watch/RenderMovie";
import { useEffect, useState } from "react";
import { getUpcomingMovies, type MovieSummary } from "../services/WatchServices";
import type { WatchScreenProps } from "../navigation/types";

const Watch: React.FC<WatchScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [movies, setMovies] = useState<MovieSummary[]>([]);

    const getMovies = async () => {
        const moviesList = await getUpcomingMovies();
        setMovies(moviesList)
    }

    useEffect(() => {
        getMovies();
    }, [])

    return (
        <View style={styles.container}>
            <View style={[styles.headerContainerWithInset, { paddingTop: insets.top + 20 }]}>
                <Text style={styles.watchTitle}>Watch</Text>

                <TouchableOpacity style={styles.search} onPress={() => navigation.navigate('Search', { movies })}>
                    <SvgXml xml={WatchSvg.search} />
                </TouchableOpacity>
            </View>

            <FlatList data={movies} renderItem={({ item }) => {
                return (
                    <RenderMovie
                        data={item}
                        navigation={navigation}
                    />
                )
            }} contentContainerStyle={styles.watchListContent} />
        </View>
    )
}

export default Watch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6FA',
    },
    headerContainerWithInset: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#fff'
    },
    watchTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#202C43',
    },
    search: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    watchListContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 20,
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})