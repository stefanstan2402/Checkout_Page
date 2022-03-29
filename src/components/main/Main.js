import React from 'react';
import Product from '../product/Product';

export default function Main(props) {
  const { products, onAdd } = props;
  return (
    <main className="col-7">
      <div>
        {products.map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd}></Product>
        ))}
      </div>
    </main>
  );
}
