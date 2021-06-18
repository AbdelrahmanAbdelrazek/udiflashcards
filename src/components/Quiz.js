import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import NotFound from './NotFound'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { Text } from 'react-native-paper';
import { Button, Card, Divider } from 'react-native-paper';

class QuizResults extends Component {
    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }
    render() {
        const { navigation } = this.props;
        const { back, restartQuiz, total_questions, correctAnswers } = this.props;
        return (
            <View>
                <Text
                    style={{ fontSize: 48, textAlign: "center", fontWeight: "bold", marginBottom: 200 }}
                >
                    You answered {Math.round((correctAnswers / total_questions) * 100)}% correct.
                </Text>
                <Button mode="contained" style={{ marginBottom: 10 }} onPress={() => restartQuiz()}>Restart Quiz</Button>
                <Button mode="contained" onPress={() => back()}>Back to my Decks</Button>
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
                        <Card.Content >
                            {currentQuestion <= questions.length ?
                                <View>
                                    <Card.Title titleStyle={{ fontSize: 40, textAlign: "center", paddingTop: 20 }} subtitleStyle={{ fontSize: 40, textAlign: "center", paddingTop: 20 }} title={title} subtitle={`${currentQuestion}/${questions.length}`} />
                                    <Divider />
                                    {viewAnswer ?

                                        <Text style={{ fontSize: 30, textAlign: "center" }}>
                                            {questions[currentQuestion - 1].answer}
                                        </Text> :
                                        <Text style={{ fontSize: 30, textAlign: "center" }}>
                                            {questions[currentQuestion - 1].question}
                                        </Text>
                                    }
                                    <Text
                                        style={{ textAlign: "center", fontWeight: "bold", color: "#d4271b", marginBottom: 100 }}
                                        onPress={this.toggleViewAnswer.bind(this)}
                                    >
                                        {viewAnswer ? "View Question" : "View Answer"}
                                    </Text>
                                    <Button mode="contained" style={{ marginBottom: 20, backgroundColor: "green" }} onPress={this.correctAnswer.bind(this)}>Correct</Button>
                                    <Button mode="contained" style={{ marginBottom: 20, backgroundColor: "#d4271b" }} onPress={this.wrongAnswer.bind(this)}>Incorrect</Button>
                                </View> :
                                <QuizResults back={() => navigation.navigate('Decks')} total_questions={questions.length} correctAnswers={correctAnswers} restartQuiz={this.restartQuiz.bind(this)} />
                            }
                        </Card.Content>
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
