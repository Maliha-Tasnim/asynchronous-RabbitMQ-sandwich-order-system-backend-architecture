import axios from "axios";
import { getApiUrl } from "../settings";

const baseUrl = "/sandwich";

const getListing = () => {
    console.debug("Fetch a list of sandwiches.");
    return axios.get(getApiUrl(baseUrl)).then(response => response.data);
};

const create = (data) => {
    return axios.post(getApiUrl(baseUrl), data).then(response => response.data) ;
};

const deleteSandwich = (sandwichId) => {
    return axios.delete(getApiUrl(`${baseUrl}/${sandwichId}`));
};

const retrieve = (sandwichId) => {
    return axios.get(getApiUrl(`${baseUrl}/${sandwichId}`)).then(response => response.data);
};

const update = (sandwichId, data) => {
    return axios.post(getApiUrl(`${baseUrl}/${sandwichId}`, data)).then(response => response.data);
};

export const SandwichService = { getListing, create, delete: deleteSandwich, retrieve, update };
