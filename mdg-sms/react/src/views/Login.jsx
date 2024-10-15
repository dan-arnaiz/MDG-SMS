import { useRef, useState} from "react"
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null)
    const {setUser, setToken} = useStateContext


    const onSubmit = (ev) => { 
        ev.preventDefault()

        // print username and password values in console (for testing)
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        console.log(payload);

        setErrors(null);

        axiosClient.post('/login', payload).then(({data}) => {
            
            setUser(data.user)
            setToken(data.Token)

        })

        .catch(err => {

            const response = err.response;
            if (response && response.status == 422){
                
                if (response.data.errors) {
                    console.log(response.data.errors);
                } else {

                    setErrors({
                        email: [reponse.data.message]
                    })

                }
            }
            
        })
    }

    return(
        <div className="Login-Form">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="Title">Login</h1>
                    {errors && <div className="alert">
                    
                        {Object.kets(errors).map(ley => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}

                    </div>
                    }
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button className="Btn">Login</button>
                </form>
            </div>
        </div>
    )
}