import React from 'react';
import './ErrorOutput.css';

export function ErrorOutput(props){
  let output = '';

  if(props.source != undefined){
    if(typeof props.source === 'object'){
      const errors = props.source;
      if(errors != undefined && errors.length > 0){
        output += errors.shift();
        while(errors.length > 0)
          output += ` ${errors.shift()}`;
      }
    }else
      output = props.source;
  }
  
  return (
    <div className='error-output'>{output}</div>
  );
}