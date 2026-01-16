import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TimeSlotProps = {
    timeId: number;
    selectedTime: number;
    onSelect: (id: number) => void;
    timeLabel: string;
    venue: string;
    price: string;
    bonus: string;
    style?: object;
};

const TicketTimeSlot: React.FC<TimeSlotProps> = ({
    timeId,
    selectedTime,
    onSelect,
    timeLabel,
    venue,
    price,
    bonus,
    style,
}) => {
    const isSelected = selectedTime === timeId;

    return (
        <View style={style}>
            <Text style={styles.timeLabel}>
                {timeLabel}
                <Text style={styles.timeVenueText}>       {venue}</Text>
            </Text>

            <TouchableOpacity
                onPress={() => onSelect(timeId)}
                style={[styles.theatreButton, { borderColor: isSelected ? "#61C3F2" : "#202C43" }]}
            >
                <ImageBackground
                    source={require("../../assets/theatre.png")}
                    style={styles.theatreImage}
                />
            </TouchableOpacity>

            <Text style={styles.priceText}>
                From <Text style={styles.priceHighlight}>{price}</Text> or{" "}
                <Text style={styles.priceHighlight}>{bonus}</Text>
            </Text>
        </View>
    );
};

export default TicketTimeSlot;

const styles = StyleSheet.create({
    timeLabel: {
        fontSize: 12,
        color: "#202C43",
        fontFamily: 'Poppins-SemiBold'
    },
    timeVenueText: {
        color: "#8F8F8F",
        fontFamily: 'Poppins-Regular'
    },
    theatreButton: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 30,
    },
    theatreImage: {
        width: Dimensions.get("screen").width / 2,
        height: 160,
    },
    priceText: {
        marginTop: 20,
        color: "#8F8F8F",
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    priceHighlight: {
        color: "#202C43",
        fontFamily: 'Poppins-SemiBold'
    },
});