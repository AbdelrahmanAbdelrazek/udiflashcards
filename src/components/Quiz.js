import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import NotFound from './NotFound'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'

class QuizResults extends Component {
    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }
    render() {
        const { navigation } = this.props;
        const { back, restartQuiz, total_questions, correctAnswers } = this.props;
        return (
            <View>
                <Card.Title style={{ fontSize: 72 }}>Results</Card.Title>
                <Text
                    style={{ fontSize: 48, textAlign: "center", fontWeight: "bold", marginBottom: 200 }}
                >
                    You answered {Math.round((correctAnswers / total_questions) * 100)}% correct.
                </Text>
                <Button buttonStyle={{ marginBottom: 10 }}
                    title="Restart Quiz"
                    type="solid"
                    onPress={() => restartQuiz()}
                />
                <Button buttonStyle={{ marginBottom: 300 }}
                    title="Back to my Decks"
                    type="solid"
                    onPress={() => back()}
                />
            </View>
        );
    }
}


class Quiz extends Component {
    state = {
        currentQuestion: 1,
        correctAnswers: 0,
        wrongAnswers: 0,
        viewAnswer: false
    }
    toggleViewAnswer() {
        this.setState((state) => ({
            ...state,
            viewAnswer: !state.viewAnswer
        }))
    }
    correctAnswer() {
        this.setState((state) => ({
            ...state,
            currentQuestion: state.currentQuestion + 1,
            correctAnswers: state.correctAnswers + 1,
            viewAnswer: false
        }))
    }
    wrongAnswer() {
        this.setState((state) => ({
            ...state,
            currentQuestion: state.currentQuestion + 1,
            wrongAnswers: state.wrongAnswers + 1,
            viewAnswer: false
        }))
    }
    restartQuiz() {
        this.setState({
            currentQuestion: 1,
            correctAnswers: 0,
            wrongAnswers: 0,
            viewAnswer: false
        })
    }
    render() {
        const { navigation } = this.props;
        const deck_key = navigation.getParam('deck', undefined);
        const deck = this.props.decks[deck_key];
        const { title, questions = [] } = deck;
        const { currentQuestion, viewAnswer, correctAnswers } = this.state;
        return (
            deck ?
                questions.length ?
                    <Card>
                        {currentQuestion <= questions.length ?
                            <View>
                                <Card.Title>{title} ({currentQuestion}/{questions.length})</Card.Title>
                                <Card.Divider />
                                {viewAnswer ?
                                    <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20 }}>
                                        {questions[currentQuestion - 1].answer}
                                    </Text> :
                                    <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20 }}>
                                        {questions[currentQuestion - 1].question}
                                    </Text>
                                }
                                <Text
                                    style={{ textAlign: "center", fontWeight: "bold", color: "#d4271b", marginBottom: 200 }}
                                    onPress={this.toggleViewAnswer.bind(this)}
                                >
                                    {viewAnswer ? "View Question" : "View Answer"}
                                </Text>
                                <Button
                                    buttonStyle={{ marginBottom: 20, backgroundColor: "green" }}
                                    title="Correct"
                                    type="solid"
                                    onPress={this.correctAnswer.bind(this)}
                                />
                                <Button buttonStyle={{ marginBottom: 300, backgroundColor: "#d4271b" }}
                                    title="Incorrect"
                                    type="solid"
                                    onPress={this.wrongAnswer.bind(this)}
                                />
                            </View> :
                            <QuizResults back={()=>navigation.navigate('Decks')} total_questions={questions.length} correctAnswers={correctAnswers} restartQuiz={this.restartQuiz.bind(this)}/>
                        }
                    </Card> :
                    <Text
                        style={{ fontSize: 48, textAlign: "center", fontWeight: "bold", marginBottom: 200 }}
                    >
                        No cards in this Deck.
                    </Text>
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

export default connect(mapStateToProps)(Quiz);
