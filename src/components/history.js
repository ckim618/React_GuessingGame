import React from 'react';
import '../assets/app.css';

export default (props) => {
    console.log(props)

    const savedGuess = props.history.map((value, index) => {
        return (
            <div key={index}>
                <li className="guessNumber">{value}</li>               
            </div>
        )
    });

    return (
        <ul className="guessHistory">
            {savedGuess}
        </ul>
    )
} 

