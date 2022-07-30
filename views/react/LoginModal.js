import React, { useRef } from 'react';
import { FormModal } from './FormModal';
import { TextInput } from './TextInput';
import { ValidatableField } from './ValidatableField';
import './LoginModal.css'

export function LoginModal(){

  const emailInputRef = useRef();
  const pwInputRef = useRef();

  const emailValidations = [
    () => {
      if(!emailInputRef.current.value)
        return 'Email field cannot be empty.';
    }, 
    () => {
      if(emailInputRef.current.value.length > 50)
        return 'Email field cannot be longer than 50 characters.';
    }
  ]

  const pwValidations = [
    () => {
      if(!pwInputRef.current.value)
        return 'Password field cannot be empty.';
    }, 
    () => {
      if(pwInputRef.current.value.length > 50)
        return 'Password field cannot be longer than 50 characters.';
    }
  ]

  return(
    <FormModal action="/login" submitValue="Log in" formClass="login-modal-form" submitClass="login-modal-submit">
      <div className="form-title">Log in to your account</div>
      <ValidatableField validations={emailValidations}>
        <TextInput inputRef={emailInputRef} name="email" label="Email" type="text"/>
      </ValidatableField>
      <ValidatableField  validations={pwValidations}>
        <TextInput inputRef={pwInputRef} name="password" label="Password" type="password"/>
      </ValidatableField>
    </FormModal>
  );
}