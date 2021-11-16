import { useState, useEffect, useContext } from 'react';
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../shared/global/provider/UserProvider';



const useForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const logInUser = (userObject) => {

    setAuthenticatedUser(userObject['values.email'])
    localStorage.setItem("name", userObject['values.name'])
    history.push('/userpage')

}

  
  const handleSubmit = async (event) =>{
    if(event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true)
    
    const userObject = {
        "email": values.email,
        "name": values.name,
        "password": values.password
    }
    console.log(userObject)
    
    const response = await CryptoShuttleService.registerUser(userObject)
    console.log(response);
    console.log(userObject)
    logInUser(userObject)
    
}

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