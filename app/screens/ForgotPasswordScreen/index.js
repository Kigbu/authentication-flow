import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, ScrollView, View, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import styles from './styles';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const ForgotPasswordScreen = () => {
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigation = useNavigation();

    const onSendPressed = async data => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            await Auth.forgotPassword(data.username);
            navigation.navigate('NewPassword');
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
    };

    const onSignInLinkPressed = () => {
        // console.warn('Sign in link Pressed');
        navigation.navigate('SignIn');
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset Your Password</Text>
                <CustomInput
                    name="username"
                    placeholder="Enter Username"
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
                <CustomButton
                    text={loading ? 'Loading...' : 'Send'}
                    onPress={handleSubmit(onSendPressed)}
                />

                <CustomButton
                    text="Back to Sign In"
                    onPress={onSignInLinkPressed}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
};

export default ForgotPasswordScreen;
