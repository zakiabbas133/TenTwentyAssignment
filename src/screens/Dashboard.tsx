import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Dashboard: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            style={styles.main}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.scroll,
                    { paddingTop: insets.top } as ViewStyle,
                ]}
            >
                <Text style={styles.primaryText}>This is Dashboard</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    primaryText: {
        textAlign: 'center',
        color: '#000000',
        fontFamily: 'Poppins-Bold'
    }
});
