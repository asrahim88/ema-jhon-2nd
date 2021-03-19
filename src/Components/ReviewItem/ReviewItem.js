import React from 'react';
import "./ReviewItem.css";

const ReviewItem = (props) => {
    const {name, quantity, key, img, price} = props.product;
    return (
        <div className = "product">
                <div className = "fstPert">
                <img src={img} alt="" />
                </div>
                <div className = "secndPert">
                <h4 className = "product-name">{name}</h4>
                <p>Quantity: {quantity}</p>
                <p><small>Price: {price}</small></p>
                <button onClick={() => props.removeProduct(key)}className = "main-button">Remove</button>
                </div>
            
        </div>
    );
};

export default ReviewItem;