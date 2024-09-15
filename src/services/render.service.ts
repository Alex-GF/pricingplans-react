import React from 'react';
import { Pricing, Feature, UsageLimit, Plan, AddOn, CuiCuiPlan } from '../types.d';


export class RenderingService {

    toCuiCui(pricing: Pricing, bestValuePlan: number | null = null){
        
        let cuicuiJson: CuiCuiPlan[] = [];

        for (let plan of pricing.plans){
            let planJson: CuiCuiPlan = {
                title: plan.name,
                description: plan.description,
                price: {
                    monthly: plan.monthlyPrice,
                    annually: plan.annualPrice
                },
                features: plan.features.map((feature) => {
                    return feature.name;
                }),
                infos: plan.usageLimits?.map((usageLimit) => {
                    return usageLimit.name;
                })
            }

            cuicuiJson.push(planJson);
        }

        if (bestValuePlan == null){
            let bestValuePlanPos = Math.floor(cuicuiJson.length / 2);

            cuicuiJson[bestValuePlanPos].isBestValue = true;
        }else{
            cuicuiJson[bestValuePlan].isBestValue = true;
        }

        return cuicuiJson;
    }
}