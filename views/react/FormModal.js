import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from './Contexts';
import './FormModal.css';

export function FormModal(props){
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  
  const root = document.getElementById('root');
  const initScrollY = window.scrollY;
  
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

  const modalCt = useContext(ModalContext);

  const view = (
    <div className="modal">
      <div id="modal-header">
        <svg id="modal-exit-img" width="36" height="36" fill="transparent" onClick={modalCt.handleExitClick}>
          <circle cx="18" cy="18" r="17"/>
          <line x1="12" y1="12" x2="24" y2="24" stroke="black" strokeWidth="1.75"/>
          <line x1="24" y1="12" x2="12" y2="24" stroke="black" strokeWidth="1.75"/>
        </svg>
      </div>
      <form id="modal-form" action={props.action} method="post">
        {props.children}
      </form>
      <div id="modal-footer">
      <input id={props.submitId} className={`modal-submit ${props.submitClass}`} type="submit" form="modal-form" value={props.submitValue}/>
      </div>
    </div>
  );

  return ReactDOM.createPortal(view, modalRoot);
}