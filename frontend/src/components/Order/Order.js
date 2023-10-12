import {OrderStatus} from "../../enums";
import styles from "./Order.module.css";

export const Order = ({_id, sandwichId, date, status, sandwichList}) => {
    const sandwich = sandwichList.find(s => s._id === sandwichId);

    return (
        <div className={styles.container}>
            <header>
                <h2>{(sandwich && sandwich.name) || "Sandwich Name Missing"}</h2>
                <small>{date}</small>
            </header>
            <StatusBar status={status}/>
        </div>
    );
};

const successStatuses = Object.values(OrderStatus).filter(status => status !== OrderStatus.FAILED);

const StatusBar = ({status}) => {
    if (status === OrderStatus.FAILED) {
        return <p className={styles.FailedStatus}>{status}</p>;
    }
    return (
        <ul className={styles.StatusBar}>
            {successStatuses.map(successStatus => (
                <li className={successStatus === status ? styles.CurrentStatus : undefined} key={successStatus}>
                    {successStatus}
                </li>
            ))}
        </ul>
    );
};
