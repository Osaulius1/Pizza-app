function Tutorial()
{
    return (
        <div>
         < h4 > How to use the program</h4 >
            <ul className= "tutorial-list">
                <li>Select your pizza size.</li>
                <li>Select your pizza toppings. You must select at least one.</li>
                <li>Press "Calculate Price" to see the price of the pizza.</li>
                <li>Press "Save Order" to save the order. You must calculate the price first.</li>
                <li>Press "Your Orders" to see all orders that you have saved.</li>
                <li>Press "Pizza Shop" to go back the pizza shop.</li>
            </ul>
        </div>
    );
}

export default Tutorial;
