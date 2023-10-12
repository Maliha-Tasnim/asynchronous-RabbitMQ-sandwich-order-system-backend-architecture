import {fireContentSwitchEvent} from "../../events/ContentSwitch";
import styles from "./Menu.module.css";

// The names are defined in routes.
const menuItems = [
    {
        "name": "sandwichList",
        "display": "Sandwiches"
    },
    {
        "name": "orderList",
        "display": "Orders"
    }
];

export const Menu = () => {
    const handleClick = (event) => {
        fireContentSwitchEvent(event.target.name);
    };

    return (
        <div className={styles.container}>
            <nav>
                {
                    menuItems.map(item => (
                        <button key={item.name} name={item.name} onClick={handleClick}>
                            {item.display}
                        </button>
                    ))
                }
            </nav>
            <button onClick={handleClick} name="admin" className={styles.AdminButton}>ADMINS</button>
        </div>
    );
};
