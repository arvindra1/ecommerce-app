
import { useEffect, useState } from 'react';
import './App.css';
import Cart from './Pages/Cart';
import HomePage from './Pages/HomePage';
import ProductDetails from './Pages/ProducDetails';
import { CartProvider } from './components/useContext';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [product,setProducts]=useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProducts(data); // Check the structure of the data
            // Update the state with fetched data
            console.log("New Data", product);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

  return (
    <div className="App">
    <CartProvider>
    <Router>
      <Routes>

<Route exact path='/' element={<HomePage/>}/>
<Route exact path='/product/:id' element={<ProductDetails product={product} />}/>
<Route exact path='/Cart' element={<Cart/>}/>


      </Routes>
    </Router>
    

    </CartProvider>
    
    </div>
  );
}

export default App;
