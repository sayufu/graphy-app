import {HttpsService} from "../../shared/services/https.service.js";

export class AuthenticationService {
    constructor() {
        this.users = [];
        this.httpService = new HttpsService();

        this.httpService.getAll('users').then((response) => {
            this.users = response.data;
        });
    }

    async signIn(username, password) {
        try {
            const user = this.users.find((user) => user.username === username && user.password === password);
            if (user) {
                return Promise.resolve(user);
            } else {
                return Promise.reject(new Error("User not found or password is incorrect"));
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    logout() {
        localStorage.removeItem('user');
    }
}