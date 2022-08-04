import React from 'react';
import './ErrorOutput.css';

export function ErrorOutput(props){
  let output = '';
  const errors = props.source;
  if(errors != undefined && errors.length > 0){
    output += errors.shift();
    while(errors.length > 0){
      output += ` ${errors.shift()}`;
    }
  }

  return (
    <div className='error-output'>{output}</div>
  );
}