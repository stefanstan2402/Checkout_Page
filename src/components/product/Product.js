import React from 'react';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import './Product.css';
import fx from 'money';

export default function Product(props) {
    const { product, onAdd } = props;

    var url = window.location.href;
    var currency = url.slice(-3);

    fx.base = "USD";
    fx.rates = {
        "EUR": 0.745101, // eg. 1 USD === 0.745101 EUR
        "GBP": 0.647710, // etc...
        "USD": 1,        // always include the base rate (1:1)
        /* etc */
    }
    // console.log(fx(1.99).from("USD").to("GBP"))

    if (currency !== 'USD' && currency !== 'EUR' && currency !== 'GBP') {
        currency = 'USD';
    }

    var initialPrice = product.price;
    var converted = fx(initialPrice).from("USD").to(currency).toFixed(2);

    return (
        <div className="card propCard">
            <div className="card-body bodyCards shadow bg-white rounded">
                <div className="float-container">
                    <div className="col-lg-5 float-child">{product.name}</div>
                    <div className="col-lg-4 float-child text-center">Price: <span className="colorPrice">{currency} {converted}</span></div>
                    <div className="col-lg-3 float-child text-center">
                        <button className="btn btn-success" onClick={() => onAdd(product)}><ShoppingCartIcon /><span className="text-center"> Add To Cart</span></button>
                    </div>
                </div>
            </div>
        </div>
    );



}
