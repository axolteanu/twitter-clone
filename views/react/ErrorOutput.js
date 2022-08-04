import React from 'react';
import './ErrorOutput.css';

export function ErrorOutput(props){

  const output = buildOutput(props.source)

  function buildOutput(errors){
    let output = '';
    if(errors != undefined && errors.length > 0){
      output += errors.shift();
      while(errors.length > 0){
        output += `\n${errors.shift()}`;
      }
    }
    return output;
  }

  return (
    <div className='error-output'>{output}</div>
  );
}