import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import NotFound from './NotFound'
import { removeDeck } from '../actions';
import { removeDeck as APIremoveDeck } from '../utils/api';
import { Modal, Card, Button, Divider, Chip } from 'react-native-paper'

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Unnamed Deck'),
        };
    };

    state = {
        overlayVisible: false,
        opacity: new Animated.Value(0),
        width: new Animated.Value(0),
        height: new Animated.Value(0),

    }
    deleteDeck() {
        const { navigation, removeDeck } = this.props;
        const deck_key = navigation.getParam('deck', undefined);
        this.setState((state) => ({ ...state, overlayVisible: false }))
        APIremoveDeck(deck_key).then(r => {
            removeDeck(deck_key);
            navigation.navigate('Decks');
        })
    }

    componentDidMount() {
        const { opacity, width, height } = this.state;
        Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: false })
            .start()
        Animated.spring(width, { toValue: 400, speed: 5, useNativeDriver: false }).start()
        Animated.spring(height, { toValue: 100, speed: 5, useNativeDriver: false }).start()

    }
    render() {
        const { navigation } = this.props;
        const { opacity, width, height } = this.state;
        const deck_key = navigation.getParam('deck', undefined);
        const deck = this.props.decks[deck_key] || {};
        const { title, questions = [] } = deck;
        const containerStyle = { backgroundColor: 'white', padding: 20 };
        return (
            deck ?
                <Card>
                    <Card.Content >

                        <Animated.Text style={[{ textAlign: 'center', fontSize: 48, fontWeight: "bold" }, { opacity, width, height }]}>
                            {title}
                        </Animated.Text>
                        <Divider />

                        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 200 }}>
                            {questions.length} card{questions.length != 1 ? 's' : ''}
                        </Text>
                        <Button mode="outlined" onPress={() => this.props.navigation.navigate('NewCard', { deck: deck_key })}>Add Card</Button>
                        <Button mode="outlined" style={{ backgroundColor: "#6200ee", marginTop: 10 }} color="white" dark={true} onPress={() => this.props.navigation.navigate('Quiz', { deck: deck_key })}>Start Quiz</Button>
                        {/* <Text
                        style={{ textAlign: "center", fontWeight: "bold", color: "#d4271b", paddingTop:300 }}
                        onPress={() => this.setState((state) => ({ ...state, overlayVisible: true }))}
                        >
                        Delete Deck
                    </Text> */}
                        <Chip textStyle={{ color: "#d4271b", fontWeight: "bold" }} style={{ alignSelf: "center", marginTop: 300 }} onPress={() => this.setState((state) => ({ ...state, overlayVisible: true }))}> Delete Deck</Chip>
                        <Modal contentContainerStyle={containerStyle} visible={this.state.overlayVisible} onDismiss={() => this.setState((state) => ({ ...state, overlayVisible: false }))}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: "bold" }}>Are you sure you want to delete "{title}" deck?</Text>

                            {/* <Button buttonStyle={{ backgroundColor: "#d4271b", marginBottom: 10 }} title="Yes" onPress={this.deleteDeck.bind(this)} />
                        <Button buttonStyle={{ marginBottom: 0 }} title="No" onPress={() => this.setState((state) => ({ ...state, overlayVisible: false }))} /> */}
                            <Button style={{ backgroundColor: "#d4271b", marginTop: 10 }} mode="contained" onPress={this.deleteDeck.bind(this)}>Yes</Button>
                            <Button style={{ backgroundColor: "green", marginTop: 10 }} mode="contained" onPress={() => this.setState((state) => ({ ...state, overlayVisible: false }))}>No</Button>
                        </Modal>
                    </Card.Content>
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

export default connect(mapStateToProps, { removeDeck })(Deck);
