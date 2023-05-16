import './styles.css'
import PizzaSelectionBox from "./PizzaSelectionBox"
import OrderList from "./OrderList"
import { useState } from 'react';


function App() {
    const [currentPage, setCurrentPage] = useState('pizzaShop');

    const goToPizzaShop = () => setCurrentPage('pizzaShop');
    const goToOrderPage = () => setCurrentPage('orders');

    return (
        <div>
            <h1>Pizza app</h1>

            <nav>
                <button onClick={goToPizzaShop}>Pizza shop</button>
                <button onClick={goToOrderPage}>Your orders</button>
            </nav>

            {currentPage === 'pizzaShop' ? <PizzaSelectionBox /> : <OrderList />}
        </div>
    );
}

export default App;
