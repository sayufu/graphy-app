import { FileManagerService } from "../../shared/services/file-manager.service.js";

export class AuthenticationService {
    constructor() {
        this.users = [];
        this.csvFilePath = 'USER_DATA.csv';
        this.csvReadingService = new FileManagerService();

        this.csvReadingService.readCsvFile(this.csvFilePath)
            .then((data) => {
                this.users = data;
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
            console.error('Sign-in error:', error);
            return Promise.reject(error);
        }
    }

    logout() {
        localStorage.removeItem('user');
    }
}