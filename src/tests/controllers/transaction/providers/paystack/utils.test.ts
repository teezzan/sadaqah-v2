import mockAxios from "../../../../__mocks__/axios";
import { list_banks } from "../../../../../controllers/transaction/providers/paystack/utils";
import { COUNTRY, SUPPORTED_CURRENCY } from "../../../../../types/transaction/providers/paystack";

afterEach(() => {
  mockAxios.reset();
});

describe("test paystack utils", () => {
  it("should return array of banks", async () => {
    const promise = list_banks(COUNTRY.NIGERIA, SUPPORTED_CURRENCY.NGN, null);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    mockAxios.mockResponse({
      data: {
        status: true,
        message: "Banks retrieved",
        data: [
          {
            name: "GT Bank",
          },
          {
            name: "First Bank",
          },
          {
            name: "Lotus Bank",
          },
        ],
        meta: {
          next: "YmFuazoxNjk=",
          previous: null,
          perPage: 3,
        },
      },
    });
    const result = await promise;
    expect(result).toMatchObject({
      status: expect.any(Boolean),
      message: expect.any(String),
      data: expect.any(Array),
      meta: expect.any(Object),
    });
    expect(result.data[2]).toEqual({
      name: "Lotus Bank",
    });
  }, 60_000);
});
