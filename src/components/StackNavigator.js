import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Deck from './Deck';
import Quiz from './Quiz';
import NewCard from './NewCard'
import TabNavigator from './TabNavigator'
import { createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(
    {
        Decks: TabNavigator,
        Deck: Deck,
        Quiz: Quiz,
        NewCard: NewCard
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

export default createAppContainer(AppNavigator);