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

    const { setUser, setToken } = useStateContext();

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
            .then(({ data }) => {
                setUser(null)
                setToken(null);
                navigate('/login');
            })
            .catch((error) => {
                const response = error.response;
                console.log(response.data);
                if (response.status === 422) {
                    setError(response.data.errors);
                }
            });
    }

    return (
        <main className="login-main">
            <div className="login-background">
                <img src="images/Logo-mmcm.png" alt="Logo" />
            </div>
            <div className="Login-Form">
                <div className="login-logo">
                    <img src="images/Logo-Final-2.png" alt="Logo" />
                </div>
                <div className="loginform">
                    <form onSubmit={onSubmit}>
                        <h1 className="Title">Sign Up</h1>
                        <hr />
                        {error && <div className="alert">
                            {Object.keys(error).map(key => (
                                <p key={key}>{error[key][0]}</p>
                            ))}
                        </div>}
                        <input ref={nameRef} type="text" placeholder="Full Name" />
                        <input ref={emailRef} type="email" placeholder="Email Address" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                        <button className="Btn">Sign up</button>
                        <p className="message">
                            Already registered? <Link to="/login">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}
