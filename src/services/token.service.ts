import { Buffer } from "buffer";

function parseJwt (token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user") as string);
        return user?.refreshToken;
    }

    getLocalPricingToken() {
        const jwt = JSON.parse(localStorage.getItem("pricingToken")  as string);
        return jwt ? jwt : null;
    }

    getFromToken(key: string) {
        const jwt = JSON.parse(localStorage.getItem("pricingToken")  as string);

        if (jwt) {

            let jwtBody = parseJwt(jwt);

            return jwtBody[key];
        }

        return null;
    }

    updateLocalPricingToken(token: string) {
        window.localStorage.setItem("pricingToken", JSON.stringify(token));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user")  as string);
    }

    setUser(user: object) {
        window.localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("pricingToken");
    }

    updateJWTToken() {

        return new Promise<void>((resolve, reject) => {
            fetch("/api/v1/auth/refreshToken", {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${this.getLocalPricingToken()}`,
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.updateLocalPricingToken(data.newToken);
                resolve();
            }).catch((error) => {reject(error)});
        });
    }

}
const tokenService = new TokenService();

export default tokenService;