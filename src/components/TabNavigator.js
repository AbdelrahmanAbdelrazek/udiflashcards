import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import NewDeck from './NewDeck';
import DeckList from './DeckList';


export default createBottomTabNavigator(
  {
    Decks: DeckList,
    "New Deck": NewDeck,
  },
  {
    initialRouteName: 'Decks',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
