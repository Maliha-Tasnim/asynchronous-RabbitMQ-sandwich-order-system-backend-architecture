import axios from "axios";
import { mockSandwichList } from "../mocks/sandwiches";
import { SandwichService } from "./SandwichService";

jest.mock("axios");

describe("SandwichService", () => {
    it("should fetch a list of sandwiches", async () => {
        axios.get.mockResolvedValue({ data: mockSandwichList });
        const data = await SandwichService.getListing();
        expect(data).toEqual(mockSandwichList);
    });
});
