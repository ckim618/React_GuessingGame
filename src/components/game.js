import React from 'react';
import '../assets/app.css';

export default (props) => {
    const { allTimeScore, disableButton, gameInfo, guessCounter, handleGuess, handleInputChange, resetGame, shake, userGuess } = props;
    const correctNumber = "You've guessed the number!";
    console.log(props)
    return (
        <div>
            <h2 className="text-center my-3">Guess A Number Between 1-10,000</h2>
            <form onSubmit={handleGuess}>
                <input
                    placeholder="Guess"
                    onChange={handleInputChange}
                    value={userGuess} type="number"
                    className="form-control form-control-lg user-input center-align"
                />
            </form>
            <button onClick={resetGame} className="btn btn-outline-danger btn-lg buttons" type="button">{disableButton ? 'Play Again' : 'Reset'}</button>
            <button onClick={handleGuess} className={"btn btn-outline-success btn-lg buttons" + (disableButton ? ' disabled' : '')} disabled={disableButton ? 'disabled' : ''}>Guess</button>
            <h2 className={"text-center my-3 " + (gameInfo === correctNumber ? 'gameInfoGreen ' : '') + (shake ? 'shake' : '')}>{gameInfo}</h2>
            <p className="scoreTracker">{`Number of guesses: ${guessCounter}`}</p>
            <br />
            <p className="allTimeScore">{`All Time Lowest Score: ${allTimeScore}`}</p>
        </div>
    );
}