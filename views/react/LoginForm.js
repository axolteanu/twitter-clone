import React from 'react';
import { ModalForm } from './ModalForm';
import { TextInput } from './TextInput';
import { ErrorOutput } from './ErrorOutput';
import './LoginForm.css';

export function LoginForm(props){
  props.validateFuncsRef.current.email = validateEmail;
  props.validateFuncsRef.current.password = validatePassword;

  function validateEmail(addError, email){
    if(!email)
      addError('Email field cannot be empty.', email);
    else if(email.length > 50)
      addError('Email field cannot be longer than 50 characters.', email);
  }

  function validatePassword(addError, password){
    if(!password)
      addError('Password field cannot be empty.', password);
    else if(password.length > 50)
      addError('Password field cannot be longer than 50 characters.', password);
  }

  return(
    <ModalForm 
      formClassName="login-modal-form"
      title="Log in to your account" 
      submitValue="Log in" 
      submitClassName="login-modal-submit"
      onSubmit={props.onSubmit}>
      <div>
        <TextInput name="email" label="Email" type="text" value={props.values.email} onChange={props.onChange}/>
        <ErrorOutput source={props.errors.email}/>
      </div>
      <div>
        <TextInput name="password" label="Password" type="password" value={props.values.password} onChange={props.onChange}/>
        <ErrorOutput source={props.errors.password}/>
      </div>
      <br/>
      <ErrorOutput source={props.responseError}/>
    </ModalForm>
  );
}