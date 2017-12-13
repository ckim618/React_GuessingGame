import React from 'react';
import '../assets/app.css';

export default (props) => {
    console.log(props)
    const savedGuess = props.history.map((value, index) => {
        return (
            <div>
                <li key={index} className="guessNumber">{value}</li>               
            </div>
        )
    });

    return (
        <ul className="guessHistory">
            {savedGuess}
        </ul>
    )
} 

