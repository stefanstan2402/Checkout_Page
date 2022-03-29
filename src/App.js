import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import { useState, useEffect } from 'react';
import './index.css';
import Dropdown from 'react-bootstrap/Dropdown';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://private-32dcc-products72.apiary-mock.com/product",
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(response => setProducts(response));
  }, []);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="butonCurrency dropdown">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose currency:
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/USD">USD</Dropdown.Item>
            <Dropdown.Item href="/EUR">EUR</Dropdown.Item>
            <Dropdown.Item href="/GBP">GBP</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>

    </div>
  );
}

export default App;
