import {useEffect, useState} from "react";
import {Button} from "../Button/Button";
import {BreadTypes, NotificationLevel} from "../../enums";
import {fireNotificationEvent} from "../../events/NotificationEvent";
import {SandwichService} from "../../services/SandwichService";
import {Form} from "../Form/Form";
import {Input} from "../Input/Input";
import styles from "./SandwichForm.module.css";

const initialState = {
    name: "",
    toppings: [],
    breadType: "",
    price: ""
};

export const SandwichForm = ({sandwichId}) => {
    const [data, setData] = useState(initialState);

    const handleChange = (event) => {
        setData({...data, [event.target.name]: event.target.value});
    };

    const handleSubmit = () => {
        if (data._id) {
            const {_id, ...submitData} = data;
            SandwichService.update(_id, submitData)
                .then(() => fireNotificationEvent("Sandwich updated."))
                .catch((error) => fireNotificationEvent(error.response.data.message, NotificationLevel.ERROR));
        } else {
            SandwichService.create(data)
                .then(() => fireNotificationEvent(`Sandwich "${data.name}" added.`))
                .catch((error) => fireNotificationEvent(error.response.data.message, NotificationLevel.ERROR));
        }
    };

    useEffect(() => {
        if (sandwichId) {
            SandwichService.retrieve(sandwichId)
                .then(sandwich => setData(sandwich))
                .catch(() => fireNotificationEvent("Failed to retrieve sandwich", NotificationLevel.ERROR));
        } else {
            setData(initialState);
        }
    }, [sandwichId]);

    return (
        <Form onSubmit={handleSubmit}>
            <h2>{sandwichId ? "Update" : "Add"} sandwich</h2>
            <Input type="text"
                   name="name"
                   form={data}
                   onChange={handleChange}
                   placeholder="Sandwich name"
                   required={true}/>
            <Input type="number"
                   name="price"
                   form={data}
                   min={1}
                   onChange={handleChange}
                   placeholder="Price as xx.xx"
                   required={true}/>
            <ToppingFormElement data={data} setData={setData}/>
            <BreadTypeFormElement onChange={handleChange}/>
            <Button text={`${sandwichId ? "Update" : "Add"} Sandwich`}/>
        </Form>
    );
};

const BreadTypeFormElement = ({onChange}) => {
    return (
        <>
            <span>Bread type*:</span>
            <div className={styles.BreadTypeInput}>
                {Object.entries(BreadTypes).map(([_, breadType]) => (
                    <label key={breadType}>
                        <input type="radio" name="breadType" value={breadType} onChange={onChange}/>
                        {breadType}
                    </label>)
                )}
            </div>
        </>
    );
};

const ToppingFormElement = ({data, setData}) => {
    const handleChange = (event, index) => {
        const toppings = [...data.toppings];
        toppings[index] = {...toppings[index], name: event.target.value};
        setData({...data, toppings});
    };

    const handleAddTopping = () => {
        setData({
            ...data,
            toppings: data.toppings.concat({name: "", key: new Date().getTime()})
        });
    };

    const handleRemoveTopping = (index) => {
        const toppings = data.toppings.filter((_, i) => i !== index);
        setData({...data, toppings});
    };

    return (
        <div>
            <label>Toppings:</label>
            {data.toppings.length > 0 ? (
                <ul className={styles.ToppingList}>
                    {data.toppings.map((topping, i) => (
                        <li key={topping.key}>
                            <input type="text"
                                   value={topping.name}
                                   name={`topping-${i}`}
                                   onChange={(event) => handleChange(event, i)}
                                   placeholder="Topping name"/>
                            <button type="button" onClick={() => handleRemoveTopping(i)}>remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No toppings.</p>
            )}
            <button type="button" onClick={handleAddTopping}>add topping</button>
        </div>
    );
};
