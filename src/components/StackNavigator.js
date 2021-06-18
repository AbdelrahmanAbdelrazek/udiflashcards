import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Deck from './Deck';
import Quiz from './Quiz';
import NewCard from './NewCard'
import TabNavigator from './TabNavigator'
import { createAppContainer } from 'react-navigation';
import { Appbar } from 'react-native-paper';
function CustomNavigationBar({ navigation, previous, ...props }) {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
      <Appbar.Content title={props.scene.descriptor.options.headerTitle} />
    </Appbar.Header>
  );
}
const AppNavigator = createStackNavigator(
  {
    Decks: {
      screen: TabNavigator,
      navigationOptions: {
        headerTitle: "Decks"
      }
    },
    Deck: {
      screen: Deck,
      navigationOptions: ({ navigation }) => ({
        headerTitle: `${navigation.state.params.title} Deck`,
      })
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        headerTitle: `${navigation.state.params.deck} Quiz`,
      })
    },
    NewCard: {
      screen: NewCard,
      navigationOptions: {
        headerTitle: "New Card"
      }
    }
  },
  {
    initialRouteName: 'Decks',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: (props) => <CustomNavigationBar {...props} />
    },
  }
);



export default createAppContainer(AppNavigator);