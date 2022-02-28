import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    container_PRIMARY: { backgroundColor: '#3b71f3' },
    container_SECONDARY: {
        borderColor: '#3b71f3',
        borderWidth: 2,
    },
    container_TERTIARY: {},
    text: { fontFamily: 'Montserrat-Bold', color: 'white' },
    text_PRIMARY: {},
    text_SECONDARY: {
        color: '#3b71f3',
    },
    text_TERTIARY: { color: 'grey' },
});
