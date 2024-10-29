import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios-client.js"; // Ensure the correct path to axios-client.js

const StateContext = createContext({
    currentUser: null,
    token: null,
    students: [],
    loading: false,
    setUser: () => {},
    setToken: () => {},
    getStudents: () => {},
    addStudent: () => {},
    updateStudent: () => {},
    deleteStudent: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')));
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem('USER', JSON.stringify(user));
    }, [user]);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    const getStudents = () => {
        setLoading(true);
        axiosClient.get('/students')
            .then(({ data }) => {
                setLoading(false);
                setStudents(data);
            })
            .catch((error) => {
                setLoading(false);
                console.error('There was an error fetching the students!', error);
            });
    };

    const addStudent = (student) => {
        axiosClient.post('/students', student)
            .then(({ data }) => {
                setStudents(prevStudents => [...prevStudents, data]);
            })
            .catch(error => {
                console.error('There was an error adding the student!', error);
            });
    };

    const updateStudent = (id, updatedStudent) => {
        axiosClient.put(`/students/${id}`, updatedStudent)
            .then(({ data }) => {
                setStudents(prevStudents => prevStudents.map(student => student.id === id ? data : student));
            })
            .catch(error => {
                console.error('There was an error updating the student!', error);
            });
    };

    const deleteStudent = (id) => {
        axiosClient.delete(`/students/${id}`)
            .then(() => {
                setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the student!', error);
            });
    };

    return (
        <StateContext.Provider value={{
            user,
            token,
            students,
            loading,
            setUser,
            setToken,
            getStudents,
            addStudent,
            updateStudent,
            deleteStudent
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);