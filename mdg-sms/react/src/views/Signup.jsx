import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate


    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
      ev.preventDefault();
      const payload = { 
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value
      }
      setError(null);
      axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(null)
        setToken(null);
        navigate('/login');
      })
      .catch((error) => {
        const response = error.response;
        if (response.status === 422) {
          setError(response.data.errors);
        }
    });
    }

    return (
      <div className="login-signup-form animated fadeInDown">
      <div className="form">
            <form onSubmit = {onSubmit}>
              <h1 className="title">Sign up Override</h1>
                {error && <div className="alert">
                  {Object.keys(error).map(key => (
                    <p key={key}>{error[key][0]}</p>
                  ))}</div>}
              <input ref={nameRef} type="text"  placeholder="Full Name" />
              <input ref={emailRef} type="email" name="email" placeholder="Email Address" />
              <input ref={passwordRef} type="password" name="password" placeholder="Password" />
              <input ref={passwordConfirmationRef} type="password" name="passwordConfirmation" placeholder="Password Confirmation" />
              <button className="btn btn-block">Sign up</button>
              <p className="message">
                Already registered? <Link to="/login">Sign in</Link>
              </p>
            </form>
      </div>
      </div>
    );
};