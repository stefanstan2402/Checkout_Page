import React from 'react';
import './Basket.css';
import fx from 'money';

var url = window.location.href;
let currency = url.slice(-3);
if (currency !== 'USD' && currency !== 'EUR' && currency !== 'GBP') {
  currency = 'USD';
}

fx.base = "USD";
fx.rates = {
  "EUR": 0.745101, // eg. 1 USD === 0.745101 EUR
  "GBP": 0.647710, // etc...
  "USD": 1,        // always include the base rate (1:1)
  /* etc */
}

export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const totalPrice = fx(itemsPrice).from("USD").to(currency);

  return (
    <aside className="block col-4 basket">
      <div className="card bg-light">
        <div className="card-body">
          {cartItems.length === 0 && <div ><h4 className="titleCart">No products in your shopping cart</h4><br /> <br /><br /><br /> <br /><br /><br /> <br /><br /><br /> <br /><br /></div>}
          {cartItems.length !== 0 && <div><h4 className="titleCart">Products in your shopping cart</h4></div>}
          <br />
          {cartItems.length !== 0 &&
            <div className="pb-2">
              <div className="row pb-1">
                <div className="col-7 text-left">Product</div>
                <div className="col-3 text-right">Quantity</div>
                <div className="col-2 text-right">Value</div>
              </div>
              <hr />
            </div>
          }
          {cartItems.map((item) => (
            <div>
              <div key={item.id} className="row">
                <div className="col-4">
                  {item.name}
                </div>
                <div className="col-1">
                  <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="right" title={item.description}><span className="textInfo">i</span></button>
                </div>
                <div className="col-2">
                  <button onClick={() => onRemove(item)} className="btn btn-outline-dark">
                    -
                  </button>
                  <button onClick={() => onAdd(item)} className="btn btn-outline-dark">
                    +
                  </button>
                </div>

                <div className="col-2 text-right">
                  {item.qty}
                </div>

                <div className="col-3 text-center">
                  {currency} {item.qty} * {fx(item.price).from("USD").to(currency).toFixed(2)}
                </div>
              </div>
              <br />
            </div>
          ))}

          {cartItems.length !== 0 && (
            <>
              <br />
              <hr className="hrBasket" />
              <div className="row">
                <div className="col-4">
                  <strong>Total Price</strong>
                </div>
                <div className="col-5"></div>
                <div className="col-3 text-center">
                  <strong>{currency} {totalPrice.toFixed(2)}</strong>
                </div>
              </div>
              <br />
              <div>
                <button className="btn btn-success block" onClick={() => alert('Go to checkout!')}>
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>

  );
}
