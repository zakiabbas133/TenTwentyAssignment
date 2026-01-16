import React, { useEffect, useState } from "react";
import {
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getMovieVideos, IMAGE_BASE_URL } from "../services/moviesApi";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Entypo from "@expo/vector-icons/Entypo";
import MovieGenreTag from "../components/MovieGenreTag";
import { useVideoPlayer, VideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

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

    const [videoVisible, setVideoVisible] = useState<boolean>(false);
    const [videoSource, setVideoSource] = useState<string>("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");

    const player: VideoPlayer = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
    });

    const { isPlaying } = useEvent(
        player,
        "playingChange",
        { isPlaying: player.playing }
    );

    const openVideo = (): void => {
        setVideoVisible(true);
        player.play();
    };

    const closeVideo = (): void => {
        player.pause();
        player.currentTime = 0;
        setVideoVisible(false);
    };

    const getMovieVideo = async (): Promise<void> => {
        // setLoading(true);
        const response = await getMovieVideos(details.id);
        const trailer = response.results.find(
            v => v.type === 'Trailer' && v.site === 'YouTube'
        ) || response.results[0];
        const youtubeUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
        // setVideoSource(youtubeUrl);
        // setLoading(false);
    }

    useEffect(() => {
        getMovieVideo();
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.main}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/* 🎬 Video Overlay */}
            {videoVisible && (
                <View style={styles.videoOverlay}>
                    <View style={styles.videoContainer}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeVideo}
                        >
                            <Entypo name="cross" size={30} color="#FFFFFF" />
                        </TouchableOpacity>

                        <VideoView
                            style={styles.video}
                            player={player}
                            allowsPictureInPicture={false}
                        />
                    </View>
                </View>
            )}

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

                    <TouchableOpacity
                        style={styles.watchTrailerButton}
                        onPress={openVideo}
                    >
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
        marginLeft: 20,
        fontFamily: "Poppins-SemiBold",
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
        zIndex: 9,
        fontFamily: "Poppins-SemiBold",
    },

    getTicketsButton: {
        backgroundColor: "#61C3F2",
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        width: "60%",
        alignItems: "center",
        zIndex: 9,
    },

    getTicketsButtonText: {
        color: "#FFFFFF",
        fontFamily: "Poppins-SemiBold",
    },

    watchTrailerButton: {
        borderColor: "#61C3F2",
        borderWidth: 1,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        width: "60%",
        alignItems: "center",
        zIndex: 9,
    },

    watchTrailerContent: {
        flexDirection: "row",
        alignItems: "center",
    },

    watchTrailerText: {
        color: "#FFFFFF",
        marginLeft: 10,
        fontFamily: "Poppins-SemiBold",
    },

    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50%",
    },

    scrollViewContent: {
        flexGrow: 1,
    },

    contentContainer: {
        padding: 20,
    },

    sectionTitle: {
        fontSize: 16,
        color: "#202C43",
        marginTop: 20,
        fontFamily: "Poppins-SemiBold",
    },

    genresContainer: {
        marginTop: 20,
    },

    overviewText: {
        fontSize: 16,
        color: "#8F8F8F",
        marginTop: 20,
        fontFamily: "Poppins-Regular",
    },
    videoOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
    },

    videoContainer: {
        width: "100%",
        height: 250,
        borderRadius: 12,
        overflow: "hidden",
    },
    video: {
        width: "100%",
        height: "100%",
    },
    closeButton: {
        position: "absolute",
        top: 0,
        right: 10,
        zIndex: 10,
    },
});
