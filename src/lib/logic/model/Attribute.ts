import { AttributeValue } from "./util";
import { NAryFunction } from "./NAryFunction";
import { error, ResultValue, value } from "./ResultValue";
import tokenService from "../../../services/token.service";

export class Attribute implements NAryFunction<AttributeValue> {
    attributeId: string;

    constructor(featureId: string) {
        this.attributeId = featureId;
    }

    async eval(): Promise<ResultValue<AttributeValue>> {
        const retriever = tokenService.getFromToken("features");//this.featureRetriever ?? options?.featureRetriever;
        if (!retriever) {
            return error("Error evaluating Attribute " + this.attributeId + ". No FeatureRetriever provided");
        }
        try {
            const attribute = retriever[this.attributeId];
            if (typeof attribute["eval"] === "boolean") {
                return error("Error evaluating Attribute " + this.attributeId + ". Got a boolean, expected number or string. Recv value: " + attribute);
            } else {
                return value(attribute["eval"]);
            }
        } catch {
            return error("Error evaluating Attribute: " + this.attributeId + " Retrieval error");
        }
    }

    equals(other: NAryFunction<any>): boolean {
        if (other instanceof Attribute) {
            return this.attributeId === other.attributeId;
        }
        return false;
    }
}

/**
 * NAryFunction that returns an attribute value, which resolves to a number or string.
 * @param attributeId Id of the attribute
 * @param featureRetriever FeatureRetriever instance. Recommended to just call featureRetriever.getLogicAttribute()
 * @returns 
 */
export function attribute(attributeId: string): NAryFunction<AttributeValue> {
    return new Attribute(attributeId);
}