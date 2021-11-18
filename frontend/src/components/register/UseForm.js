import { useState, useEffect, useContext } from 'react';
import { RegUserContext } from '../../shared/global/provider/RegUserProvider';


const useForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError,setRegisterError] = useContext(RegUserContext)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);
  
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setRegisterError(null)
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
};

export default useForm;