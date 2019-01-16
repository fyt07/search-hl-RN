import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {

    },
    input: {
        // width: 250,
        // padding: 5,
        // paddingHorizontal: 10,
        // backgroundColor: 'white',
        // fontSize: 20,
        // lineHeight: 24,
    },
    red: {
        color: 'rgb(254,56,36)',
    },
})
export const Input = ({ styleContainer, styleInput, ref, error, ...props }) => {
    return (
        <View style={[styles.container, styleContainer]}>
            <TextInput
                style={[styles.input, styleInput]}
                {...props}
            />
            <Text style={styles.red}>{error}</Text>
        </View>
    )
}
