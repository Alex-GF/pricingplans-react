# Pricing4React

![NPM Version](https://img.shields.io/npm/v/pricing4react)

The aim of this package is to provide some simple and easy to use components for react that allows UI feature toggling driven by pricing features. Also take a look to the package [Pricing4Java](https://github.com/isa-group/Pricing4Java), which allows fast and easy implementation of backend logic to be used by this package.

## Installation

```bash
npm install pricing4react
```

## Package logic

The package uses JSON Web Tokens (JWT) to send from the backend, as well as authentication data, the evaluation of different pricing features for the user that makes the request. The JWT must be stored as a `String` in the local storage of the browser, with the name `jwt`. The token body must have the following structure:

```
{
  "sub": String,
  "exp": timestamp,
  "iat": timestamp,
  "authentication": {
    ...
  },
  "features": {
    "feature1": {
        "eval": bool or string,
        "used": int,
        "limit": int
    },
    "feature2": {
        "eval": bool or string,
        "used": int,
        "limit": int
    },
    ...
  },
  "userContext": {
    ...
  },
  "planContext": {
    ...
  }
}
```

As you can see, with the 4 standard options of JWT, we have added a fifth: the `features` object. It contains the evaluation of the pricing features. The `eval` field could be a `boolean` that indicates the evaluation of the feature. `used` and `limit` are fields in which we can check the status of numerical limitations of the pricing plan. Specifically, `used` is the current use of the feature by the user (i.e 3 predictions made), and `limit` is the maximum number of times the feature can be used (i.e the user can perform up to 10 predictions). Both fields are optional, and if they are set to `null`, the feature will be considered as not limited. This could be interesting when we have simple boolean restrictions.

The `eval` field can also be a string that contains an expression that must be evaluated on the client side (for example, if it requires the previous evaluation of another feature). In this case, the expression must be a valid JavaScript expression, and the package will use the `eval` function to evaluate it. The expression can contain access the other two new paramenter on the JWT token's body: `userContext` and `planContext`. These two objects are used to store information about the user and the plan, respectively. They are optional, and if they are not present, they will be considered as empty objects.

As we said, you don't have to worry about the recreation of the JWT, since [Pricing4Java](https://github.com/isa-group/Pricing4Java) will do it for you on backend. However, if you want to create your own JWT, as long as it follows the structure above, the package will be able to perform the toggling.

## The `Feature` Component

This is a react component that allows to show or hide its children depending on the evaluation of a pricing feature. Depending on the context, it can have up to four children:

    - `On`: This component will be shown if the feature is evaluated to `true`. It has the prop `expression`, which reads from the JWT the evaluation of the feature. You can use the `feature` function to locate features by their key. **REQUIRED**
    - `Default`: This component will render its children if the evaluation of the feature performed in `On` component is `false`.
    - `Loading`: This component will render its children while the evaluation of the feature is being performed.
    - `ErrorFallback`: This component will render its children if an error occurs while the evaluation of the feature is being performed.

    The evaluation of a feature that has the key `myFeature` would be:

    ```javascript
    <Feature>
        <On expression={feature("myFeature")}>
            <p>Feature 1 is enabled</p>
        </On>
        <Default>
            <p>Feature 1 is disabled</p>
        </Default>
        <Loading>
            <p>Loading...</p>
        </Loading>
        <ErrorFallback>
            <p>An error occurred</p>
        </ErrorFallback>
    </Feature>
    ```

## The `useGenericFeature` hook

Also a hook is provided to get the evaluation of a feature. Its name is `useGenericFeature`, and it could be used to get the evaluation of a feature and save the result on a variable. It has the following signature:

```javascript
const myComponent = useGenericFeature({
    on: [
      {
        expression: feature("myFeature"),
        on: <p>Feature 1 is enabled</p>,
      },
    ],
    default: <p>Feature 1 is disabled</p>,
    loading: <p>Loading...</p>,
    errorFallback: <p>An error occurred</p>,
  });
```

## Binary operators

The package also provides a set of binary operators that can be used to combine the evaluation of different features. The operators are:

- `and`: Returns `true` if the features are evaluated to `true`.
- `or`: Returns `true` if at least one of the features is evaluated to `true`.
- `iff`: Returns `true` if the features' evaluation is the same (in type and value).
- `implies`: Returns `true` if the logical implication between features is correct. Given two features: A and B, on which A implies B; if feature A is `true`, B must be. `false` will be returned if not.

The usage of the operators is as follows:

```javascript
<Feature>
    <On expression={and(feature("feature1"), feature("feature2"))}>
        <p>Feature 1 and feature 2 are enabled</p>
    </On>
    ...
</Feature>
```

```javascript
<Feature>
    <On expression={or(feature("feature1"), feature("feature2"))}>
        <p>Feature 1 or feature 2 are enabled</p>
    </On>
    ...
</Feature>
```

```javascript
<Feature>
    <On expression={iff(feature("feature1"), feature("feature2"))}>
        <p>Feature 1 has the same evaluation as feature 2</p>
    </On>
    ...
</Feature>
```

```javascript
<Feature>
    <On expression={implies(feature("feature1"), feature("feature2"))}>
        <p>Because Feature 1 is enabled, feature 2 must be</p>
    </On>
    ...
</Feature>
```

## OpenFeature Provider

[OpenFeature](https://openfeature.dev) is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works with DevCycle.

In the case that you prefer to use the OpenFeature API to interface with Pricing4React, we provide a TypeScript implementation of the OpenFeature Web Provider interface.

To use the offered OpenFeature provider, follow this steps:

### 1. Install the Open Feature SDK for react:

```bash
npm i @openfeature/react-sdk
```

### 2. Configure OpenFeature with the ReactPricingDrivenFeaturesProvider

Next, OpenFeature can be configured with a **provider**, which is the engine that will process all underlying logic of the feature toggling. It can be set with the *setProvider* method:

```javascript
OpenFeature.setProvider(new YourProviderOfChoice(), evaluationContext);
```

As can be noted, OpenFeature can be initialized with a custom evaluationContext that is aimed to contain all the necessary information to perform the evaluation.

So, in order to use OpenFeature with the **ReactPricingDrivenFeaturesProvider**, it should be configured like this:

```javascript
OpenFeature.setProvider(new ReactPricingDrivenFeaturesProvider(), {
      pricingUrl: 'http://sphere.score.us.es/static/pricings/uploadedDataset/Pricing-driven%20Feature%20Toggling%20Demo/2025-1-8.yml',
      subscription: ["FREE"],
      userContext: {
        user: "test",
        // Extra fields needed from the user context to perform the evaluation of features...
      },
    });
```

As can be seen, the **ReactPricingDrivenFeaturesProvider** relies on a specific structure of the evaluationContext to work as expected:

- To populate the **pricingUrl** field, we highly recommend uploading your pricing data to [SPHERE](http://sphere.score.us.es). This will give you a direct URL to the uploaded file. If you prefer not to share the **Pricing2Yaml** model publicly, you can host the file elsewhere. The only requirement is that when you send a GET request to the URL specified in **pricingUrl**, the service must return the YAML file’s text.
- The **subscription** field contains a list of strings that specify the plan (if any in the pricing) and add-ons (if any is selected) that will conform the subscription of the user for which the evaluation will be performed.
- The **userContext** is a `Record<string, any>` that must contain a *user* field with the username (or unique identifier) of the user under evaluation. In addition, it should hold all other information required to perform the evaluation --- such as the user's current usage of a feature that has an usage limit.

### 3. Use OpenFeature

Once completed all previous steps, you should see in the console of your app a message indicating that the *Provider* has been initialized successfully.

```
PricingDrivenFeaturesProvider initialized with context: 
  > Object

    > pricingUrl:       "http://sphere.score.us.es/static/pricings/uploadedDataset/Pricing-driven%20Feature%20Toggling%20Demo/2025-1-8.yml"

    > subscription: ["FREE"]

    > userContext: {user: "test", createdExpenses: 2}
```

After that, you can use the OpenFeature client to perform the evaluation of features:

```typescript
// Evaluate a feature
const result = await client.getBooleanValue('featureName', false);
```
- **NOTE 1:** The last parameter denotes the default value of the evaluator, which is the one that is going to be used if an Error is thrown during evaluation.

- **NOTE 2:** We strongly recommend to only use getBooleanValue or useBooleanValue, since the evaluation of pricing features always return a boolean, i.e. the feature is enabled/disabled for the user, no matter what the initial feature type was: BOOLEAN, NUMERIC or TEXT

### Extra tip

In our [demo app](https://github.com/Alex-GF/unleash4pricing) we have created a custom FeatureFlag component that manage the render of its children based on the evaluation of a specific feature. This would be its implementation, considering that the ReactPricingDrivenFeaturesProvided has been configured.

```tsx
import { useBooleanFlagValue } from '@openfeature/react-sdk';

export default function FeatureFlag({
  featureName,
  children,
}: {
  featureName: string;
  children: React.ReactNode;
}) {

  const isEnabled = useBooleanFlagValue(featureName);

  return isEnabled ? <>{children}</> : <></>;
}
```

And it would be used as follows:

```tsx
<FeatureFlag featureName="testFeature">
  <ChildComponent/>
</FeatureFlag>
```
