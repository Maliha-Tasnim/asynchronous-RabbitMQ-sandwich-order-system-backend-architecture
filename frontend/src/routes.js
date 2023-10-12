import { AdminView } from "./views/AdminView";
import { OrderListView } from "./views/OrderListView";
import { OrderPreview } from "./views/OrderPreview";
import { SandwichListView } from "./views/SandwichListView";

export const routes = {
    admin: <AdminView />,
    orderPreview: <OrderPreview />,
    orderList: <OrderListView />,
    sandwichList: <SandwichListView />,
};

