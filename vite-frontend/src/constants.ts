const PROD_BACKEND_API_URL = "/api";
const DEV_BACKEND_API_URL = "http://ec2-16-171-6-233.eu-north-1.compute.amazonaws.com";

export const BACKEND_API_URL =
	process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;