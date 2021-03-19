import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data)
    };

    console.log(watch("example"));

    return (
        <form className = "ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter Your Name" />
            {errors.name && <span className = "error">name is required</span>}

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder = "Enter Your Email" />
            {errors.email && <span className = "error">email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder = "Enter Your Address"/>
            {errors.address && <span className = "error">address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder = "Enter Your Phone Number"/>
            {errors.phone && <span className = "error">phone number is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;