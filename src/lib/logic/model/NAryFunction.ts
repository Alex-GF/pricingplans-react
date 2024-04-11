import { ResultValue } from "./ResultValue";

export interface NAryFunction<T>
{
    eval: () => Promise<ResultValue<T>>;
    equals: (other: NAryFunction<any>) => boolean;
}