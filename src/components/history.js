import React from 'react';
import List from './historyList';
import '../assets/app.css';

export default (props) => {
    const savedGuess = props.history.map((value, index) => {
        return  <List key={index} value={value}/>              
    });

    return (
        <ul className="guessHistory">
            {savedGuess}
        </ul>
    )
} 

