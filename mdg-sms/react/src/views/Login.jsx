import { useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => { 
        ev.preventDefault();

        // Print username and password values in console (for testing)
        console.log("Email:", emailRef.current.value);
        console.log("Password:", passwordRef.current.value);

        const payload = {
            name: emailRef.current.value,
            password: passwordRef.current.value
        };

        axiosClient.post('/signup', payload).then(({ data }) => {
            setUser(data.user);
            setToken(data.Token);
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        });
    };

    return (
        <div className="Login-Form">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="Title">Login</h1>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="Btn">Login</button>
                </form>
            </div>
        </div>
    );
}