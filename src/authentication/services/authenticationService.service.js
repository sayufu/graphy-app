import { CsvReadingService } from "../../shared/services/csv-reading.service.js";

export class AuthenticationService {
    constructor() {
        this.users = [];
        this.csvFilePath = 'src/shared/data/USER_DATA.csv';
        this.csvReadingService = new CsvReadingService();

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