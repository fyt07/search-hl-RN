import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Input } from '../../components/Input';
import messages from '../../constants/Messages';

import styles from './HomeScreenStyle'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    target: '',
    error: '',
  }
  render() {
    const { target, error } = this.state;
    return (
      <View style={styles.container}>
        <Input
          styleContainer={styles.inputContainer}
          styleInput={styles.inputStyle}
          error={error}
          placeholder={'Выберите цель'}
          onChangeText={value => this.setState({ target: value, error: target.length > 2 && '' })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => { target.length > 2 ? this.props.navigation.navigate('Game', { target }) : this.setState({ error: messages.MIN_LENGTH_ERROR }) }}
        >
          <Text style={styles.buttonText}>Начать</Text>
        </TouchableOpacity>

      </View>
    );
  }

}


