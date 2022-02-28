import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, ScrollView, View, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import styles from './styles';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const ConfirmEmailScreen = () => {
    const [loading, setLoading] = useState(false);
    const [resendloading, setResendLoading] = useState(false);
    const route = useRoute();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({ defaultValues: { username: route?.params?.username } });

    const username = watch('username');

    const navigation = useNavigation();

    const onConfirmEmailPressed = async data => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            await Auth.confirmSignUp(data.username, data.code);
            navigation.navigate('SignIn');
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
    };

    const onResendPressed = async () => {
        if (resendloading) {
            return;
        }
        setResendLoading(true);
        try {
            await Auth.resendSignUp(username);
            Alert.alert('Success', 'Code resend successfuly');
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setResendLoading(false);
    };

    const onSignInLinkPressed = () => {
        // console.warn('Sign in link Pressed');
        navigation.navigate('SignIn');
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm your Email</Text>
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
                <CustomButton
                    text={loading ? 'Loading..' : 'Confirm'}
                    onPress={handleSubmit(onConfirmEmailPressed)}
                />

                <CustomButton
                    text={resendloading ? 'Loading' : 'Resend Code'}
                    onPress={onResendPressed}
                    type="SECONDARY"
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

export default ConfirmEmailScreen;
