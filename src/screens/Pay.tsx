import React, { useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

type RootStackParamList = {
    Pay: { date: number; time: number };
    Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Pay">;

const Pay: React.FC<Props> = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const GRID = [9, 11, 13, 14, 14, 14];
    const width = Dimensions.get("window").width * 0.9;
    const [selectedSeat, setSelectedSeat] = useState<[number, number] | null>(null);

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
                    <Text style={styles.headerSubtitleText}>
                        March {route.params.date}, 2025 | {route.params.time === 1 ? "12" : "14"}:30 Hall 1
                    </Text>
                </View>

                <View style={styles.headerSide} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.screenSvgContainer}>
                    <Svg width={width} height={80}>
                        <Defs>
                            <LinearGradient id="shadowGradient" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor="#61C3F2" stopOpacity={0.5} />
                                <Stop offset="1" stopColor="#61C3F2" stopOpacity={0} />
                            </LinearGradient>
                        </Defs>

                        <Path
                            d={`M 0 80 Q ${width / 2} 10 ${width} 80`}
                            stroke="url(#shadowGradient)"
                            strokeWidth={1}
                            fill="none"
                            strokeLinecap="round"
                        />
                        <Path
                            d={`M 0 80 Q ${width / 2} 10 ${width} 80`}
                            stroke="#61C3F2"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                        />
                    </Svg>
                </View>

                <Text style={styles.screenLabel}>Screen</Text>

                <View style={styles.seatsContainer}>
                    {GRID.map((count, rowIndex) => (
                        <View key={rowIndex} style={styles.seatRow}>
                            {Array.from({ length: count }).map((_, colIndex) => {
                                const isSelected =
                                    selectedSeat?.[0] === rowIndex && selectedSeat?.[1] === colIndex;
                                return (
                                    <TouchableOpacity
                                        key={colIndex}
                                        onPress={() => setSelectedSeat([rowIndex, colIndex])}
                                        style={[
                                            styles.seatBox,
                                            { backgroundColor: isSelected ? "#CD9D0F" : "#61C3F2" },
                                        ]}
                                    />
                                );
                            })}
                        </View>
                    ))}
                </View>

                <View style={styles.incDecContainer}>
                    <TouchableOpacity style={styles.incDecButton}>
                        <Ionicons name="add" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.incDecButton, styles.incDecButtonMargin]}>
                        <Ionicons name="remove-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.progressBar} />

                <View style={styles.legendContainer}>
                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}>
                            <View style={styles.legendIconWrapper}>
                                <View style={[styles.legendIconBox, { backgroundColor: "#CD9D0F" }]} />
                                <View style={[styles.legendIconLine, { backgroundColor: "#CD9D0F" }]} />
                            </View>
                            <Text style={styles.legendText}>Selected</Text>
                        </View>

                        <View style={styles.legendItem}>
                            <View style={styles.legendIconWrapper}>
                                <View style={[styles.legendIconBox, { backgroundColor: "#A6A6A6" }]} />
                                <View style={[styles.legendIconLine, { backgroundColor: "#A6A6A6" }]} />
                            </View>
                            <Text style={styles.legendText}>Not available</Text>
                        </View>
                    </View>

                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}>
                            <View style={styles.legendIconWrapper}>
                                <View style={[styles.legendIconBox, { backgroundColor: "#564CA3" }]} />
                                <View style={[styles.legendIconLine, { backgroundColor: "#564CA3" }]} />
                            </View>
                            <Text style={styles.legendText}>VIP (150$)</Text>
                        </View>

                        <View style={styles.legendItem}>
                            <View style={styles.legendIconWrapper}>
                                <View style={[styles.legendIconBox, { backgroundColor: "#61C3F2" }]} />
                                <View style={[styles.legendIconLine, { backgroundColor: "#61C3F2" }]} />
                            </View>
                            <Text style={styles.legendText}>Regular (50 $)</Text>
                        </View>
                    </View>
                    <View style={styles.selectedSeatContainer}>
                        <Text style={styles.selectedSeatNumber}>4 /</Text>
                        <Text style={styles.selectedSeatRow}>3 row</Text>
                        <Ionicons style={styles.selectedSeatCloseIcon} name="close" size={14} color="black" />
                    </View>
                </View>

                <View style={[styles.footerContainer, { paddingBottom: insets.bottom }]}>
                    <View style={styles.totalPriceContainer}>
                        <Text style={styles.totalPriceLabel}>Total Price</Text>
                        <Text style={styles.totalPriceAmount}>$ 50</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={styles.proceedButton}
                    >
                        <Text style={styles.proceedButtonText}>Proceed to pay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Pay;

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
    scrollContent: {
        flexGrow: 1,
    },
    screenSvgContainer: {
        alignItems: "center",
        padding: 20,
    },
    screenLabel: {
        textAlign: "center",
        color: "#8F8F8F",
        fontSize: 8,
        fontFamily: 'Poppins-SemiBold'
    },
    seatsContainer: {
        paddingTop: 40,
    },
    seatRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 4,
    },
    seatBox: {
        width: 18,
        height: 18,
        margin: 2,
        borderRadius: 4,
    },
    incDecContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 50,
        paddingHorizontal: 20,
    },
    incDecButton: {
        borderRadius: 99,
        backgroundColor: "#FFFFFF",
        padding: 5,
    },
    incDecButtonMargin: {
        marginLeft: 10,
    },
    progressBar: {
        width: "90%",
        height: 5,
        backgroundColor: "#A6A6A680",
        borderRadius: 99,
        marginTop: 20,
        alignSelf: "center",
        marginBottom: 8,
    },
    legendContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
    },
    legendRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    legendItem: {
        width: "50%",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    legendIconWrapper: {
        alignItems: "center",
    },
    legendIconBox: {
        width: 20,
        height: 15,
        borderRadius: 4,
    },
    legendIconLine: {
        width: 12,
        height: 2,
        borderRadius: 8,
        marginTop: 1,
    },
    legendText: {
        color: "#8F8F8F",
        fontSize: 12,
        marginLeft: 10,
        fontFamily: 'Poppins-SemiBold'
    },
    selectedSeatContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#A6A6A61A",
        alignSelf: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    selectedSeatNumber: {
        color: "#202C43",
        fontFamily: 'Poppins-SemiBold'
    },
    selectedSeatRow: {
        color: "#202C43",
        fontSize: 10,
        marginLeft: 5,
        fontFamily: 'Poppins-Regular'
    },
    selectedSeatCloseIcon: {
        marginLeft: 20,
    },
    footerContainer: {
        paddingHorizontal: 20,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
    },
    totalPriceContainer: {
        backgroundColor: "#A6A6A61A",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    totalPriceLabel: {
        color: "#202C43",
        fontSize: 10,
        fontFamily: 'Poppins-Regular'
    },
    totalPriceAmount: {
        color: "#202C43",
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold'
    },
    proceedButton: {
        flex: 1,
        backgroundColor: "#61C3F2",
        paddingVertical: 15,
        borderRadius: 10,
        marginLeft: 15,
    },
    proceedButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: 'Poppins-SemiBold'
    },
});
