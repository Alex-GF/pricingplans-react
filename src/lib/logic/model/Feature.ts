import { NAryFunction } from "./NAryFunction";
import { error, ResultValue, value } from "./ResultValue";
import tokenService from "../../../services/token.service";

export class Feature implements NAryFunction<boolean> {
    featureId: string;

    constructor(featureId: string) {
        this.featureId = featureId;
    }

    async eval(): Promise<ResultValue<boolean>> {
        const retriever = tokenService.getFromToken("features");
        if (!retriever) {
            return error("Error evaluating Feature " + this.featureId + ". No FeatureRetriever provided");
        }
        try {

            const feature = retriever[this.featureId];
            
            if (typeof feature["eval"] === "boolean") {
                return value(feature["eval"]);
            }else if (typeof feature["eval"] === "string"){ 

                let userContext = tokenService.getFromToken("userContext");
                let planContext = tokenService.getFromToken("planContext");

                try{
                    let result = eval(`${feature["eval"]}`)
                    return value(result);
                }catch{
                    return error("Error evaluating Feature " + this.featureId + ". The expression is not valid, it throws an exception or returns a non boolean value.");
                }

            } else {
                return error("Error evaluating Feature " + this.featureId + ". It was not a boolean. Recv value: " + feature["eval"]);
            }
        } catch{

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
 * @returns 
 */
export function feature(featureId: string): NAryFunction<boolean> {
    return new Feature(featureId);
}
