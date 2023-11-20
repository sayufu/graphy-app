import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:7071/api'
});

export class RecommendationsService {
    getRecommendationsData(productId) {
        return http.get(`graphy-recommend/?productId=${productId}`);
    }

    addNewPurchaseToGraph(){
        return http.get('graphy-purchase')
    }
}