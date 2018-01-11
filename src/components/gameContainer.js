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

/*******************************************************************
 * getLowestScore - Checks and stores lowest score on local storage  
 * @param: {score}
 * @returns: {none}
 ******************************************************************/

    getLowestScore(score) {
        const lowestScore = localStorage.getItem('lowestScore');
        if (!lowestScore || lowestScore > score) {
            localStorage.setItem('lowestScore', score);
            this.setState({
                allTimeScore: score
            });
        }
    }

/***********************************************************************************************
 * handleGuess - Checks if number is too high or too low or correct and setstate to store info
 * @param: {event}
 * @returns: {none}
 **********************************************************************************************/

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

/**************************************************************************************
 * handleInputChange - Adjust input value whenever a key is pressed in the input form
 * @param: {event}
 * @returns: {none}
 **************************************************************************************/

    handleInputChange(event) {
        event.preventDefault();
        this.setState({
            userGuess: event.target.value
        });
    }

/************************************************************************************************
 * handleShake - Function to call if number is too high or low for div to have shake animation
 * @param: {none}
 * @returns: {none}
 ************************************************************************************************/    

    handleShake() {
        this.setState({ 
            shake: true 
        }, () => {
            setTimeout(() => this.setState({ 
                shake: false 
            }), 1000);
        });
    }
 
/****************************************************************************************
 * inoutHistoryArray - Sets state of history into array that will be mapped through for 
 * displaying user history of guesses. 
 * @param: {none}
 * @returns: {none}
 ****************************************************************************************/    

    inputHistoryArray() {
        const { history, historyInfo, userGuess } = this.state;
        this.setState({
            history: [`${parseInt(userGuess)} | ${historyInfo}`, ...history],
            userGuess: ''
        })
    }

/******************************************************************************************
 * randomGenteratedNumber - Randomly generates a number at the beginning of each new game
 * @param: {none}
 * @returns: {pickedNumber}
 ******************************************************************************************/    

    randomGeneratedNumber() {
        const pickedNumber = Math.floor(Math.random() * 10000 + 1);
        return pickedNumber;
    }

/***********************************************************************************************************
 * resetGame - Sets state of all needed key pair values back to a new game and picks another random number.
 * @param: {none}
 * @returns: {none}
 ***********************************************************************************************************/    

    resetGame() {
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
