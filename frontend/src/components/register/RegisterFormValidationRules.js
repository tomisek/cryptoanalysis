export default function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if(!values.name){
        errors.name = 'Name is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 3) {
      errors.password = 'Password must be 3 or more characters';
    }
    if(!values.confirmPassword){
        errors.confirmPassword = 'Confirm Password is required';
    }else if(values.password !== values.confirmPassword){
        errors.confirmPassword = 'Passwords do not match'
    }
    return errors;
  };
  