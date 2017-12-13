import React, { Component } from 'react';
import History from './history';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            randomNumber: this.randomGeneratedNumber(),
            userGuess: '',
            gameInfo: null
        }
        this.resetGame = this.resetGame.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleShake = this.handleShake.bind(this);
        
    }
    randomGeneratedNumber() {
        const pickedNumber = Math.floor(Math.random()*10 + 1);
        return pickedNumber;
    }

    handleGuess(event) {
        event.preventDefault();
        const {userGuess, randomNumber, history} = this.state;
        if(userGuess < randomNumber) {
            this.setState({
                gameInfo: 'Number is too low'
            });
        } else if (userGuess > randomNumber) {
            this.setState({
                gameInfo: 'Number is too high'
            });
        } else {
            this.setState({
                gameInfo: "You've guessed the number!"
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


    resetGame(event) {
        event.preventDefault();
        console.log('Reset was clicked');
        this.setState({
            history: [],
            randomNumber: this.randomGeneratedNumber(),
            userGuess: null,
            gameInfo: null
        });
    }

    render(){
        console.log('Current state is ', this.state);
        const {userGuess, gameInfo, history, randomNumber, shake} = this.state;
        return (
            <div className="text-center">
                <h1 className="text-center my-3">Guess A Number Between 1-10</h1>
                <form onSubmit={this.handleGuess} >
                    <input onChange={this.handleInputChange} value={userGuess} type="number"/>
                </form>
                <button onClick={this.resetGame} className="btn btn-outline-danger btn-lg" type="button">Reset</button>
                <button onClick={this.handleGuess} className="btn btn-outline-success btn-lg">Guess</button>
                <h1 className ={"text-center my-3 " + ( shake ? 'shake' : '') }>{this.state.gameInfo}</h1>
                <History history={history} guessInfo={gameInfo} randomNumber={randomNumber} userGuess={userGuess}/>
            </div>
        )
    }
}

export default Game;
