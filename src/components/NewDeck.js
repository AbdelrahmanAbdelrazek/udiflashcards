// import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements'
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';

import { connect } from 'react-redux';


class DeckList extends Component {
  static navigationOptions = {
    title: "Add Card"
  };

  state = {
    value:""
  }

  onSubmit() {
    const { navigation, addDeck } = this.props;
    saveDeckTitle(this.state.value).then(r => {
      addDeck(this.state.value);
      navigation.navigate('Decks');
      this.setState({value:""})
    })
  }

  render() {
    return (
      <View>
        <Text style={{fontSize:48, textAlign:"center", fontWeight:'bold', marginBottom:100}}>What is the title of your new deck?</Text>
        <Input
          placeholder="Deck Title"
          value={this.state.value}
          // leftIcon={{ type: 'font-awesome', name: 'answer' }}
          onChangeText={value => this.setState({value})}
        />
        <Button buttonStyle={{ marginBottom: 300 }}
          title="Create Deck"
          type="solid"
          onPress={this.onSubmit.bind(this)}
        />
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}
export default connect(mapStateToProps, { addDeck })(DeckList);
