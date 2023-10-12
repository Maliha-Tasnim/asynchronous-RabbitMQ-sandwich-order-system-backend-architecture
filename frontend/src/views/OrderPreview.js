import {useEffect, useState} from "react";
import {Button} from "../components/Button/Button";
import {fireContentSwitchEvent} from "../events/ContentSwitch";
import {fireNotificationEvent} from "../events/NotificationEvent";
import {OrderService} from "../services/OrderService";
import {SESSION_STORAGE_KEYS} from "../settings";
import {Money} from "../utils/money";

export const OrderPreview = () => {
    const [sandwich, setSandwich] = useState({price: null,toppings: []});

    const handleConfirmOrder = () => {
        console.info("Order confirmed");
        OrderService.createOrder(sandwich._id).catch(() => console.warn("'/order' endpoint not integrated")).finally(() => {
            fireContentSwitchEvent("orderList");
            fireNotificationEvent("Order received, We are now preparing your order.");
        });
    };

    useEffect(() => {
        const sandwichString = sessionStorage.getItem(SESSION_STORAGE_KEYS.orderPreview);
        if (sandwichString) {
            setSandwich(JSON.parse(sandwichString));
        }
    }, []);

    if (!sandwich) {
        return <p>No sandwich selected.</p>;
    }

    return (
        <div>
            <h1>Checkout</h1>

            <b>Sandwich</b>: {sandwich.name}<br/>
            <b>Bread type</b>: {sandwich.breadType}<br/>
            <b>Toppings:</b> {sandwich.toppings.map(topping => topping.name).join(", ")}<br/>

            <h2>Payment Method</h2>

            <p>With cash, payment when receiving order.</p>

            <h3>Total: {new Money(sandwich.price).toEuro()} <small>incl. tax 24%</small></h3>

            <Button onClick={handleConfirmOrder} text="Confirm order"/>
        </div>
    );
};
