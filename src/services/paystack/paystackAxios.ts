import axios, { AxiosInstance } from "axios";
import { SUPPORTED_CURRENCY } from "../../types/services/paystack";
import { PaystackCurrencyRequiredError } from "./errors";

export class PaystackAxios {
  constructor(private Currency: SUPPORTED_CURRENCY) {
    if (!Currency) throw new PaystackCurrencyRequiredError();
  }

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
        console.info("Starting Request:", JSON.stringify(request, null, 2));
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
