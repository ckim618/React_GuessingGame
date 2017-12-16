import React, { Component } from 'react';
import History from './history';
import '../assets/app.css';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allTimeAverage: localStorage.getItem('allTimeAverage') || 'Not Set',
            allTimeScore: localStorage.getItem('lowestScore') || 'Not Set',
            disableButton: false,
            gameInfo: null,
            guessCounter: 0,
            guessAverage: [],
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

    getAverageScore() {
        const {guessAverage} = this.state;
        const sum = guessAverage.reduce((total, currentValue) => {
            const totalNum = parseInt(total);
            const currentVal = parseInt(currentValue)
            return parseInt(totalNum + currentVal)
        });
        const arrayLength =  guessAverage.length;
        const averageScore = Math.floor((sum/ arrayLength));
        localStorage.setItem('allTimeAverage', averageScore)        
        this.setState({
            allTimeAverage: averageScore
        });
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
        event.preventDefault();
        //Used let because guesscounter is always changing based on outcome
        let { guessAverage, guessCounter, randomNumber, userGuess } = this.state;

        if (userGuess === null || userGuess === '') {
            return;
        }
        if (userGuess < randomNumber) {
            this.setState({
                gameInfo: `${userGuess} is too low `,
                historyInfo: 'Too Low',
                guessCounter: guessCounter += 1
            }, () => {
                this.inputHistoryArray();
            });
        } else if (userGuess > randomNumber) {
            this.setState({
                gameInfo: `${userGuess} is too high`,
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
            }, () => {
                this.setState({
                    guessAverage: [`${this.state.guessCounter}`, ...guessAverage]                    
                }, () => {
                    this.getLowestScore(guessCounter);
                    this.getAverageScore();
                });
             
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
        this.setState({ shake: true }, () => {
            setTimeout(() => this.setState({ shake: false }), 1000);
        });
    }

    inputHistoryArray() {
        const { history, historyInfo, userGuess } = this.state;
        this.setState({
            history: [`${userGuess} | ${historyInfo}`, ...history],
            userGuess: ''
        })
    }

    randomGeneratedNumber() {
        const pickedNumber = Math.floor(Math.random() * 1000 + 1);
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
        console.log('Current state is ', this.state);
        const { allTimeAverage, allTimeScore, disableButton, gameInfo, guessCounter, history, shake, userGuess } = this.state;
        const correctNumber = "You've guessed the number!"
        return (
            <div className="text-center gameContainer">
                <div className="infoContainer">
                    <h2 className="text-center my-3">Guess A Number Between 1-1000</h2>
                    <form onSubmit={this.handleGuess}>
                        <input
                            placeholder="Guess"
                            onChange={this.handleInputChange}
                            value={userGuess} type="number"
                            className="form-control form-control-lg user-input center-align"
                        />
                    </form>
                    <button onClick={this.resetGame} className="btn btn-outline-danger btn-lg buttons" type="button">{disableButton ? 'Play Again' : 'Reset'}</button>
                    <button onClick={this.handleGuess} className={"btn btn-outline-success btn-lg buttons" + (disableButton ? ' disabled' : '')}>Guess</button>
                    <h2 className={"text-center my-3 " + (gameInfo === correctNumber ? 'gameInfoGreen ' : '') + (shake ? 'shake' : '')}>{gameInfo}</h2>
                    <p className="scoreTracker">{`Number of guesses: ${guessCounter}`}</p>
                    <br />
                    <p className="allTimeScore">{`All Time Lowest Score: ${allTimeScore}`}</p>
                    <History history={history} />
                </div>
            </div>
        )
    }
}

export default Game;
