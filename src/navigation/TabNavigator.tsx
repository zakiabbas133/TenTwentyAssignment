import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../screens/Dashboard';
import Watch from '../screens/Watch';
import MediaLibrary from '../screens/MediaLibrary';
import More from '../screens/More';

import Entypo from '@expo/vector-icons/Entypo';

export type AssignmentTabParamList = {
    Dashboard: undefined;
    Watch: undefined;
    MediaLibrary: undefined;
    More: undefined;
};

const Tab = createBottomTabNavigator<AssignmentTabParamList>();

const AssignmentTabs: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: '#827D88',
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Entypo name="grid" size={24} color={focused ? '#FFFFFF' : '#827D88'} />
                    ),
                }}
            />
            <Tab.Screen
                name="Watch"
                component={Watch}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Entypo name="youtube" size={24} color={focused ? '#FFFFFF' : '#827D88'} />
                    ),
                }}
            />
            <Tab.Screen
                name="MediaLibrary"
                component={MediaLibrary}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Entypo name="folder-video" size={24} color={focused ? '#FFFFFF' : '#827D88'} />
                    ),
                }}
            />
            <Tab.Screen
                name="More"
                component={More}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Entypo name="list" size={24} color={focused ? '#FFFFFF' : '#827D88'} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default AssignmentTabs;

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#2E2739',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});
