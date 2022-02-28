import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import ConfirmEmailScreen from '../../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../../screens/NewPasswordScreen';
import HomeScreen from '../../screens/HomeScreen';
import { Auth, Hub } from 'aws-amplify';
import { ActivityIndicator, View } from 'react-native';

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => {
    const [user, setUser] = useState(undefined);

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({
                bypassCache: true,
            });
            setUser(authUser);
        } catch (e) {
            setUser(null);
        }
    };
    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        const listener = data => {
            if (
                data.payload.event === 'signIn' ||
                data.payload.event === 'signOut'
            ) {
                checkUser();
            }
        };

        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);
    });

    if (user === undefined) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ActivityIndicator />
            </View>
        );
    }
    return (
        <Navigator
            initialRouteName="SignIn"
            screenOptions={{ headerShown: false }}>
            {user ? (
                <Screen name="Home" component={HomeScreen} />
            ) : (
                <>
                    <Screen name="SignIn" component={SignInScreen} />
                    <Screen name="SignUp" component={SignUpScreen} />
                    <Screen
                        name="ConfirmEmail"
                        component={ConfirmEmailScreen}
                    />
                    <Screen
                        name="ForgotPassword"
                        component={ForgotPasswordScreen}
                    />
                    <Screen name="NewPassword" component={NewPasswordScreen} />
                </>
            )}
        </Navigator>
    );
};

export default AppNavigator;
