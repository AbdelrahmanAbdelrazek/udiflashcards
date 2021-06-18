import React, { Component } from 'react';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';
import { connect } from 'react-redux';
import { Button, Card } from 'react-native-paper';
import { TextInput } from 'react-native-paper';


class DeckList extends Component {

  state = {
    DeckTitle: ""
  }

  onSubmit() {
    const { navigation, addDeck } = this.props;
    saveDeckTitle(this.state.DeckTitle).then(r => {
      addDeck(this.state.DeckTitle);
      navigation.navigate('Decks');
      this.setState({ DeckTitle: "" })
    })
    this.props.jumpTo("Decks")
  }
  onChangeText(value) {
    this.setState({ DeckTitle: value })
  }
  render() {
    return (
      <Card >
        <Card.Content >
          <TextInput mode="outlined" label="Deck Title" value={this.state.DeckTitle} onChangeText={this.onChangeText.bind(this)} />
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={this.onSubmit.bind(this)}>Create Deck</Button>
        </Card.Actions>
      </Card>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}
export default connect(mapStateToProps, { addDeck })(DeckList);