import { createContext, useContext, useState, useEffect } from "react";


const StateContext = createContext({

    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {}

})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')));
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    useEffect(() => {
        localStorage.setItem('USER', JSON.stringify(user));
    }, [user]);

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    
    return (
        <StateContext.Provider value ={{
            user,
            token,
            setUser,
            setToken

        }}>
            {children}
        </StateContext.Provider>
    
    )
}

export const useStateContext = () => useContext(StateContext)