import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, ScrollView, View, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import styles from './styles';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const NewPasswordScreen = () => {
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigation = useNavigation();

    const onSubmitPressed = async data => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            await Auth.forgotPasswordSubmit(
                data.username,
                data.code,
                data.password,
            );
            navigation.navigate('SignIn');
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
                    placeholder="Username"
                    control={control}
                    rules={{ required: 'Username is required' }}
                />
                <CustomInput
                    name="code"
                    placeholder="Enter Confirmation code"
                    control={control}
                    rules={{
                        required: 'confirmation code is required',
                    }}
                />

                <CustomInput
                    name="password"
                    placeholder="Enter New Password"
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
                    text="Submit"
                    onPress={handleSubmit(onSubmitPressed)}
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

export default NewPasswordScreen;
