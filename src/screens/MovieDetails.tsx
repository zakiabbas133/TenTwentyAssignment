import React from "react";
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IMAGE_BASE_URL } from "../services/moviesApi";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Entypo from "@expo/vector-icons/Entypo";
import MovieGenreTag from "../components/MovieGenreTag";

type RootStackParamList = {
    MovieDetails: { movieDetails: MovieDetailsType };
    BookTicket: undefined;
};

type MovieDetailsType = {
    poster_path: string;
    release_date: string;
    overview: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "MovieDetails">;

const MovieDetails: React.FC<Props> = ({ route, navigation }) => {
    const { movieDetails: details } = route.params;
    const insets = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            style={styles.main}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
        >
            <ImageBackground
                source={{ uri: `${IMAGE_BASE_URL}${details.poster_path}` }}
                style={styles.imageBackground}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.backButton, { marginTop: insets.top }]}
                >
                    <Entypo name="chevron-thin-left" size={24} color="#FFFFFF" />
                    <Text style={styles.backButtonText}>Watch</Text>
                </TouchableOpacity>

                <View style={[styles.detailsContainer, { marginTop: insets.top + 20 }]}>
                    <Text style={styles.releaseDateText}>
                        In theaters {details.release_date}
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("BookTicket")}
                        style={styles.getTicketsButton}
                    >
                        <Text style={styles.getTicketsButtonText}>Get Tickets</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.watchTrailerButton}>
                        <View style={styles.watchTrailerContent}>
                            <Entypo name="controller-play" size={14} color="#FFFFFF" />
                            <Text style={styles.watchTrailerText}>Watch Trailer</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.85)"]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.gradient}
                />
            </ImageBackground>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentContainer}>
                    <Text style={styles.sectionTitle}>Genres</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.genresContainer}
                    >
                        <MovieGenreTag bgColor="#15D2BC" text="Action" />
                        <MovieGenreTag bgColor="#E26CA5" text="Thriller" />
                        <MovieGenreTag bgColor="#564CA3" text="Science" />
                        <MovieGenreTag bgColor="#CD9D0F" text="Fiction" />
                    </ScrollView>

                    <Text style={styles.sectionTitle}>Overview</Text>

                    <Text style={styles.overviewText}>{details.overview}</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default MovieDetails;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    imageBackground: {
        height: Dimensions.get("screen").height / 2,
        padding: 20,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        marginLeft: 20,
    },
    backButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 20,
    },
    detailsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 20,
    },
    releaseDateText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",
        position: "relative",
        zIndex: 9,
    },
    getTicketsButton: {
        backgroundColor: "#61C3F2",
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        width: "60%",
        alignItems: "center",
        position: "relative",
        zIndex: 9,
    },
    getTicketsButtonText: {
        fontWeight: "600",
        color: "#FFFFFF",
        textAlign: "center",
    },
    watchTrailerButton: {
        borderColor: "#61C3F2",
        borderWidth: 1,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        width: "60%",
        alignItems: "center",
        position: "relative",
        zIndex: 9,
    },
    watchTrailerContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    watchTrailerText: {
        fontWeight: "600",
        color: "#FFFFFF",
        textAlign: "center",
        marginLeft: 10,
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50%",
    },
    scrollViewContent: {
        flexGrow: 1
    },
    contentContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#202C43",
        marginTop: 20
    },
    genresContainer: {
        marginTop: 20,
    },
    overviewText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#8F8F8F",
        marginTop: 20,
    },
});
