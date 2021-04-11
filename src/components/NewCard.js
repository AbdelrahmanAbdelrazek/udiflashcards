import React, { Component } from 'react';
import {  View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import NotFound from './NotFound'
import { addCardToDeck } from '../actions';
import { addCardToDeck as APIaddCardToDeck } from '../utils/api';

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
                <View>
                    <Input
                        placeholder="Question"
                        // leftIcon={{ type: 'font-awesome', name: 'question' }}
                        onChangeText={value => this.setState(state => ({ ...state, question: value }))}
                    />
                    <Input
                        placeholder="Answer"
                        // leftIcon={{ type: 'font-awesome', name: 'answer' }}
                        onChangeText={value => this.setState(state => ({ ...state, answer: value }))}
                    />
                    <Button buttonStyle={{ marginBottom: 300 }}
                        title="Submit"
                        type="solid"
                        onPress={this.onSubmit.bind(this)}
                    />
                </View>
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
