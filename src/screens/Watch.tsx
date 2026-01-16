import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getPopularMovies } from "../services/moviesApi";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import RenderMovie from "../components/RenderMovie";

interface Movie {
    id: number;
    original_title: string;
    poster_path: string;
}

interface MoviesResponse {
    results: Movie[];
}

interface WatchProps {
    navigation: any;
}

const Watch: React.FC<WatchProps> = ({ navigation }) => {
    const animation = useRef(new Animated.Value(0)).current;
    const inputRef = useRef<TextInput>(null);
    const insets = useSafeAreaInsets();

    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<MoviesResponse | null>(null);
    const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
    const [listOrGrid, setListOrGrid] = useState<number>(2);
    const [search, setSearch] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openSearch = (): void => {
        setIsOpen(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => inputRef.current?.focus());
    };

    const closeSearch = (): void => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
        }).start(() => setIsOpen(false));
    };

    const searchMovies = (query: string): void => {
        if (!movies) return;

        if (query.trim() === "") {
            setSearchedMovies(movies.results);
            setSearch("");
            return;
        }

        setSearch(query);

        const filtered = movies.results.filter((movie) =>
            movie.original_title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchedMovies(filtered);
    };

    const animatedWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Dimensions.get("screen").width / 1.6],
    });

    const getMovies = async (): Promise<void> => {
        setLoading(true);
        const response = await getPopularMovies(1);
        setMovies(response);
        setSearchedMovies(response.results);
        setLoading(false);
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View
                style={[
                    styles.headerContainer,
                    { paddingTop: insets.top + 20, paddingBottom: 20 },
                ]}
            >
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>Watch</Text>

                    {!isOpen && (
                        <TouchableOpacity onPress={openSearch}>
                            <Entypo name="magnifying-glass" size={24} color="black" />
                        </TouchableOpacity>
                    )}

                    {isOpen && (
                        <Animated.View style={[styles.searchBox, { width: animatedWidth }]}>
                            <TextInput
                                ref={inputRef}
                                placeholder="Search..."
                                style={styles.searchInput}
                                onChangeText={searchMovies}
                                onBlur={closeSearch}
                                value={search}
                            />
                        </Animated.View>
                    )}
                </View>
            </View>

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" />
                </View>
            ) : searchedMovies.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No movies found.</Text>
                </View>
            ) : (
                <>
                    <View style={styles.toggleContainer}>
                        <Text style={styles.movieCount}>Movies: {searchedMovies.length}</Text>
                        <View style={styles.toggleButtons}>
                            <TouchableOpacity onPress={() => setListOrGrid(2)}>
                                <Ionicons name="list" size={34} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setListOrGrid(1)} style={styles.toggleButtonMargin}>
                                <Ionicons name="grid" size={34} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        data={searchedMovies}
                        key={listOrGrid}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={listOrGrid === 1 ? 2 : 1}
                        columnWrapperStyle={
                            listOrGrid === 1 ? { justifyContent: "space-between" } : undefined
                        }
                        contentContainerStyle={styles.moviesList}
                        renderItem={({ item, index }) => (
                            <RenderMovie
                                data={item}
                                index={index}
                                listOrGrid={listOrGrid}
                                navigation={navigation}
                            />
                        )}
                    />
                </>
            )}
        </KeyboardAvoidingView>
    );
};

export default Watch;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: "500",
        color: "#202C43",
    },
    searchBox: {
        backgroundColor: "#f1f1f1",
        borderRadius: 20,
        overflow: "hidden",
        justifyContent: "center",
        paddingVertical: 5,
    },
    searchInput: {
        paddingHorizontal: 16,
        fontSize: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        fontWeight: "700",
    },
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
    },
    movieCount: {
        fontSize: 16,
        fontWeight: "500",
    },
    toggleButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    toggleButtonMargin: {
        marginLeft: 10,
    },
    moviesList: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});
