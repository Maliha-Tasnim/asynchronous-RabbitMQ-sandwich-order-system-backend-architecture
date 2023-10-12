import React, { useEffect, useState } from "react";
import {Sandwich} from "../components/Sandwich/Sandwich";
import { NotificationLevel } from "../enums";
import {fireContentSwitchEvent} from "../events/ContentSwitch";
import { fireNotificationEvent } from "../events/NotificationEvent";
import { SandwichService } from "../services/SandwichService";
import {SESSION_STORAGE_KEYS} from "../settings";
import styles from "./SandwichListView.module.css";

export const SandwichListView = () => {
    const [sandwiches, setSandwiches] = useState([]);

    const handleOrder = (event) => {
        const sandwichId = event.target.dataset.sandwichId;
        console.info(`User selected sandwich: ${sandwichId}`);
        const sandwich = sandwiches.find(({_id}) => _id.toString() === sandwichId);
        if (sandwich) {
            sessionStorage.setItem(SESSION_STORAGE_KEYS.orderPreview, JSON.stringify(sandwich));
            fireContentSwitchEvent("orderPreview");
        } else {
            fireNotificationEvent("Failed to start order!", NotificationLevel.ERROR);
        }
    };

    useEffect(() => {
        SandwichService.getListing().then(setSandwiches).catch(() => console.warn("'GET /sandwich' not integrated."));
    }, []);

    return (
        <div>
            <h1>Sandwiches</h1>
            <SandwichList sandwiches={sandwiches} onOrder={handleOrder} />
        </div>
    );
};


const SandwichList = ({ sandwiches, onOrder } ) => {
    if (sandwiches.length === 0) {
        return (<p>No sandwich available, add some in admin view.</p>);
    }
    return (
        <div className={styles.SandwichList}>
            {sandwiches.map(data => <Sandwich key={data._id} {...data} onOrder={onOrder} />)}
        </div>
    );
};
