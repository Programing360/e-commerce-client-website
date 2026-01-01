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
        name,
        email,
        phone,
        city,
        country,
        address
    } = customer;
    return (
        <tr>
            <th>{index + 1}</th>
            <td className="font-medium">
                {firstName}{lastName}{name}
            </td>
            <td className=''>{email}</td>
            <td>{phone}</td>
            {
                address ? <td>{address}</td> : <td>{city},{country}</td>
            }
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