import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Contexts } from './Contexts';
import './FormModal.css';

export function FormModal(props){
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';

  useEffect(() => {
    document.body.appendChild(modalRoot);
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.removeChild(modalRoot);
    document.body.style.overflowY = 'initial';
    }
  });

  const modalContextType = useContext(Contexts.ModalContext);

  const view = (
    <div className="modal">
      <div id="modal-header">
        <svg id="modal-exit-img" width="36" height="36" fill="transparent" onClick={modalContextType.handleExitClick}>
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