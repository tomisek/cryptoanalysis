import React from 'react'
import './Register.css'
import useForm from "./UseForm";
import validate from './RegisterFormValidationRules';

export const Register = (props) => {

    
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
      } = useForm(login, validate);

      function login() {
        console.log('No errors, submit callback called!');
      }
    
    return (
        <div className="registerPage">
            
            <div className="formWrapper">
                <h1 className="title">{props.title}</h1>
                <form onSubmit={handleSubmit} noValidate>
        
                    <label htmlFor="email">Email</label><input autoComplete="off" className={`input ${errors.email}`} type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                    {errors.email && (
                    <p className="help">{errors.email}</p>
                    )}
                    <label htmlFor="name">Name</label><input autoComplete="off" className={`input ${errors.name}`} type="text" name="name" onChange={handleChange} value={values.name || ''} required />
                    {errors.name && (
                    <p className="help">{errors.name}</p>
                    )}
                    <label htmlFor="password">Password</label> <input className={`input ${errors.password}`} type="password" name="password" onChange={handleChange} value={values.password || ''} required />
                
                    {errors.password && (
                    <p className="help">{errors.password}</p>
                    )}
                    <label htmlFor="password">Confirm Password</label><input className={`input ${errors.confirmPassword}`} type="password" name="confirmPassword" onChange={handleChange} value={values.confirmPassword || ''} required />
                    {errors.confirmPassword && (
                    <p className="help">{errors.confirmPassword}</p>
                    )}
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}