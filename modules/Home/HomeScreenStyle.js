import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(248,248,248)',
    },
    button: {
        backgroundColor: colors.tintColor,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',

    },
    buttonText: {
        paddingLeft: 10,
        color: 'white',
        fontSize: 20,
    },
    intutContainer: {
        margin: 15,
    },
    inputStyle: {
        width: 250,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        fontSize: 20,
        lineHeight: 24,
        
        borderBottomWidth: 2,
        borderColor: 'rgba(175, 178, 180, 0.21)',
    },
    input: {
        width: 200,
        paddingHorizontal: 5,
        margin: 15,
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor: 'rgb(0,91,255)'
    },
})
