import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setErrors(null);

        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                navigate('/dashboard'); // Navigate to /dashboard on successful login
            })
            .catch(err => {
                const response = err.response;
                console.log(response);
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } 
                    else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            });
    };

    return (
        <main className="login-main">
            <div className="login-background">
                <img src="images/Logo-mmcm.png" alt="Logo"/>
            </div>
            <div className="Login-Form">
                <div className="login-logo">
                    <img src="images/Logo-Final-2.png" alt="Logo"/>
                </div>
                <div className="loginform">
                    <form onSubmit={onSubmit}>
                        <h1 className="Title">Sign In</h1>
                        <hr />
                        {errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>}
                        <input ref={emailRef} type="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <button className="Btn">Sign in</button>
                        <p>For new accounts or password resets, please contact the administrator</p>
                    </form>
                </div>
            </div>
        </main>
    );
}