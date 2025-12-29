import React from 'react';

const OrderCart = ({ orders, index }) => {
    const {
        customer,
        items,
        subtotal,
        shippingCost,
        totalAmount
    } = orders;

    const {
        firstName,
        lastName,
        email,
        phone,
        city,
        country
    } = customer;
    return (
        <tr>
            <th>{index + 1}</th>
            <td className="font-medium">
                {firstName}{lastName}
            </td>
            <td className='text-start'>{email}</td>
            <td>{phone}</td>
            <td>{city}, {country}</td>
            <td>{items.length}</td>
            <td>৳{subtotal}</td>
            <td>৳{shippingCost}</td>
            <td className="font-bold text-green-600">
                ৳{totalAmount}
            </td>
        </tr>
    );
};

export default OrderCart;