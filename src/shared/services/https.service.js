import axios from 'axios';

const http = axios.create({
    baseURL: 'https://us-east-1.aws.data.mongodb-api.com/app/graphy-api-cfefb/endpoint/api/'
});

export class HttpsService {
    getAll(endpoint) {
        return http.get(endpoint);
    }

    create(endpoint, data) {
        return http.post(endpoint, data);
    }
}