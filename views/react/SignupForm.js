import React from 'react';
import { ModalForm } from './ModalForm';
import { TextInput } from './TextInput';
import { DobSelect } from './DobSelect';
import { ErrorOutput } from './ErrorOutput';
import './SignupForm.css';

export function SignupForm(props){
  props.validateFuncsRef.current.name = validateName;
  props.validateFuncsRef.current.email = validateEmail;
  props.validateFuncsRef.current.password = validatePassword;
  props.validateFuncsRef.current.dobMonth = validateDobMonth;
  props.validateFuncsRef.current.dobDay = validateDobDay;
  props.validateFuncsRef.current.dobYear = validateDobYear;

  function validateName(addError, name){
    if(!name)
      addError('Name field cannot be empty.');
    else if(name.length > 50)
      addError('Name field cannot be longer than 50 characters.');
  }

  function validatePassword(addError, password){
    if(!password)
      addError('Password field cannot be empty.', password);
    else if(password.length > 50)
      addError('Password field cannot be longer than 50 characters.', password);
  }

  function validateEmail(addError, email){
    if(!email)
      addError('Email field cannot be empty.', email);
    else{
      if(email.length > 50)
        addError('Email field cannot be longer than 50 characters.', email);
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        addError('Email format is not valid.')
    }
  }

  function validateDobMonth(addError, dobMonth){
    if(!dobMonth)
      addError('Month field cannot be empty.');
  }

  function validateDobDay(addError, dobDay){
    if(!dobDay)
      addError('Day field cannot be empty.');
  }

  function validateDobYear(addError, dobYear){
    if(!dobYear)
      addError('Year field cannot be empty.');
  }

  function concatArrays(){
    let arrResult = [];
    Array.from(arguments).forEach(arg => {
      if(arg != undefined && arg.length > 0)
        arrResult = [...arrResult, ...arg];
    });
    return arrResult;
  }

  return(
    <ModalForm 
      formRef={props.formRef} 
      formClassName="signup-modal-form"
      action="/signup" 
      title="Create your account" 
      submitValue="Sign up" 
      submitClassName="signup-modal-submit"
      onSubmit={props.onSubmit}>
      <div>
        <TextInput name="name" label="Name" type="text" value={props.values.name} onChange={props.onChange}/>
        <ErrorOutput source={props.errors.name}/>
      </div>
      <div>
        <TextInput name="password" label="Password" type="password" value={props.values.password} onChange={props.onChange}/>
        <ErrorOutput source={props.errors.password}/>
      </div>
      <div>
        <TextInput name="email" label="Email" type="text" value={props.values.email} onChange={props.onChange}/>
        <ErrorOutput source={props.errors.email}/>
      </div>
      <div className="signup-dob-section">
        <h5>Date of birth</h5>
        <p>
          This will not be shown publicly. Confirm your own age, even if
          this account is for a business, a pet, or something else.
        </p>
        <div>
          <DobSelect dobMonth={props.values.dobMonth} dobDay={props.values.dobDay} dobYear={props.values.dobYear} onChange={props.onChange}/>
          <ErrorOutput source={concatArrays(props.errors.dobMonth, props.errors.dobDay, props.errors.dobYear)}/>
        </div>
      </div>
    </ModalForm>
  );
}