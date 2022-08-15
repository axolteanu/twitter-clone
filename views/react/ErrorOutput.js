import React from 'react';
import './ErrorOutput.css';

export function ErrorOutput(props){
  let output = '';

  if(props.source != undefined){
    if(typeof props.source === 'object'){
      const errors = props.source;
      if(errors != undefined){
        for(let i = 0; i < errors.length; i++){
          if(i == 0)
            output = errors[i];
          else
            output += ` ${errors[i]}`;  
        }
      }
    }else
      output = props.source;
  }
  
  return (
    <div className='error-output'>{output}</div>
  );
}