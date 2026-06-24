import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { WatchSvg } from "../../assets/svgs/Watch";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../navigation/types";
import type { MovieSummary } from "../services/WatchServices";
import RenderMovie from "../components/Watch/RenderMovie";
import RenderSearchMovie from "../components/Watch/RenderSearchMovie";

const Search: React.FC<NativeStackScreenProps<RootStackParamList, 'Search'>> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const movies = route.params.movies;
    const [search, setSearch] = useState("");
    const [filteredMovies, setFilteredMovies] = useState<MovieSummary[]>(movies);

    useEffect(() => {
        setFilteredMovies(movies);
    }, [movies]);

    const handleSearchChange = (text: string) => {
        setSearch(text);
        const trimmed = text.trim().toLowerCase();

        if (!trimmed) {
            setFilteredMovies(movies);
            return;
        }

        setFilteredMovies(
            movies.filter(movie =>
                movie.title.toLowerCase().includes(trimmed)
            )
        );
    };

    const emptyComponent = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No movie found!</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <View style={styles.searchBar}>
                    <SvgXml xml={WatchSvg.search} />

                    <TextInput
                        placeholder="TV shows, movies and more"
                        placeholderTextColor="#202C434D"
                        value={search}
                        onChangeText={handleSearchChange}
                        style={styles.searchInput}
                    />

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <SvgXml xml={WatchSvg.close} />
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardAvoiding}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0}
            >
                <FlatList
                    data={filteredMovies}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <RenderSearchMovie
                            data={item}
                            navigation={navigation}
                        />
                    )}
                    numColumns={2}
                    contentContainerStyle={styles.watchListContent}
                    columnWrapperStyle={styles.columnWrapper}
                    ListEmptyComponent={emptyComponent}
                />
            </KeyboardAvoidingView>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F6',
        borderColor: '#EFEFEF',
        borderWidth: 1,
        borderRadius: 99,
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        color: '#000',
        zIndex: 999,
    },
    keyboardAvoiding: {
        flex: 1,
    },
    watchListContent: {
        flexGrow: 1,
        gap: 20,
        paddingVertical: 20,
    },
    columnWrapper: {
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#202C43',
    },
});