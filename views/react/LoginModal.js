import React from 'react';
import { FormModal } from './FormModal';
import { TextInput } from './TextInput';
import './LoginModal.css'

export function LoginModal(){
  return(
    <FormModal action="/login" submitValue="Log in" formClass="login-modal-form" submitClass="login-modal-submit">
      <div className="form-title">Log in to your account</div>
      <TextInput name="email" label="Email" type="text"/>
      <TextInput name="password" label="Password" type="password"/>
    </FormModal>
  );
}