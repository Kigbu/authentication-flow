import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Dimensions, Image, ScrollView, View } from 'react-native';
import { useForm } from 'react-hook-form';
import Logo from '../../assets/img/logo.png';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import styles from './styles';
import { Auth } from 'aws-amplify';

const dimensions = Dimensions.get('screen');

const SignInScreen = () => {
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // console.log('errors :>> ', errors);

    const navigation = useNavigation();

    const onSignInPressed = async data => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const response = await Auth.signIn(data.username, data.password);
            // console.log(response);
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);

        // validate user
        // navigation.navigate('Home');
    };

    const onForgotPasswordPressed = () => {
        // console.warn('Forgot Password Pressed');
        navigation.navigate('ForgotPassword');
    };

    const onSignUpLinkPressed = () => {
        // console.warn('Sign Up link Pressed');
        navigation.navigate('SignUp');
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <View style={styles.logoWrapper}>
                    <Image
                        style={
                            (styles.logo, { height: dimensions.height * 0.15 })
                        }
                        source={Logo}
                        resizeMode="contain"
                    />
                </View>
                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{ required: 'Username is required' }}
                />
                <CustomInput
                    name="password"
                    placeholder="Password"
                    control={control}
                    secureTextEntry
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 4,
                            message: 'Password should be min 4 characters long',
                        },
                    }}
                />

                <CustomButton
                    text={loading ? 'Loading...' : 'Sign In'}
                    onPress={handleSubmit(onSignInPressed)}
                />
                <CustomButton
                    text="Forgot Password"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                />

                <SocialSignInButtons />

                <CustomButton
                    text="Don't have an account? Create One"
                    onPress={onSignUpLinkPressed}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
};

export default SignInScreen;
