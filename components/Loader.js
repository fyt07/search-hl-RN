import React from 'react';
import { ActivityIndicator } from 'react-native';
import colors from '../constants/Colors'

export const Loader=() => {
    return <ActivityIndicator size={'large'} color={colors.tintColor} />
}
