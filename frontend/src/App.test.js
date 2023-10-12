import React from "react";
import { App } from "./App";
import {fireContentSwitchEvent} from "./events/ContentSwitch";

describe("<App/>", () => {
    it("should initialize event listener for swapping content", () => {
        tlib.render(<App />);
        fireContentSwitchEvent("login");
        // TODO: Add assertion that content is indeed swapped
    });
});
