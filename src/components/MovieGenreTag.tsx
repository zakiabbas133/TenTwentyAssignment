import { StyleSheet, Text, View } from "react-native";

type MovieGenreTagType = {
    bgColor: string;
    text: string;
};

const MovieGenreTag: React.FC<MovieGenreTagType> = ({ bgColor, text }) => {
    return (
        <View style={[styles.genreTag, { backgroundColor: bgColor }]}>
            <Text style={styles.genreText}>{text}</Text>
        </View>
    )
}

export default MovieGenreTag;

const styles = StyleSheet.create({
    genreTag: {
        borderRadius: 99,
        marginLeft: 5
    },
    genreText: {
        color: "#FFFFFF",
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-SemiBold'
    },
});