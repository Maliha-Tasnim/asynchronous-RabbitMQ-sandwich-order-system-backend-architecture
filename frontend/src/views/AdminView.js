import {useState} from "react";
import {SandwichForm} from "../components/forms/SandwichForm";
import {SandwichAdminList} from "../components/SandwichAdminList/SandwichAdminList";

const AdminModes = {
    CREATE: "create",
    LIST: "list",
    UPDATE: "update"
};

export const AdminView = () => {
    const [mode, setMode] = useState({name: AdminModes.LIST, props: {}});

    const handleClick = (event) => {
        setMode({
            name: event.target.name,
            props: {}
        });
    };

    const handleOpenEditMode = (event) => {
        console.info("Opening edit mode");
        setMode({
            name: event.target.name,
            props: {
                sandwichId: event.target.dataset.sandwichId
            }
        });
    };

    return (
        <>
            <h1>Admin Stuff</h1>

            <div>
                <button name={AdminModes.LIST} onClick={handleClick}>List</button>
                <button name={AdminModes.CREATE} onClick={handleClick}>Add</button>
            </div>

            <hr />

            {
                mode.name === AdminModes.LIST
                    ? <SandwichAdminList onEdit={handleOpenEditMode} />
                    : <SandwichForm {...mode.props}/>
            }
        </>
    );
};
