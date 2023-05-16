import './styles.css';

//Order box element. A div with size, toppings and price of the pizza
function OrderBox({ size, toppings, price, index }) {
    return (
        <div key={index} className="OrderBox">
            <h1>{size} Pizza</h1>
            <h2>Toppings: {toppings}</h2>
            <h3>Price: ${price}</h3>
        </div>
    );
}

export default OrderBox;