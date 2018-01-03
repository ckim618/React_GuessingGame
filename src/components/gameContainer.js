import React, { Component } from 'react';
import History from './history';
import Game from './game';
import '../assets/app.css';

class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allTimeScore: localStorage.getItem('lowestScore') || 'Not Set',
            disableButton: false,
            gameInfo: null,
            guessCounter: 0,
            history: [],
            historyInfo: null,
            randomNumber: this.randomGeneratedNumber(),
            userGuess: ''
        }
        this.getLowestScore = this.getLowestScore.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleShake = this.handleShake.bind(this);
        this.inputHistoryArray = this.inputHistoryArray.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    getLowestScore(score) {
        const lowestScore = localStorage.getItem('lowestScore');
        if (!lowestScore || lowestScore > score) {
            localStorage.setItem('lowestScore', score);
            this.setState({
                allTimeScore: score
            });
        }
    }

    handleGuess(event) {
        //Used let because guesscounter is always changing based on outcome
        let { disableButton, guessCounter, randomNumber, userGuess } = this.state;

        event.preventDefault();

        if(disableButton) {
            return;
        }

        if (userGuess === null || userGuess === '') {
            return;
        }
        if (userGuess < randomNumber) {
            this.setState({
                gameInfo: `${parseInt(userGuess)} is too low `,
                historyInfo: 'Too Low',
                guessCounter: guessCounter + 1
            }, () => {
                this.inputHistoryArray();
            });
        } else if (userGuess > randomNumber) {
            this.setState({
                gameInfo: `${parseInt(userGuess)} is too high`,
                historyInfo: 'Too High',
                guessCounter: guessCounter += 1
            }, () => {
                this.inputHistoryArray();
            });
        } else {
            this.setState({
                disableButton: true,
                gameInfo: "You've guessed the number!",
                guessCounter: guessCounter += 1,
                userGuess: ''
            }, () => {
                    this.getLowestScore(guessCounter);
            });
        }  
        this.handleShake();
    }

    handleInputChange(event) {
        event.preventDefault();
        this.setState({
            userGuess: event.target.value
        });
    }

    handleShake() {
        this.setState({ 
            shake: true 
        }, () => {
            setTimeout(() => this.setState({ 
                shake: false 
            }), 1000);
        });
    }

    inputHistoryArray() {
        const { history, historyInfo, userGuess } = this.state;
        this.setState({
            history: [`${parseInt(userGuess)} | ${historyInfo}`, ...history],
            userGuess: ''
        })
    }

    randomGeneratedNumber() {
        const pickedNumber = Math.floor(Math.random() * 10000 + 1);
        return pickedNumber;
    }

    resetGame(event) {
        event.preventDefault();
        this.setState({
            disableButton: false,
            gameInfo: null,
            guessCounter: 0,
            history: [],
            randomNumber: this.randomGeneratedNumber(),
            userGuess: ''
        });
    }

    render() {
        console.log(this.state.randomNumber)
        const { allTimeScore, disableButton, gameInfo, guessCounter, history, shake, userGuess } = this.state;
        const { handleGuess, handleInputChange, resetGame } = this;        
        return (
            <div className="text-center gameContainer">
                <div className="infoContainer">
                    <Game
                        allTimeScore={allTimeScore}
                        disableButton={disableButton}
                        gameInfo={gameInfo}
                        guessCounter={guessCounter}
                        handleGuess={handleGuess}
                        handleInputChange={handleInputChange}
                        resetGame={resetGame} 
                        shake={shake}
                        userGuess={userGuess}
                    />
                    <History history={history} />
                </div>
            </div>
        )
    }
}

export default GameContainer;
