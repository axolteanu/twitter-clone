import React, { useState } from 'react';
import { ModalForm } from './ModalForm';
import { TextInput } from './TextInput';
import { ErrorOutput } from './ErrorOutput';
import './LoginForm.css';

export function LoginForm(props){
  props.validateFuncsRef.current.email = validateEmail;
  props.validateFuncsRef.current.password = validatePassword;
  props.submitFuncRef.current = submit;

  const [loginError, setLoginError] = useState();

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

  function submit(){
    const data = new URLSearchParams();
    for (const pair of new FormData(props.formRef.current)) {
        data.append(pair[0], pair[1]);
    }
    fetch('login', {
      method: 'POST',
      body: data
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      if(data.error)
        setLoginError(data.error);
      else{
        window.location.href = "/home";
      }
    });
  }

  return(
    <ModalForm 
      formRef={props.formRef}
      formClassName="login-modal-form"
      action="/login" 
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
      <ErrorOutput source={loginError}/>
    </ModalForm>
  );
}