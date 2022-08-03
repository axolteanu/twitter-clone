import React from 'react';
import { ModalForm } from './ModalForm';
import { TextInput } from './TextInput';
import './LoginForm.css';

export function LoginForm(props){
  props.validateFuncsRef.current.email = validateEmail;
  props.validateFuncsRef.current.password = validatePassword;

  function validateEmail(){
    let errorMsg = '';
    if(!props.values['email'])
      errorMsg += 'Email field cannot be empty.';
    if(!props.values['email'] > 50)
      errorMsg += '\nEmail field cannot be longer than 50 characters.';
    return errorMsg;
  }

  function validatePassword(){
    let errorMsg = '';
    if(!props.values['password'])
      errorMsg += 'Password field cannot be empty.';
    if(!props.values['password'] > 50)
      errorMsg += '\nPassword field cannot be longer than 50 characters.';
    return errorMsg;
  }

  const submit = <input className="modal-submit login-modal-submit" form="modal-form" type="submit" value="Log in"/>;

  return(
    <ModalForm formRef={props.formRef} action="/login" title="Log in to your account" className="login-modal-form" submit={submit} onSubmit={props.onSubmit}>
      <div>
        <TextInput name="email" label="Email" type="text" value={props.values.email} onChange={props.onChange}/>
        <div className='error-output'>{props.errors.email}</div>
      </div>
      <div>
        <TextInput name="password" label="Password" type="password" value={props.values.password} onChange={props.onChange}/>
        <div className='error-output'>{props.errors.password}</div>
      </div>
    </ModalForm>
  );
}