import React from 'react';
import './ModalForm.css';

export function ModalForm(props){
 
  return (
    <div className="modal-form-wrapper">
      <form id="modal-form" ref={props.formRef} className={`modal-form ${props.className}`} action={props.action} onSubmit={props.onSubmit} method="post">
        <div className="modal-form-title">{props.title}</div>
        {props.children}
      </form>
      <div className="modal-submit-div">
        {props.submit}
      </div>
    </div>
  );

}