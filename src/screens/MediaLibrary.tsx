import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MediaLibrary: React.FC = () => {
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
                <Text style={styles.primaryText}>This is Media Library</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default MediaLibrary;

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
