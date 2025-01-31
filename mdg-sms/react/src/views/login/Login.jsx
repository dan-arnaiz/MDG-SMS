import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";

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
            <div className="Login-Form ">
                <div className="login-logo">
                    <img src="images/Logo-Final-2.png" alt="Logo"/>
                </div>
                <div className="loginform ">
                    <form onSubmit={onSubmit}>
                        <p className="text-[25px] font-bold pb-6">Sign in</p>
                        <hr />
                        {errors && <div className="alert text-xs text-red-500">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>}                            
                        <p className="font-semibold text-xs text-left mt-3">Email Address</p>
                            <input className="text-sm pl-4" ref={emailRef} type="email"/>
                        <p className="font-semibold text-xs mt-1 text-left">Password</p>
                            <input className="text-sm pl-4" ref={passwordRef} type="password" />

                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="h-3 w-3" />
                                    <span className="text-sm">Keep me signed in</span>
                                </label>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-950 transition-colors ease-linear duration-300">
                                    Forgot your password?
                                </a>
                            </div>
                        <button className="Btn font-medium bg-blue-800 hover:bg-blue-950 transition-colors ease-linear duration-300 ">Sign in</button>
                        
                        <p className="text-sm pt-5">Don't have an account? <a href="/signup" className="font-medium text-blue-800 hover:text-blue-950 transition-colors ease-linear duration-300">Sign up</a></p>

                    </form>
                </div>
            </div>
        </main>
    );
}