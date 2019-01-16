import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './GameOverStyle';
import messages from '../../../../constants/Messages';

export class GameOver extends React.Component {
    render() {
        const { onPress, win = false, step } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={[styles.message, win ? styles.green : styles.red]}>{win ? messages.WIN_MESSAGES : messages.LOSE_MESSAGES}</Text>
                    <Text style={styles.step}>{`${step} Шаг.`}</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <Text style={styles.buttonText}>Новая игра</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
