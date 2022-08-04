import React, { useRef, useState } from 'react';

export function withValidation(WrappedForm){
  return function FormWithValidation(){

    const formRef = useRef();
    const validateFuncsRef = useRef({});
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    function onChange(e){
      setValues(prevValues => ({
        ...prevValues, 
        [e.target.name]: e.target.value
      }));
    }

    function onSubmit(e){
      e.preventDefault();
      if(validate())
        formRef.current.submit();
      else
        return false;
    }

    function validate(){
      let isValid = true;
      const objErrors = {};
      const fieldNames = Object.keys(validateFuncsRef.current);
      fieldNames.forEach(name => {
        const arrErrors = [];
        const addError = (errorMsg) => { arrErrors.push(errorMsg) };
        validateFuncsRef.current[name](addError, values[name]);
        if(arrErrors.length > 0)
          isValid = false;
        objErrors[name] = arrErrors;
      });
      setErrors(objErrors);
      return isValid;
    }
    return(
      <WrappedForm 
        formRef={formRef}
        values={values}
        errors={errors}
        validateFuncsRef={validateFuncsRef} 
        onChange={onChange} 
        onSubmit={onSubmit}/>
    );
  }
}