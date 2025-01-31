import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

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
        };
        setError(null);
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(null);
                setToken(null);
                navigate('/login');
            })
            .catch((error) => {
                const response = error.response;
                if (response.status === 422) {
                    setError(response.data.errors);
                }
            });
    };

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
                        <p className="text-[25px] font-bold pb-6">Sign up</p>
                        <hr />
                        {error && <div className="alert text-xs text-red-500">
                            {Object.keys(error).map(key => (
                                <p key={key}>{error[key][0]}</p>
                            ))}
                        </div>}
                        <p className="font-semibold text-xs text-left mt-3">Full Name</p>
                        <input className="text-sm pl-4" ref={nameRef} type="text" placeholder="Full Name" />
                        <p className="font-semibold text-xs text-left mt-3">Email Address</p>
                        <input className="text-sm pl-4" ref={emailRef} type="email" placeholder="Email Address" />
                        <p className="font-semibold text-xs mt-1 text-left">Password</p>
                        <input className="text-sm pl-4" ref={passwordRef} type="password" placeholder="Password" />
                        <p className="font-semibold text-xs mt-1 text-left">Password Confirmation</p>
                        <input className="text-sm pl-4" ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                        <button className="Btn mt-2 font-medium bg-blue-800 hover:bg-blue-950 transition-colors ease-linear duration-300">Sign up</button>
                        <p className="text-sm pt-5">Already registered? <Link to="/login" className="font-medium text-blue-800 hover:text-blue-950 transition-colors ease-linear duration-300">Sign in</Link></p>
                    </form>
                </div>
            </div>
        </main>
    );
}