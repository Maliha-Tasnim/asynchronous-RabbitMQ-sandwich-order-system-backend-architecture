import React, { useEffect, useState } from "react";
import {Order} from "../components/Order/Order";
import {OrderStatus} from "../enums";
import { OrderService } from "../services/OrderService";
import {SandwichService} from "../services/SandwichService";
import {ORDER_POLL_INTERVAL} from "../settings";
import styles from "./OrderListView.module.css";

export const OrderListView = () => {
    const [sandwichList, setSandwichList] = useState([]);
    const [orders, setOrders] = useState([]);
    const currentOrders = orders.filter(({ status }) => ![OrderStatus.READY, OrderStatus.FAILED].includes(status));
    const pastOrders = orders.filter(({ status }) => [OrderStatus.READY, OrderStatus.FAILED].includes(status));

    useEffect(() => {
        OrderService.getListing().then(setOrders).catch(() => console.warn("'GET /order' not integrated."));
        SandwichService.getListing().then(setSandwichList);
    }, []);

    useEffect(() => {
        if (orders.length > 0) {
            console.info(`Waiting for ${ORDER_POLL_INTERVAL} millisecconds for order listing refresh...`);
            const timeout = setTimeout(() => {
                OrderService.getListing().then(setOrders).catch(() => console.warn("'GET /order' not integrated."));
            }, ORDER_POLL_INTERVAL);
            return () => clearTimeout(timeout);
        }
    },[orders]);

    return (
        <div>
            <h1>Orders</h1>
            <p>The listing auto refreshes every {ORDER_POLL_INTERVAL / 1000} seconds.</p>
            <OrderList orders={currentOrders} sandwichList={sandwichList} />
            <h2>Past</h2>
            <OrderList orders={pastOrders} sandwichList={sandwichList}/>
        </div>
    );
};

const OrderList = ({ orders, sandwichList }) => {
    if (orders.length === 0) {
        return (<p>No orders found.</p>);
    }

    return (
        <div className={styles.OrderList}>
            {orders.map(data => <Order key={data._id} {...data} sandwichList={sandwichList}/>)}
        </div>
    );
};
