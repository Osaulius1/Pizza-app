import { useState, useEffect } from 'react';
import OrderBox from './OrderBox.js';
import './styles.css';


function OrderList()
{
    const [orders, setOrders] = useState([]);//order list


    useEffect(() => {
        const ordersFromStorage = JSON.parse(localStorage.getItem('orders')) ?? [];//orders are saved in the local storage
        setOrders(ordersFromStorage);
    }, []);
    //Function that deletes all pizza orders
    const clearOrders = () =>
    {
        localStorage.clear();
        const ordersFromStorage = JSON.parse(localStorage.getItem('orders')) ?? [];
        setOrders(ordersFromStorage);
    }
    //Order list element with button to delete all orders and the list itself
    return (
        <div>
            {orders.length > 0 && <h1>Your orders:</h1>}
            {orders.length == 0 && <p> You have no orders. Go back the pizza shop.</p>}

            {orders.length > 0 && <button onClick={clearOrders}>Delete orders</button>}

            <div className="OrderList"> 
                {orders.map((order, index) => (
                    <OrderBox size={order.size} toppings={order.toppings} price={order.price} index={index} />
                ))}
            </div>
        </div>
    );
}

export default OrderList;