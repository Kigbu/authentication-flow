import React, { useState } from 'react';
import { Text, ScrollView, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import styles from './styles';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const pwd = watch('password');

    const navigation = useNavigation();

    const onRegisterPressed = async data => {
        const { username, password, email, name } = data;
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            await Auth.signUp({
                username,
                password,
                attributes: { email, name, preferred_username: username },
            });
            navigation.navigate('ConfirmEmail', { username });
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
        // console.log(data);
        //
    };

    const onTermOfUsePressed = () => {};

    const onPrivacyPolicyPressed = () => {};

    const onSignInLinkPressed = () => {
        // console.warn('Sign in link Pressed');
        navigation.navigate('SignIn');
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create an Account</Text>
                <CustomInput
                    name="name"
                    placeholder="Full Name"
                    control={control}
                    rules={{
                        required: 'Full Name is required',
                        minLength: {
                            value: 8,
                            message:
                                'Full Name should be min 8 characters long',
                        },
                        maxLength: {
                            value: 24,
                            message:
                                'Username should be max 10 characters long',
                        },
                    }}
                />
                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 4,
                            message: 'Username should be min 4 characters long',
                        },
                        maxLength: {
                            value: 10,
                            message:
                                'Username should be max 10 characters long',
                        },
                    }}
                />
                <CustomInput
                    name="email"
                    placeholder="Email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: EMAIL_REGEX,
                            message: 'Email is invalid',
                        },
                    }}
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
                <CustomInput
                    name="password-repeat"
                    placeholder="Confirm Password"
                    control={control}
                    secureTextEntry
                    rules={{
                        required: 'Enter Password again',

                        validate: value =>
                            value === pwd ? true : 'Password does not match',
                    }}
                />
                <CustomButton
                    text={loading ? 'Loading...' : 'Register'}
                    onPress={handleSubmit(onRegisterPressed)}
                />
                <Text style={styles.text}>
                    By registering, you conform that you accept our{' '}
                    <Text style={styles.link} onPress={onTermOfUsePressed}>
                        Terms of Use
                    </Text>{' '}
                    and{' '}
                    <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
                        privacy policy
                    </Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton
                    text="Have an account? Sign In"
                    onPress={onSignInLinkPressed}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;
