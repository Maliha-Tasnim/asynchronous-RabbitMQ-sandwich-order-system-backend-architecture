import {Money} from "../../utils/money";
import {Button} from "../Button/Button";
import styles from "./Sandwich.module.css";

export const Sandwich = ({_id, name, toppings, breadType, onOrder, price}) => {
    return (
        <div className={styles.container}>
            <h2>{name} <Price amount={price} /></h2>
            <p>Bread type: {breadType}</p>
            <hr/>
            <ToppingList toppings={toppings}/>
            <Button onClick={onOrder} data-sandwich-id={_id} text="Order" className={styles.OrderButton}/>
        </div>
    );
};

const ToppingList = ({toppings}) => {
    return (
        <ul className={styles.ToppingList}>
            {toppings.map(data => <Topping key={data.name} {...data} />)}
        </ul>
    );
};

const Topping = ({name}) => <li>{name}</li>;

const Price = ({amount}) => {
    return <span>{new Money(amount).toEuro()}</span>;
};
