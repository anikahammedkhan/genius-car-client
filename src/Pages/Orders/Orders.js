import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    const url = `http://localhost:5000/orders?email=${user?.email}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user?.email, url])

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete this order?');
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        alert('Order Deleted Successfully');
                        const remainingOrders = orders.filter(order => order._id !== id);
                        setOrders(remainingOrders);
                    }
                })
        }
    }

    const handleStatusChange = (id) => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: "Approved" })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Status Updated Successfully');
                    const remainingOrders = orders.filter(order => order._id !== id);
                    const approving = orders.find(order => order._id === id);
                    approving.status = "Approved";
                    const updatedOrders = [...remainingOrders, approving];
                    setOrders(updatedOrders);
                }
            })
    }



    return (
        <div>
            <h2 className='text-3xl font-bold text-center'>You Have {orders.length} orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                Delete Order
                            </th>
                            <th>Name</th>
                            <th>Order Title</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow key={order._id} order={order} handleDelete={handleDelete} handleStatusChange={handleStatusChange}></OrderRow>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;