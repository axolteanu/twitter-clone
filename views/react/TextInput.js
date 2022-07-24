import React, { useEffect, useRef } from 'react';
import './TextInput.css';

export function TextInput(props){
  const input = useRef();
  const inputWrapper = useRef();

  useEffect(() => {
    input.current.addEventListener('focusin', (e) => {
      let elem = e.target.parentElement.children[1];
      elem.style.top = '10px';
      elem.style.fontSize = '13px';
      elem.style.color = 'rgb(29,155,240)';
    });
    inputWrapper.current.addEventListener('focusout', (e) => {
      let elem = e.target.parentElement.children[1];
      if(e.target.parentElement.children[0].value === ''){
        elem.style.top = '20px';
        elem.style.fontSize = '18px';
      }
      elem.style.color = 'rgb(72,72,72)';
    });
  });

  return (
    <div ref={inputWrapper} className="text-input-wrapper">
      <input ref={input} name={props.name} type={props.type}/>
      <label>{props.label}</label>
    </div>
  );
}