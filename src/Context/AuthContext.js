import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInAdmin = (email, password) => {
        if (email === 'admin-crooked-lines@gmail.com') {
            console.log("login successful")
            return signInWithEmailAndPassword(auth, email, password);
        }
        else
            console.log("wrong HR creds");
    }

    const signInJury = (email, password) => {
        if (email === 'jury-crooked-lines@gmail.com') {
            console.log("login successful")
            return signInWithEmailAndPassword(auth, email, password);
        }
        else
            console.log("wrong HR creds");
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ createUser, user, logout, signInAdmin, signInJury }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};