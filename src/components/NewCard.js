import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFound from './NotFound'
import { addCardToDeck } from '../actions';
import { addCardToDeck as APIaddCardToDeck } from '../utils/api';
import { Button, Card, TextInput } from 'react-native-paper';

class NewCard extends Component {
    static navigationOptions = {
        title: "Add Card"
    };

    state = {
        question: "",
        answer: ""
    }

    onSubmit() {
        const { navigation, addCardToDeck, decks } = this.props;
        const deck_key = navigation.getParam('deck', undefined);
        APIaddCardToDeck(deck_key, this.state).then(r => {
            addCardToDeck(deck_key, this.state);
            navigation.navigate('Deck', { deck: deck_key, title: decks[deck_key].title });
        })
    }

    render() {
        const { navigation } = this.props;
        const deck_key = navigation.getParam('deck', undefined);
        const deck = this.props.decks[deck_key];
        return (
            deck ?
                <Card >
                    <Card.Content >
                        <TextInput mode="outlined" label="Question" onChangeText={value => this.setState(state => ({ ...state, question: value }))} />
                        <TextInput mode="outlined" label="Answer" onChangeText={value => this.setState(state => ({ ...state, answer: value }))} />

                    </Card.Content>
                    <Card.Actions>
                        <Button mode="contained" onPress={this.onSubmit.bind(this)}>Submit</Button>
                    </Card.Actions>
                </Card>
                :
                <NotFound />
        );
    }
}


function mapStateToProps({ decks }) {
    return {
        decks,
    };
}

export default connect(mapStateToProps, { addCardToDeck })(NewCard);
