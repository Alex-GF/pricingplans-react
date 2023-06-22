import FeatureRetriever from "../../components/feature/FeatureRetriever";
import { NAryFunction, NAryFunctionOptions } from "./NAryFunction";
import { error, ResultValue, value } from "./ResultValue";
import tokenService from "../../../services/token.service";

export class Feature implements NAryFunction<boolean> {
    featureId: string;
    featureRetriever?: FeatureRetriever;

    constructor(featureId: string, featureRetriever?: FeatureRetriever) {
        this.featureId = featureId;
        this.featureRetriever = featureRetriever;
    }

    async eval(options?: NAryFunctionOptions): Promise<ResultValue<boolean>> {
        const retriever = tokenService.getFeaturesFromToken();//this.featureRetriever ?? options?.featureRetriever;
        if (!retriever) {
            return error("Error evaluating Feature " + this.featureId + ". No FeatureRetriever provided");
        }
        try {

            const feature = retriever[this.featureId];
            
            if (typeof feature["eval"] === "boolean") {
                return value(feature["eval"]);
            } else {
                return error("Error evaluating Feature " + this.featureId + ". It was not a boolean. Recv value: " + feature["eval"]);
            }
        } catch {
            return error("Error evaluating Feature: " + this.featureId + " Retrieval error");
        }
    }

    equals(other: NAryFunction<any>): boolean {
        if (other instanceof Feature) {
            return this.featureId === other.featureId;
        }
        return false;
    }
}

/**
 * NAryFunction that returns a feature boolean value.
 * @param featureId Id of the feature
 * @param featureRetriever FeatureRetriever instance. Recommended to just call featureRetriever.getLogicFeature()
 * @returns 
 */
export function feature(featureId: string, featureRetriever?: FeatureRetriever): NAryFunction<boolean> {
    return new Feature(featureId, featureRetriever);
}
