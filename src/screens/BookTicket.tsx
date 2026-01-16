import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Entypo from "@expo/vector-icons/Entypo";
import TicketTimeSlot from "../components/TicketTimeSlot";

type RootStackParamList = {
    BookTicket: undefined;
    Pay: { date: number; time: number };
};

type Props = NativeStackScreenProps<RootStackParamList, "BookTicket">;

const BookTicket: React.FC<Props> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [date, setDate] = useState<number>(5);
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
                        <Entypo name="chevron-thin-left" size={24} color="#000000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitleText}>The King’s Man</Text>
                    <Text style={styles.headerSubtitleText}>In theaters March 22, 2025</Text>
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
                    {[5, 6, 7, 8, 9].map((d, index) => (
                        <TouchableOpacity
                            key={d}
                            onPress={() => setDate(d)}
                            style={[
                                styles.dateButton,
                                { backgroundColor: date === d ? "#61C3F2" : "#A6A6A61A" },
                                index !== 0 && styles.dateButtonMargin,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dateButtonText,
                                    { color: date === d ? "#fff" : "#202C43" },
                                ]}
                            >
                                {d} March
                            </Text>
                        </TouchableOpacity>
                    ))}
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
                        style={{ marginLeft: 20 }}
                    />
                </ScrollView>
            </ScrollView>

            <View
                style={[styles.footerContainer, { paddingBottom: insets.bottom }]}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Pay", { date, time })}
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
        fontWeight: "500",
        textAlign: "center",
    },
    headerSubtitleText: {
        color: "#61C3F2",
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 3,
    },
    contentContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#202C43",
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
        fontWeight: "600",
    },
    footerContainer: {
        paddingHorizontal: 20,
        justifyContent: "flex-end",
    },
    selectSeatsButton: {
        backgroundColor: "#61C3F2",
        paddingVertical: 15,
        width: "100%",
        borderRadius: 10,
    },
    selectSeatsButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
        textAlign: "center",
    },
});
