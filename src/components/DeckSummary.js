import React, { Component } from 'react';
import { Header, Button, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

function DeckSummary(props) {
  const { title = "", num_cards = 0, onClick } = props;
  return (
    <ListItem bottomDivider
    Component={TouchableScale}
    friction={90} //
    tension={100} // These props are passed to the parent component (here TouchableScale)
    activeScale={0.95} //
    onPress={onClick}
    >
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{num_cards} card{ num_cards !=1 ?'s' : '' }</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default DeckSummary;