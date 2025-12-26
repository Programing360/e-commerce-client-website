import React, { useEffect, useState } from 'react';
import { UseContext } from './UseContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../Pages/Authentication/firebase.init';

const AuthProvider = ({ children }) => {

    const [carts, setCarts] = useState([])
    const [amount, setAmount] = useState({ price: 0 });
    const [allProducts, setAllProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState([])
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');


    // Email login
    const loginWithUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Register
    const signInWithUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const googleProvider = new GoogleAuthProvider();

    // Google login
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }


    // Logout
    const UserLogout = () => {
        return signOut(auth)
    };

    // User observer
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsub();
    }, []);


    const dataInfo = {
        amount,
        setAmount,
        carts,
        setCarts,
        user,
        loading,
        setAllProducts,
        allProducts,
        setTotalPrice,
        totalPrice,
        signInWithUser,
        loginWithUser,
        googleLogin,
        UserLogout,
        errorMessage,
        setErrorMessage

    }

    return (
        <UseContext value={dataInfo}>
            {children}
        </UseContext>
    );
};

export default AuthProvider;