import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log('cart:',cart);
    const total = cart.reduce(((total, product) => total + product.price),0);
    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total += product.price;
    // }
    let shippingCost = 0;
    if (total > 35) {
        shippingCost = 0;
    } else if(total > 15) {
        shippingCost = 4.99;
    } else if(total > 0) {
        shippingCost = 12.99;
    }

    let tax = total / 10;

    const formateNumber = (num) => {
        const precision = num.toFixed(2);
        const number = Number(precision);
        return number;
    };

    return (
        <div>
            <h1>Order Summary</h1>
            <p>Order Items: {cart.length}</p>
            <p>Product Price: {formateNumber(total)}</p>
            <p><small>Shipping Cost: {formateNumber(shippingCost)}</small></p>
            <p><small>Tax + vat: {formateNumber(tax)}</small></p>
            <p>Total Price: {formateNumber(total + shippingCost + tax)}</p>
        </div>
    );
};

export default Cart;