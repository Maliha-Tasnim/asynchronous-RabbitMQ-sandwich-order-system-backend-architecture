import React, {useEffect, useState} from "react";
import {NotificationLevel} from "../../enums";
import {fireNotificationEvent} from "../../events/NotificationEvent";
import {SandwichService} from "../../services/SandwichService";
import {Button} from "../Button/Button";
import styles from "./SandwichAdminList.module.css";

export const SandwichAdminList = ({ onEdit }) => {
    const [sandwichList, setSandwichList] = useState([]);

    const handleDeleteSandwich = (event) => {
        SandwichService.delete(event.target.dataset.sandwichId)
            .then(() => {
                SandwichService.getListing().then(setSandwichList);
            })
            .catch(() => {
                fireNotificationEvent("Failed to delete sandwich.", NotificationLevel.ERROR);
            });
    };


    useEffect(() => {
        SandwichService.getListing().then(setSandwichList);
    }, []);

    if (sandwichList.length === 0) {
        return <p>No sandwich added.</p>;
    };

    return (
        <ul className={styles.SandwichAdminList}>
            {sandwichList.map(sandwich => (
                <li key={sandwich._id}>
                    {sandwich.name}{" "}
                    <Button text="Edit" data-sandwich-id={sandwich._id} onClick={onEdit}/>{" "}
                    <Button text="Delete" data-sandwich-id={sandwich._id} onClick={handleDeleteSandwich}/>
                </li>
            ))}
        </ul>
    );
};
