import parsePricingManager from "../../parsers/pricingManager";
import { Type, UsageLimitType, ValueType } from "../../types";
import { petClinic, expectedPetclinic } from "./petclinic";

test("After parsing Petclinic it should return a perfect serialized copy of Petclinic", () => {
  const actualPetclinic = parsePricingManager(petClinic);

  expect(actualPetclinic).toStrictEqual(expectedPetclinic);
});
