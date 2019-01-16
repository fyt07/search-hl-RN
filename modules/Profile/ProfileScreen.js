import React from 'react';
import { Text, View} from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Профиль',
  };

  render() {
    return <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}><Text>тут будет профиль</Text></View>;
  }
}
