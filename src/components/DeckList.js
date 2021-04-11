// import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { handleInitialData } from '../actions';
import { connect } from 'react-redux';
import DeckSummary from './DeckSummary';
import { Icon } from 'react-native-elements'

class DeckList extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { decks = {} } = this.props;
    return (
      <View>
        {
          Object.keys(decks).map((k, i) => {
            const { title, questions } = decks[k];
            return (
              <DeckSummary
                key={i}
                title={title}
                num_cards={questions.length}
                onClick={() => this.props.navigation.navigate('Deck', { deck: k, title })}
              />
            )
          })
        }

      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}
export default connect(mapStateToProps, { handleInitialData })(DeckList);
