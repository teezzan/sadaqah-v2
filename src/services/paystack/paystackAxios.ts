import axios, { AxiosInstance } from "axios";


export class PaystackAxios {

  protected http(): AxiosInstance {
    const psAxios = axios.create({
      baseURL: process.env.PAYSTACK_BASEURL,
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "content-type": "application/json",
      },
    });

    psAxios.interceptors.request.use(
      (request) => {
        return request;
      },
      (error) => {
        console.error("Request Error:", JSON.stringify(error, null, 2));
        if (error.response) {
          console.error(error.response?.data);
          return Promise.reject(
            `Caught error: ${error.response?.data?.message}`
          );
        }
        return Promise.reject(error);
      }
    );

    psAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("Response Error:", JSON.stringify(error, null, 2));
        if (error.response) {
          console.error(error.response?.data);
          return Promise.reject(
            `Caught error: ${error.response?.data?.message}`
          );
        }
        return Promise.reject(error);
      }
    );

    return psAxios;
  }
}
