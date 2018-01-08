import React from 'react';
import '../assets/app.css';

export default (props) => {

    let liClass = 'guessNumber '; 
    //If string has word high, adds class to make color red, else color is blue
    if(props.value.indexOf('High') != -1) {
        liClass += 'tooHigh'
    } else {
        liClass += 'tooLow'
    }
    return <li className={liClass}>{props.value}</li>
  
}