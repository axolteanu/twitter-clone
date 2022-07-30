import React, { cloneElement, useContext, useEffect, useReducer, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from './Contexts';
import './FormModal.css';
import { ValidatableField } from './ValidatableField';

// Showing pop-up when the page is scrolled down would also work fine with 'window.scrollTo(0,0)' without having to use updateOnResize().
// The updateOnResize() function was implemented as an exercise to make it work without scrolling to the top.

export function FormModal(props){
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  
  const root = document.getElementById('root');
  const initScrollY = window.scrollY;
  
  let validationFuncRefs = [];
  const childrenWithValidationFunctionRefs = React.Children.map(props.children, child => {
    if(child.type === ValidatableField){
      const validationFuncRef = useRef();
      validationFuncRefs.push(validationFuncRef);
      return React.cloneElement(child, { validationFuncRef: validationFuncRef });
    }
    return child;
  });

  const modalCt = useContext(ModalContext);

  const updateOnResize = () => {
    if(window.scrollY > 0){
      root.style.marginTop = (window.scrollY - (root.clientHeight - modalRoot.clientHeight)) + 'px';
      if(initScrollY > window.scrollY)
        modalRoot.style.top = root.style.marginTop;
      else{
        modalRoot.style.top = window.scrollY + 'px';
      }
    }else{
      root.style.marginTop = 'initial';
      modalRoot.style.top = 0;
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateOnResize);
    document.body.appendChild(modalRoot);
    document.body.style.overflowY = 'hidden';
    modalRoot.style.top = initScrollY + 'px';
    return () => {
      window.removeEventListener('resize', updateOnResize);
      document.body.removeChild(modalRoot);
      document.body.style.overflowY = 'initial';
      root.style.marginTop = 'initial';
    }
  });

  function onSubmit(e){
    e.preventDefault();
    const validationResults = validationFuncRefs.map(f => f.current());
    while(validationResults.length > 0){
      if(!validationResults.shift())
        return false;
    }
    document.getElementById('modal-form').submit();
  }

  const view = (
    <div className="modal">
      <div className="modal-header">
        <svg className="modal-exit-img" width="36" height="36" fill="transparent" onClick={modalCt.handleExitClick}>
          <circle cx="18" cy="18" r="17"/>
          <line x1="12" y1="12" x2="24" y2="24" stroke="black" strokeWidth="1.75"/>
          <line x1="24" y1="12" x2="12" y2="24" stroke="black" strokeWidth="1.75"/>
        </svg>
      </div>
      <form id="modal-form" className={`modal-form ${props.formClass}`} action={props.action} onSubmit={onSubmit} method="post">
          {childrenWithValidationFunctionRefs}
      </form>
      <div className="modal-footer">
        <input className={`modal-submit ${props.submitClass}`} type="submit" form="modal-form" value={props.submitValue}/>
      </div>
    </div>
  );

  return ReactDOM.createPortal(view, modalRoot);
}