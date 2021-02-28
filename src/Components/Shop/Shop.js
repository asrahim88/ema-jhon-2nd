import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const fst10Data = fakeData.slice(0, 10);
    const [products, setProducts] = useState(fst10Data);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) => {
        console.log('product added', product);
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        products.map((pd) => <Product product={pd} handleAddProduct ={handleAddProduct}></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart = {cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;