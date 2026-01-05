import React, { useEffect, useState } from "react";
import { UseContext } from "./UseContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Pages/Authentication/firebase.init";
import useAxiosSecure from "../Hook/useAxiosSecure";

const AuthProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);

  const [allProducts, setAllProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(0);
  // const [cart] = UseCart();
  const axiosSecure = useAxiosSecure();

  // Email login

  const loginWithUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Register
  const signInWithUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();

  // Google login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const UserLogout = () => {
    return signOut(auth);
  };

  // User observer
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        axiosSecure.post("/jwt", { email: currentUser?.email }).then((res) => {
          localStorage.setItem("access-token", res.data.token);
        });
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });
    return () => unsub();
  }, []);

  // const increase = async (cartId) => {
  //  const it= cart.map((carts) => {
  //     if (carts._id === cartId) {
  //       return { ...carts, quantity: carts.length + 1 };
  //     }
  //     return it;
  //   });
  //   await axiosSecure.patch(`/cart/increase/${cartId}`);
  // };

  // const decrease = async (cartId) => {
  //  const it = cart.map((carts) => {
  //     if (carts._id === cartId && carts.quantity > 1) {
  //       return { ...carts, quantity: carts.quantity - 1 };
  //     }
  //     return it;
  //   });

  //   await axiosSecure.patch(`/cart/decrease/${cartId}`);
  // };

  const dataInfo = {
   
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
    
  };

  return <UseContext value={dataInfo}>{children}</UseContext>;
};

export default AuthProvider;
