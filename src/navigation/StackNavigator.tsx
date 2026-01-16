import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssignmentTabs from "./TabNavigator";
import MovieDetails from "../screens/MovieDetails";
import BookTicket from "../screens/BookTicket";
import Pay from "../screens/Pay";

export type AssignmentStackParamList = {
    Home: undefined;
    MovieDetails: undefined;
    BookTicket: undefined;
    Pay: undefined;
};

const Stack = createNativeStackNavigator<AssignmentStackParamList>();

const AssignmentStack: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, 
            }}
        >
            <Stack.Screen name="Home" component={AssignmentTabs} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
            <Stack.Screen name="BookTicket" component={BookTicket} />
            <Stack.Screen name="Pay" component={Pay} />
        </Stack.Navigator>
    );
};

export default AssignmentStack;
