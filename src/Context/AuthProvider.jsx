import React, { useState } from 'react';
import { UseContext } from './UseContext';

const AuthProvider = ({ children }) => {

    const [id, , setId] = useState([]);
    const [carts, setCarts] = useState([])
    const [amount, setAmount] = useState({ price: 0 });
    const [allProducts, setAllProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState([])
    


    const dataInfo = {
        amount,
        setAmount,
        carts,
        setCarts,
        setId,
        id,
        setAllProducts,
        allProducts,
        setTotalPrice,
        totalPrice

    }

    return (
        <UseContext value={dataInfo}>
            {children}
        </UseContext>
    );
};

export default AuthProvider;