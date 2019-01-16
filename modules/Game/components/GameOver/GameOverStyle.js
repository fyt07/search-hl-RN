import { StyleSheet } from 'react-native';
import colors from '../../../../constants/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer:{
        alignItems: 'center',
    },
    message:{
        fontSize: 40,
    },
    button: {
        backgroundColor: colors.tintColor,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',

    },
    buttonText: {
        paddingLeft: 15,
        color: 'white',
        fontSize: 20,
    },
    green: {
        color: 'rgb(0,200,114)',
    },
    red: {
        color: 'rgb(254,56,36)',
    },

})
