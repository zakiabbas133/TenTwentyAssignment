import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import TicketTimeSlot from "../components/MovieDetails/TicketTimeSlot";
import { SvgXml } from "react-native-svg";
import { BookTicketSvg } from "../../assets/svgs/BookTicket";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "BookTicket">;

const BookTicket: React.FC<Props> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const releaseDate = route.params?.releaseDate ?? '';
    const title = route.params?.title ?? '';
    const dates = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    });

    const [date, setDate] = useState<string>(
        `${dates[0].getDate()} ${dates[0].toLocaleString('default', {
            month: 'long',
        })}`
    );
    const [time, setTime] = useState<number>(1);

    return (
        <KeyboardAvoidingView
            style={styles.main}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
        >
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <View style={styles.headerSide}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <SvgXml xml={BookTicketSvg.back} />
                    </TouchableOpacity>
                </View>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitleText}>{title}</Text>
                    <Text style={styles.headerSubtitleText}>In theaters {releaseDate}</Text>
                </View>

                <View style={styles.headerSide} />
            </View>

            <ScrollView style={styles.contentContainer}>
                <Text style={styles.sectionTitle}>Date</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScrollContainer}
                >
                    {dates.map((item, index) => {
                        const formattedDate = `${item.getDate()} ${item.toLocaleString('default', {
                            month: 'long',
                        })}`;

                        return (
                            <TouchableOpacity
                                key={item.toISOString()}
                                onPress={() => setDate(formattedDate)}
                                style={[
                                    styles.dateButton,
                                    {
                                        backgroundColor:
                                            date === formattedDate ? '#61C3F2' : '#A6A6A61A',
                                    },
                                    index !== 0 && styles.dateButtonMargin,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dateButtonText,
                                        {
                                            color: date === formattedDate ? '#fff' : '#202C43',
                                        },
                                    ]}
                                >
                                    {formattedDate}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScrollContainer}
                >
                    <TicketTimeSlot
                        timeId={1}
                        selectedTime={time}
                        onSelect={setTime}
                        timeLabel="12:30"
                        venue="Cinetech + hall 1"
                        price="50$"
                        bonus="2500 bonus"
                    />

                    <TicketTimeSlot
                        timeId={2}
                        selectedTime={time}
                        onSelect={setTime}
                        timeLabel="14:30"
                        venue="Cinetech + hall 2"
                        price="75$"
                        bonus="3000 bonus"
                        style={styles.ticketTimeSlotMargin}
                    />
                </ScrollView>
            </ScrollView>

            <View
                style={[styles.footerContainer, { paddingBottom: insets.bottom }]}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Pay", { date, time, title })}
                    style={styles.selectSeatsButton}
                >
                    <Text style={styles.selectSeatsButtonText}>Select Seats</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default BookTicket;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: "#FFFFFF",
    },
    headerSide: {
        width: "15%",
    },
    headerCenter: {
        flex: 1,
    },
    headerTitleText: {
        color: "#202C43",
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'Poppins-SemiBold'
    },
    headerSubtitleText: {
        color: "#61C3F2",
        fontSize: 12,
        textAlign: "center",
        marginTop: 3,
        fontFamily: 'Poppins-SemiBold'
    },
    contentContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        color: "#202C43",
        fontFamily: 'Poppins-SemiBold'
    },
    horizontalScrollContainer: {
        marginTop: 20,
    },
    dateButton: {
        borderRadius: 99,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dateButtonMargin: {
        marginLeft: 10,
    },
    dateButtonText: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium'
    },
    footerContainer: {
        paddingHorizontal: 20,
        justifyContent: "flex-end",
    },
    ticketTimeSlotMargin: {
        marginLeft: 20,
    },
    selectSeatsButton: {
        backgroundColor: "#61C3F2",
        paddingVertical: 15,
        width: "100%",
        borderRadius: 10,
    },
    selectSeatsButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
    },
});
