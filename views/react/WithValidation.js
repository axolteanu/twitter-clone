import React, { useRef, useState } from 'react';

export function withValidation(WrappedForm){
  return function FormWithValidation(props){
    const validateFuncsRef = useRef({});
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [responseError, setResponseError] = useState();

    function onChange(e){
      setValues(prevValues => ({
        ...prevValues, 
        [e.target.name]: e.target.value
      }));
    }

    function onSubmit(e){
      e.preventDefault();
      if(validate())
        submit(e.target);
      else
        return false;
    }

    function submit(form){
      const data = new URLSearchParams();
      for (const pair of new FormData(form)) {
          data.append(pair[0], pair[1]);
      }
      console.log(form.action);
      fetch(form.action, {
        method: 'POST',
        body: data
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if(data.error)
          setResponseError(data.error);
        else{
          window.location.href = props.actionOnSuccess;
        }
      });
    }

    function validate(){
      let isValid = true;
      const objErrors = {};
      const fieldNames = Object.keys(validateFuncsRef.current);
      fieldNames.forEach(name => {
        const arrErrors = [];
        const addError = (errorMsg) => { arrErrors.push(errorMsg) };
        validateFuncsRef.current[name](addError, values[name]);
        if(isValid && arrErrors.length > 0)
          isValid = false;
        objErrors[name] = arrErrors;
      });
      setErrors(objErrors);
      return isValid;
    }
    
    return(
      <WrappedForm 
        values={values}
        errors={errors}
        responseError={responseError}
        validateFuncsRef={validateFuncsRef}
        onChange={onChange} 
        onSubmit={onSubmit}/>
    );
  }
}