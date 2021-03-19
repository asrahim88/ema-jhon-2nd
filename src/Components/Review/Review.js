import React, { useEffect, useState} from 'react';
import { getDatabaseCart} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import {removeFromDatabaseCart} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';


const Review = () => {
    
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false); 
    const history = useHistory();
    const handleProceedCheckOut = () => {
        history.push('/shipment');
    }
    const removeProduct = (productKey) => {
        console.log("remove button clicked", productKey)
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log('fake Data',fakeData)
        const productKeys = Object.keys(savedCart);
        const productCart = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(productCart);
    }, [])

    let thank;
    if (orderPlace) {
        thank = <img src={happyImage} alt=""/>
    }
    return (
        <div className = "shop-container">
            <div className = "product-container">
            {thank}

            {
                cart.map(pd => <ReviewItem product={pd} removeProduct = {removeProduct} key = {pd.key}></ReviewItem>)
            }
            </div>
            
            <div className = " cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckOut} className = "main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;