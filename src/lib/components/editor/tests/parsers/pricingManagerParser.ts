import PricingManagerParser from "../../parsers/pricingManager";
import { petClinic } from "./pricings";

test("After parsing Petclinic it should return a perfect serialized copy of Petclinic", () => {
  const pricingManagerBase = new PricingManagerParser(petClinic).parse();
  const serializedPricingManager = pricingManagerBase.serialize();

  expect(serializedPricingManager).toStrictEqual(petClinic);
});
