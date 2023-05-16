import { useState, useEffect } from 'react';
import Tutorial from "./Tutorial";
import './styles.css';

function PizzaSelectionBox() {
    const [pizzaSizes, setPizzaSizes] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [size, setSize] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [price, setPrice] = useState(null);

    //This function saves the order to the local storage
    const SaveOrder = () => {
        if (price != 0 &&price!=null&& selectedToppings?.length > 0&&size!=null) {

                //this takes existing orders stored in the local storage and puts them in a list
                let orders = JSON.parse(localStorage.getItem('orders')) || [];

                //this creates new order
                let newOrder = {
                    size: size,
                    toppings: selectedToppings.join(", "),
                    price: price
                };
                orders.push(newOrder);

                //order is saved the local storage
                localStorage.setItem('orders', JSON.stringify(orders));

                alert("Your order was saved. Your pizza size is " + size + ". Your toppings are: " + selectedToppings.join(', ') + ". Price of the order is $" + price+".");
            
        }
        else
        {
            alert("Please select at least one topping for the pizza and then calculate the price!");
        }

    }

    //This function formats information about the orders into API and sends it to the backend. Then updates the price.
    const calculatePrice = async () => {
        if (selectedToppings.length > 0) {
            const toppingsQuery = selectedToppings.map(t => encodeURIComponent(t)).join('%20');
            const response = await fetch(`https://localhost:7238/Price?size=${encodeURIComponent(size)}&toppings=${toppingsQuery}`);
            const data = await response.json();
            setPrice(data);
        }
        else {
            alert("Please select at least one topping for the pizza!");
        }
    }

    //This function takes pizzas from backend and puts them in a list
    useEffect(() => {
        async function fetchPizzaSizes() {
            const response = await fetch('https://localhost:7238/Pizzas');
            const data = await response.json();
            setPizzaSizes(data);
            setSize(data[0]);
        }
        fetchPizzaSizes();
    }, []);

    //This function takes toppings from backend and puts them in a list
    useEffect(() => {
        async function fetchToppings() {
            const response = await fetch('https://localhost:7238/Toppings');
            const data = await response.json();
            setToppings(data);
        }
        fetchToppings();
    }, []);

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    }

    //This function saves selected toppings in a list
    const handleToppingChange = (event) => {
        const options = event.target.options;
        const selectedToppings = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedToppings.push(options[i].value);
            }
        }
        setSelectedToppings(selectedToppings);
    }
    //Body of pizza selection box
    /*
     * This element includes a list of available pizza sizes, and available toppings taken from backend via API.
     * 
     * There is a button for calculating the price of the order. When clicked, it sends the order to the backend via an API 
     * and displays the price.
     * 
     * There is a button for saving orders. It uses local storage to save the data.
     *
     */
    return (
        <div className="PizzaSelectionBox">
            <p>Select your pizza size</p>
            <select value={size} onChange={handleSizeChange} className="select-tab">
                {pizzaSizes.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                ))}
            </select>
            <p>Select your pizza toppings</p>
            <select multiple value={selectedToppings} onChange={handleToppingChange} className="select-tab">
                {toppings.map((topping, index) => (
                    <option key={index} value={topping}>{topping}</option>
                ))}
            </select>
            <br></br>

            <button onClick={calculatePrice}>Calculate Price</button>
            <button onClick={SaveOrder}> Save Order</button>

            {price && <h2>The price is: ${price}</h2>}
            <Tutorial></Tutorial>

        </div>
    );
}

export default PizzaSelectionBox;
