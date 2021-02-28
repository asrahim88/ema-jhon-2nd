import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const Product = (props) => {
    const { name, img, seller, price, stock } = props.product;
    return (
        <div className='product'>
            <div className='fstPert'>
                <img src={img} alt="" />
            </div>
            <div className='sendPert'>
                <h4 className='product-name'>{name}</h4>
                <p><small>by: {seller}</small></p>
                <br />
                <p>${price}</p>
                <p>only {stock} left in stock-order soon</p>
                <button className = 'main-button' onClick={() => props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;