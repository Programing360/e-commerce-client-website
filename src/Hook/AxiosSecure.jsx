import axios from 'axios';
import React from 'react';

const AxiosSecure = () => {

    const AxiosApi = axios.get('http://localhost:5000/allProduct')

    return AxiosApi
};

export default AxiosSecure;