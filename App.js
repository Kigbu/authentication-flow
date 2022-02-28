/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import Amplify, { Auth } from 'aws-amplify';
// import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

const App = () => {
    // Auth.signOut();
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.root}>
                <AppNavigator />
            </SafeAreaView>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f9fbfc',
    },
});

const signUpConfig = {
    header: 'My Customized Sign Up',
    hideAllDefaults: true,
    signUpFields: [
        {
            label: 'Full name',
            key: 'name',
            required: true,
            displayOrder: 1,
            type: 'string',
        },
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 2,
            type: 'string',
        },
        {
            label: 'Username',
            key: 'preferred_username',
            required: true,
            displayOrder: 3,
            type: 'string',
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 4,
            type: 'password',
        },
    ],
};

// const customTheme = {
//     ...AmplifyTheme,
//     button: { ...AmplifyTheme.button, backgroundColor: 'blue' },
// };

export default App;
// export default withAuthenticator(App, { signUpConfig, theme: customTheme });
