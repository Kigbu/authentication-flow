import { Auth } from 'aws-amplify';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    const signOut = () => {
        Auth.signOut();
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home</Text>
            <Pressable onPress={signOut}>
                <Text style={styles.logout}>Logout</Text>
            </Pressable>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
    },
    logout: {
        fontFamily: 'Montserrat-Light',
        fontSize: 16,
        padding: 32,
        color: 'red',
    },
});
