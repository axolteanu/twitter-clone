import React from 'react';
import './TextInput.css';

export function TextInput(props){
  function onBlurWrapper(e){
    let elem = e.target.parentElement.children[1];
    if(e.target.parentElement.children[0].value === ''){
      elem.style.top = '20px';
      elem.style.fontSize = '18px';
    }
    elem.style.color = 'rgb(72,72,72)';
  }

  function onFocusInput(e){
    let elem = e.target.parentElement.children[1];
    elem.style.top = '10px';
    elem.style.fontSize = '13px';
    elem.style.color = 'rgb(29,155,240)';
  }

  return (
    <div className="text-input-wrapper" onBlur={onBlurWrapper}>
      <input ref={props.inputRef} name={props.name} type={props.type} onFocus={onFocusInput}/>
      <label>{props.label}</label>
    </div>
  );
}