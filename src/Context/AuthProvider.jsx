import React, { useEffect, useState } from 'react';
import { UseContext } from './UseContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../Pages/Authentication/firebase.init';
import useAxiosSecure from '../Hook/useAxiosSecure';

const AuthProvider = ({ children }) => {

    const [carts, setCarts] = useState([])
    const [amount, setAmount] = useState({ price: 0 });
    const [allProducts, setAllProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState([])
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
     const [count, setCount] = useState(0);
    // Email login

    const axiosSecure = useAxiosSecure();
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

    const increase = async (cartId) => {
        setCarts(prevCarts => {
            return prevCarts.map(cart => {
                if (cart._id === cartId) {
                    return { ...cart, quantity: cart.quantity + 1 };
                }
                return cart;
            });
        });
        await axiosSecure.patch(`/cart/increase/${cartId}`);
    };

    const decrease = async (cartId) => {
        setCarts(prevCarts => {
            return prevCarts.map(cart => {
                if (cart._id === cartId && cart.quantity > 1) {
                    return { ...cart, quantity: cart.quantity - 1 };
                }
                return cart;
            });
        });
        await axiosSecure.patch(`/cart/decrease/${cartId}`);
    };  

    

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
        setErrorMessage,
        setCount,
        count,
        increase,
        decrease

    }

    return (
        <UseContext value={dataInfo}>
            {children}
        </UseContext>
    );
};

export default AuthProvider;