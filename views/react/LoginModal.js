import React from 'react';
import { FormModal } from './FormModal';
import './LoginModal.css'

export function LoginModal(props){
  return(
    <FormModal action="/login" submitValue="Log in" submitClass="login-modal-submit" handleExitClick={props.handleExitClick}>
      <div>Log in to your account</div>
    </FormModal>
  );
}