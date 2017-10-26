import React, { Component } from 'react';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            randomNumber: this.randomGeneratedNumber(),
            userGuess: null
        }
        this.resetGame = this.resetGame.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    randomGeneratedNumber() {
        const pickedNumber = Math.floor(Math.random()*10 + 1);
        return pickedNumber;
    }

    handleGuess(event) {
        event.preventDefault();
        console.log('Checking the guess');
    }

    handleInputChange(event) {
        event.preventDefault();
        this.setState({
            userGuess: event.target.value
        })
    }

    resetGame(event) {
        event.preventDefault();
        console.log('Reset was clicked');
        this.setState({
            randomNumber: this.randomGeneratedNumber()
        });
    }

    render(){
        return (
            <div className="text-center">
                <h1 className="text-center my-3">Guess A Number Between 1-10</h1>
                <form onClick={this.handleGuess}>
                    <input type="number"/>
                </form>
                <button onClick={this.resetGame} className="btn btn-outline-danger btn-lg">Reset</button>
                <button onClick={this.handleInputChange} className="btn btn-outline-success btn-lg">Guess</button>
                <h1>Your Guess Info</h1>
            </div>
        )
    }
}

export default Game;
