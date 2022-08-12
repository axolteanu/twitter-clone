import React from 'react';
import './ModalForm.css';

export function ModalForm(props){
 
  return (
    <div className="modal-form-wrapper">
      <form id="modal-form" className="modal-form" action={props.action} onSubmit={props.onSubmit} method="post">
        <div className="modal-form-title">{props.title}</div>
        <div className={props.formClassName}>
          {props.children}
        </div>
      </form>
      <div className="modal-submit-div">
        <input className={`modal-submit ${props.submitClassName}`} form="modal-form" type="submit" value="Log in"/>
      </div>
    </div>
  );

}