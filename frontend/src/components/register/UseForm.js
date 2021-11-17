import { useState, useEffect, useContext } from 'react';
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import { UserContext } from '../../shared/global/provider/UserProvider';



const useForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const logInUser = async ()   => {

   try{
    const email = values.email
    const password = values.password
    const userFromServer = await CryptoShuttleService.loginUser({email, password})
    setAuthenticatedUser(userFromServer.data.access_token)
    localStorage.setItem("token", userFromServer.data.access_token)
    /* document.getElementsById('noMatch').style.visibility = "hidden" */
    }
    catch(error){
        alert('Wrong email or password')
    }        
}

  
  const handleSubmit = async (event) =>{
    if(event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true)
    
    
    
    const userObject = {
      "email": values.email,
      "name": values.name,
      "password": values.password,
  }
  
  try{
      const response = await CryptoShuttleService.registerUser(userObject)
      console.log(response);
      logInUser(userObject)
  }
  catch(error){
      if (error.response.data){
          // Show error message from server
          /* errors.email = error.response.data['error']; */
          alert(error.response.data['error'])
      }

      console.error(error.message);
  }
    
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