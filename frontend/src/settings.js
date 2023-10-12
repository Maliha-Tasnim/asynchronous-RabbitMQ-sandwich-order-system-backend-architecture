export const SERVER_HOST = "http://localhost:8080";

/**
 * Returns the full API url with query parameters and all.
 *
 * @param {string} url
 * @param {object} queryParams
 * @returns {string} the full url
 */
export const getApiUrl = (url, queryParams= {}) => {
    return `${SERVER_HOST}${url}`;
};

export const SESSION_STORAGE_KEYS = {
    lastRoute: "lastRoute",
    orderPreview: "orderPreview",
};


export const ORDER_POLL_INTERVAL = 2500;
