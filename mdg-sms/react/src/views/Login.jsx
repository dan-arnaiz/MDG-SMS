import { useRef } from "react";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext;

    const onSubmit = (ev) => {
        ev.preventDefault();

        // print username and password values in console (for testing)
        const payload = {
            name: nameRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.Token);
            })

            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
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
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="Btn">Login</button>
                </form>
            </div>
        </div>
    );
}
