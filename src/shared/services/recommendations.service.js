import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:7071/api/graphy-recommend'
});

export class RecommendationsService {
    getRecommendationsData(productId) {
        return http.get(`?productId=${productId}`);
    }
}