import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const service = useLoaderData();
    const { _id, title, price } = service;


    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const number = form.number.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            number,
            message
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Order Placed Successfully');
                    form.reset();
                }
            })
    }

    return (
        <div className='p-10'>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl'>You Are About To Order : {title}</h2>
                <h4 className='text-3xl'>Price : {price}$</h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First name" className="input input-bordered w-full" required />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full" />
                    <input name='number' type="number" placeholder="Your Phone" className="input input-bordered w-full" required />
                    <input name='email' type="email" placeholder="Your email" className="input input-bordered w-full" defaultValue={user?.email} readOnly />
                </div>
                <div className='mt-4'>
                    <textarea name='message' className="textarea textarea-bordered w-full h-40" placeholder="Your Message" required></textarea>
                </div>
                <input className='btn btn-outline btn-warning' type="submit" value="Place Your Order" />
            </form>
        </div>
    );
};

export default Checkout;