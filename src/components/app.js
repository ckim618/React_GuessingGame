import React from 'react';
import GameContainer from './gameContainer';

const App = () => (
    <div className="container">
        <p className="title">South Park&nbsp;<span id="guessText">Guessing</span>&nbsp;<span id="gameText">Game</span></p>
        <GameContainer />
    </div>
);

export default App;
