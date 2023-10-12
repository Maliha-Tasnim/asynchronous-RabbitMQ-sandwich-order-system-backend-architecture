import axios from "axios";
import { mockOrderList } from "../mocks/orders";
import { OrderService } from "./OrderService";

jest.mock("axios");

describe("OrderService", () => {
    it("should fetch a list of orders", async () => {
        axios.get.mockResolvedValue({data: mockOrderList});
        const data = await OrderService.getListing();
        expect(data).toEqual(mockOrderList);
    });

    it("should create order", async () => {
        const mockResponse = { id: 0, sandwichId: 0, status: "ordered" };
        axios.post.mockResolvedValue({ data: mockResponse });
        const data = await OrderService.createOrder(0);
        expect(data).toEqual(mockResponse);
    });
});
