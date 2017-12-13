import React, { Component } from 'react';
import History from './history';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            randomNumber: this.randomGeneratedNumber(),
            userGuess: '',
            gameInfo: null,
            guessCounter: 0,
            lowestScore: localStorage.getItem('lowestScore') || '',
        }
        this.resetGame = this.resetGame.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleShake = this.handleShake.bind(this);
        this.getLowestScore = this.getLowestScore.bind(this);
        
    }
    randomGeneratedNumber() {
        const pickedNumber = Math.floor(Math.random()*10 + 1);
        return pickedNumber;
    }

    handleGuess(event) {
        event.preventDefault();
        let {userGuess, randomNumber, history, guessCounter} = this.state;

        if(userGuess === null || userGuess === '') {
            return;
        }
        if(userGuess < randomNumber) {
            this.setState({
                gameInfo: 'Number is too low',
                guessCounter: guessCounter += 1
            });
        } else if (userGuess > randomNumber) {
            this.setState({
                gameInfo: 'Number is too high',
                guessCounter: guessCounter += 1
            });
        } else {
            this.setState({
                gameInfo: "You've guessed the number!",
                lowestScore: guessCounter += 1
            }, () => {
                this.getLowestScore(this.state.lowestScore);
            });
            
        }
        this.setState({
            history: [userGuess, ...history]
        })
        this.handleShake();
    }

    handleInputChange(event) {
        event.preventDefault();
        this.setState({
            userGuess: event.target.value
        });
    }

    handleShake() {
        this.setState ({ shake: true }, () => {
            setTimeout (() => this.setState ({ shake: false }), 1000);
        });
    }

    getLowestScore(score) {
        const lowestScore = localStorage.getItem('lowestScore');
        if(!lowestScore || lowestScore > score) {
            localStorage.setItem('lowestScore', score);
            this.setState({
                lowestScore: score
            });
        }
    }


    resetGame(event) {
        event.preventDefault();
        console.log('Reset was clicked');
        this.setState({
            history: [],
            randomNumber: this.randomGeneratedNumber(),
            userGuess: null,
            gameInfo: null,
            guessCounter: 0,
        });
    }

    render(){
        console.log('Current state is ', this.state);
        const {userGuess, gameInfo, history, randomNumber, shake, guessCounter, lowestScore} = this.state;
        return (
            <div className="text-center gameContainer">
                <h2 className="text-center my-3">Guess A Number Between 1-10</h2>
                <div onSubmit={this.handleGuess}>
                    <input placeholder="Guess"  onChange={this.handleInputChange} value={userGuess} type="number" className="form-control form-control-lg user-input center-align"/>
                </div>
                <button onClick={this.resetGame} className="btn btn-outline-danger btn-lg buttons" type="button">Reset</button>
                <button onClick={this.handleGuess} className="btn btn-outline-success btn-lg buttons">Guess</button>
                <h2 className ={"text-center my-3 " + ( shake ? 'shake' : '') }>{this.state.gameInfo}</h2>
                <p className="scoreTracker">{`Number of guesses: ${guessCounter} | Lowest Score: ${lowestScore}`}</p>
                <History history={history} guessInfo={gameInfo} randomNumber={randomNumber} userGuess={userGuess}/>
            </div>
        )
    }
}

export default Game;
