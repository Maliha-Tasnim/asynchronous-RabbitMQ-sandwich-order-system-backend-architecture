import { Menu } from "./Menu";

describe("<Menu />", () => {
    it("clicking items should trigger content switch", () => {
        tlib.render(<Menu />);
        tlib.screen.getByRole("button", {
            name: /orders/i
        }).click();
    });
});
