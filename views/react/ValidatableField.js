import React, { useState } from 'react';
import './ValidatableField.css';

export function ValidatableField(props){

  const [errorOutput, setErrorOutput] = useState('');
  props.validationFuncRef.current = validate;

  function validate(){
    let isFieldValid = true;
    let errorMsgs = [];
    
    props.validations.forEach(validation => {
      let res = validation();
      if(res != undefined)
        errorMsgs.push(res);
    });
    
    if(errorMsgs.length > 0){
      isFieldValid = false;
      let newErrorOutput = errorMsgs.shift();
      errorMsgs.forEach(msg => newErrorOutput + `\n ${msg}`);
      setErrorOutput(newErrorOutput);
    }else
      setErrorOutput('');

    return isFieldValid;
  }

  return (
    <div>
      {props.children}
      <div className='error-msg'>{errorOutput}</div>
    </div>
  );
}