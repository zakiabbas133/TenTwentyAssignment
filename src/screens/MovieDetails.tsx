import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getMovieDetails, getMovieTrailer, IMAGE_BASE_URL, MovieDetails as MovieDetailsType } from "../services/WatchServices";
import { MovieDetailsSvg } from "../../assets/svgs/MovieDetails";
import Modal from 'react-native-modal';
import YoutubePlayer from "react-native-youtube-iframe";
import moment from "moment";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetails'>;

const MovieDetails: React.FC<Props> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const movieId = route.params.movieId;
    const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);
    const [trailer, setTrailer] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const colors = ['#15D2BC', '#E26CA5', '#564CA3', '#CD9D0F'];
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
        }
        else {
            setPlaying(true);
        }
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const getDetails = async () => {
        setLoading(true);
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
    }

    const getTrailer = async () => {
        const videoTrailer = await getMovieTrailer(movieId);
        setTrailer(videoTrailer)
        setLoading(false);
    }

    useEffect(() => {
        getDetails();
        getTrailer();
    }, [])

    return (
        loading
            ?
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'large'} />
            </View>
            :
            <View style={styles.container}>
                <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                    <View style={styles.modalCenter}>
                        <YoutubePlayer
                            height={300}
                            width={Dimensions.get('screen').width}
                            play={playing}
                            videoId={trailer}
                            onChangeState={onStateChange}
                        />
                    </View>
                </Modal>

                <ImageBackground source={{ uri: IMAGE_BASE_URL + movieDetails?.poster_path }} style={styles.imageBackground}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { top: insets.top + 20 }]}>
                        <SvgXml xml={MovieDetailsSvg.back} />
                        <Text style={styles.backButtonText}>Watch</Text>
                    </TouchableOpacity>

                    <Text style={styles.releaseDateText}>In theaters {moment(movieDetails?.release_date).format('MMMM DD, YYYY')}</Text>

                    <TouchableOpacity onPress={() => {
                        if (!movieDetails) return;
                        navigation.navigate('BookTicket', {
                            title: movieDetails.title,
                            releaseDate: moment(movieDetails.release_date).format('MMMM DD, YYYY')
                        });
                    }} style={styles.ticketButton}>
                        <Text style={styles.ticketButtonText}>Get Tickets</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleModal} style={styles.trailerButton}>
                        <SvgXml xml={MovieDetailsSvg.play} />
                        <Text style={styles.trailerButtonText}>Watch Trailer</Text>
                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.flexOne}>
                    <ScrollView style={styles.bodyScroll}>
                        <Text style={styles.sectionTitle}>Genres</Text>

                        <View>
                            <ScrollView horizontal contentContainerStyle={styles.genreScrollContent} style={styles.genreScrollView}>
                                {
                                    movieDetails?.genres?.map((genre) => {
                                        return (
                                            <View key={genre.id} style={[styles.genreChip, { backgroundColor: getRandomColor() }]}>
                                                <Text style={styles.genreText}>{genre?.name}</Text>
                                            </View>
                                        )
                                    })
                                }

                            </ScrollView>
                        </View>

                        <Text style={styles.sectionTitleWithMargin}>Overview</Text>

                        <Text style={styles.overviewText}>{movieDetails?.overview}</Text>
                    </ScrollView>
                </View>
            </View>
    )
}

export default MovieDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        height: Dimensions.get('screen').height / 2,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
    releaseDateText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
    ticketButton: {
        backgroundColor: '#61C3F2',
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
        paddingVertical: 15,
    },
    ticketButtonText: {
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
    },
    trailerButton: {
        borderColor: '#61C3F2',
        borderWidth: 1,
        borderRadius: 10,
        width: '60%',
        justifyContent: 'center',
        paddingVertical: 15,
        flexDirection: 'row',
        gap: 10,
    },
    trailerButtonText: {
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
    },
    flexOne: {
        flex: 1,
    },
    bodyScroll: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        color: '#202C43',
        fontFamily: 'Poppins-SemiBold',
    },
    sectionTitleWithMargin: {
        color: '#202C43',
        fontFamily: 'Poppins-SemiBold',
        marginTop: 20,
    },
    genreScrollContent: {
        flexGrow: 1,
        gap: 10,
    },
    genreScrollView: {
        marginTop: 20,
    },
    genreChip: {
        borderRadius: 99,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    genreText: {
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
    },
    overviewText: {
        color: '#8F8F8F',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        marginTop: 20,
    },
    video: {
        width: Dimensions.get('screen').width,
        height: 275,
    },
    videoThumbNail: {
        width: '100%',
        height: 275,
        backgroundColor: '#fff',
    },
});