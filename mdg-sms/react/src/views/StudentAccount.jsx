import { useRef, useState } from "react"
import {Link, useNavigate} from "react-router-dom"

export default function StudentAccount() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const paswordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null)
    const {setUser, setToken} = useStateContext


    const onSubmit = (ev) => { 
        ev.preventDefault()

        // print username and password values in console (for testing)
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log(payload);

        axiosClient.post('/signup', payload).then(({data}) => {
            
            setUser(data.user)
            setToken(data.Token)

        })

        .catch(err => {

            const response = err.response;
            if (response && response.status == 422){
               
                console.log(response.data.errors);
                setErrors(response.data.errors)
            }
            
        })
    }

    return(
        <div className="Signup-Form">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="Title">Student Scholarship Account</h1>
                    {errors && <div className="alert">
                    
                        {Object.kets(errors).map(ley => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                    }
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password"/>
                    <button className="Btn">Login</button>
                </form>
            </div>
        </div>
    )
}