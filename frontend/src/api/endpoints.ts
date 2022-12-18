const backendBaseProtocol = import.meta.env.VITE_BACKEND_BASE_PROTOCOL;
const backendBaseHost = import.meta.env.VITE_BACKEND_BASE_HOST;
const backendBasePort = import.meta.env.VITE_BACKEND_BASE_PORT;

export const backendBaseUrl = `${backendBaseProtocol}://${backendBaseHost}:${backendBasePort}`;

export const apiV1Prefix = `/api/v1`;

export const backendBase = backendBaseUrl + apiV1Prefix;