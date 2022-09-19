import axios from "axios";
import {
  ListBankRequest,
  COUNTRY,
  SUPPORTED_CURRENCY,
  ListBankResponse,
} from "../../../../types/transaction/providers/paystack";

export async function list_banks(
  country: COUNTRY,
  currency: SUPPORTED_CURRENCY,
  next: null | string
): Promise<ListBankResponse> {
  const bankRequest: ListBankRequest = {
    country,
    use_cursor: true,
    perPage: 100,
    currency
  };
  if (next) {
    bankRequest.next = next;
  }
  const searchString = Object.entries(bankRequest)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");
  const { data } = await axios.get(
    `${process.env.PAYSTACK_BASEURL}/bank?${searchString}`,
    { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
  );
  return data;
}
