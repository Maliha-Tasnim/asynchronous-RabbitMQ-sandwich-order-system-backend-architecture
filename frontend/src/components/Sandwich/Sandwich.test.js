import { mockSandwichList } from "../../mocks/sandwiches";
import { Sandwich } from "./Sandwich";

describe("<Sandwich />",  () => {
    beforeEach(() => {
       tlib.render(<Sandwich {...mockSandwichList[0]}/>);
    });

    it("should render all components", () => {
        tlib.screen.getByRole("heading", {
            name: /tuna roll/i
        });

    });

    it("should trigger order event when 'order' is clicked", () => {
        tlib.screen.getByRole("");
    });
});
