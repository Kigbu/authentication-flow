import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Controller } from 'react-hook-form';
import styles from './styles';

const CustomInput = ({
    control,
    name,
    placeholder,
    rules = {},
    secureTextEntry,
}) => {
    // const { control, handleSubmit } = useForm();
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
            }) => (
                <>
                    <View
                        style={[
                            styles.container,
                            { borderColor: error ? 'red' : '#e8e8e8' },
                        ]}>
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlue={onBlur}
                            placeholder={placeholder}
                            style={styles.input}
                            secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                            {error.message || 'Error'}
                        </Text>
                    )}
                </>
            )}
        />
    );
};

export default CustomInput;

{
    /* <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
            /> */
}
