import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import TokenService from "./token.service";

export function fetchWithPricingInterceptor(url: string, options: RequestInit) {

  return fetch("http://localhost:8080" + url, {
    ...options,
    headers: {
      ...options.headers,
      "Pricing-Token": TokenService.getLocalPricingToken(),
    }
  }).then((response) => {
    // Check if the response contains the 'newToken' header and update the token in localStorage
    const newToken = response.headers.get("Pricing-Token");

    if (newToken !== null && newToken !== TokenService.getLocalPricingToken()) {
      TokenService.updateLocalPricingToken(newToken);
      window.location.reload();
    }

    return response;
  });
}

export function searchNewTokenAndUpdate(res: Response) {
  // Check if the response contains the 'newToken' header and update the token in localStorage
  const newToken = res.headers.get("Pricing-Token");

  if (newToken !== null && newToken !== TokenService.getLocalPricingToken()) {
    TokenService.updateLocalPricingToken(newToken);
    window.location.reload();
  }
}

// class PricingApiService {
//   public instance: AxiosInstance;

//   constructor(baseUrl: string) {
//     this.instance = axios.create({
//       baseURL: baseUrl,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     this.instance.interceptors.request.use(
//       (config) => {
//         const token = TokenService.getLocalPricingToken();
//         if (token) {
//           config.headers!["Authorization"] = "Bearer " + token; // for Spring Boot back-end
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     this.instance.interceptors.response.use(
//       (res: AxiosResponse) => {
//         // Check if the response contains the 'newToken' header and update the token in localStorage
//         const newToken = res.headers["New-Token"];

//         if (
//           newToken !== null &&
//           newToken !== TokenService.getLocalPricingToken()
//         ) {
//           TokenService.updateLocalPricingToken(newToken);
//           alert("Clinic plan changed!");
//           window.location.reload();
//         }

//         return res;
//       },
//       async (err) => {
//         const originalConfig = err.config;

//         if (originalConfig.url !== "/auth/signin" && err.response) {
//           // Access Token was expired
//           if (err.response.status === 401 && !originalConfig._retry) {
//             originalConfig._retry = true;

//             try {
//               const rs = await this.instance.post(
//                 "/auth/refreshtoken"
//                 // , {
//                 //     refreshToken: TokenService.getLocalRefreshToken(),
//                 // }
//               );

//               const { accessToken } = rs.data;
//               TokenService.updateLocalPricingToken(accessToken);

//               return this.instance(originalConfig);
//             } catch (_error) {
//               return Promise.reject(_error);
//             }
//           }
//         }

//         return Promise.reject(err);
//       }
//     );
//   }

//   // ------------ Getter and Setter for AxiosInstance ------------
//   public getAxiosInstance() {
//     return this.instance;
//   }

//   public setAxiosInstance(instance: AxiosInstance) {
//     this.instance = instance;
//   }

//   // ------------ CRUD methods ------------
//   public get(url: string, config?: AxiosRequestConfig) {
//     return this.instance.get(url, {
//       baseURL: this.instance.defaults.baseURL,
//     });
//   }

//   public post(url: string, data: any, config?: AxiosRequestConfig) {
//     return this.instance.post(url, data, config);
//   }

//   public put(url: string, data: any, config?: AxiosRequestConfig) {
//     return this.instance.put(url, data, config);
//   }

//   public delete(url: string, config?: AxiosRequestConfig) {
//     return this.instance.delete(url, config);
//   }

//   public patch(url: string, data: any, config?: AxiosRequestConfig) {
//     return this.instance.patch(url, data, config);
//   }

//   public head(url: string, config?: AxiosRequestConfig) {
//     return this.instance.head(url, config);
//   }

//   public options(url: string, config?: AxiosRequestConfig) {
//     return this.instance.options(url, config);
//   }

//   public request(url: string | undefined, config?: AxiosRequestConfig | undefined) {

//     console.log(url, config);

//     if (url && config) {

//       if (config.method) {

//         let requestConfigFinal = {
//           url: url,
//           ...config,
//         }

//         console.log(requestConfigFinal);

//         return this.instance.request(requestConfigFinal);
//       }else{
//         let method: Method = "GET";

//         if (config.data) {
//           method = "POST";
//         }

//         return this.instance.request({
//           url: url,
//           method: method,
//           ...config,
//         });
//       }
//     }else if (url) {
//       return this.instance.get(url);
//     }else if (config) {
//       return this.instance.request(config);
//     }else{
//       throw new Error("You must provide either a url or a config if you want to use the request method.");
//     }
    
//   }

//   // ------------ Default headers configuration methods ------------
//   public setCommonDefaultHeader(header: string, value: string) {
//     this.instance.defaults.headers.common[header] = value;
//   }

//   public removeCommonDefaultHeader(header: string) {
//     delete this.instance.defaults.headers.common[header];
//   }

//   public setGetDefaultHeader(header: string, value: string) {
//     this.instance.defaults.headers.get[header] = value;
//   }

//   public removeGetDefaultHeader(header: string) {
//     delete this.instance.defaults.headers.get[header];
//   }

//   public setPostDefaultHeader(header: string, value: string) {
//     this.instance.defaults.headers.post[header] = value;
//   }

//   public removePostDefaultHeader(header: string) {
//     delete this.instance.defaults.headers.post[header];
//   }

//   public setPutDefaultHeader(header: string, value: string) {
//     this.instance.defaults.headers.put[header] = value;
//   }

//   public removePutDefaultHeader(header: string) {
//     delete this.instance.defaults.headers.put[header];
//   }

//   public setDeleteDefaultHeader(header: string, value: string) {
//     this.instance.defaults.headers.delete[header] = value;
//   }

//   public removeDeleteDefaultHeader(header: string) {
//     delete this.instance.defaults.headers.delete[header];
//   }

//   public setPatchDefaultHeader(header: string, value: string) {
//     this.instance.defaults.headers.patch[header] = value;
//   }

//   public removePatchDefaultHeader(header: string) {
//     delete this.instance.defaults.headers.patch[header];
//   }

//   public setHeadDefaultHeader(header: string, value: string) {
//     this.instance.defaults.headers.head[header] = value;
//   }

//   public removeHeadDefaultHeader(header: string) {
//     delete this.instance.defaults.headers.head[header];
//   }

//   // ------------ Interceptors configuration ------------
//   public addRequestInterceptor(
//     onFulfilled?:
//       | ((
//           value: AxiosRequestConfig<any>
//         ) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>)
//       | undefined,
//     onRejected?: ((error: any) => any) | undefined
//   ): number {
//     return this.instance.interceptors.request.use(onFulfilled, onRejected);
//   }

//   public ejectRequestInterceptor(interceptorId: number): void {
//     this.instance.interceptors.request.eject(interceptorId);
//   }

//   public addResponseInterceptor(
//     onFulfilled?:
//       | ((
//           value: AxiosResponse<any>
//         ) => AxiosResponse<any> | Promise<AxiosResponse<any>>)
//       | undefined,
//     onRejected?: ((error: any) => any) | undefined
//   ): number {
//     return this.instance.interceptors.response.use(onFulfilled, onRejected);
//   }

//   public ejectResponseInterceptor(interceptorId: number): void {
//     this.instance.interceptors.response.eject(interceptorId);
//   }

// }

// export {PricingApiService};
