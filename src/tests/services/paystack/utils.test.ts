import { list_banks } from "../../../services/paystack/utils";
import { COUNTRY, SUPPORTED_CURRENCY } from "../../../types/services/paystack";


describe("test paystack utils", () => {
  it("should return array of banks", async () => {
    
    const promise = list_banks(COUNTRY.NIGERIA, SUPPORTED_CURRENCY.NGN, null);
    const result = await promise;
    expect(result).toMatchObject({
      status: expect.any(Boolean),
      message: expect.any(String),
      data: expect.any(Array),
      meta: expect.any(Object),
    });
  }, 60_000);
});
