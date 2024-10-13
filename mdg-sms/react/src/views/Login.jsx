export default function Login() {

    const onSubmit = (ev) => { 
        ev.preventDefault()
    }

    return(
        <div className="Login-Form">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="Title">Login</h1>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button className="Btn">Login</button>
                </form>
            </div>
        </div>
    )
}