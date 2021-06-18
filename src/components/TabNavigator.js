import React from 'react';
import NewDeck from './NewDeck';
import DeckList from './DeckList';
import { BottomNavigation, Text } from 'react-native-paper';

const MyComponent = (props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Decks', title: 'Decks', icon: 'cards' },
    { key: 'NewDeck', title: 'New Deck', icon: 'plus-box' },
  ]);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'Decks':
        return <DeckList jumpTo={jumpTo} {...props} />;
      case 'NewDeck':
        return <NewDeck jumpTo={jumpTo} {...props} />;
    }
  }
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;