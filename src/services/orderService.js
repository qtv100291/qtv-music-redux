
import http from './httpService';
import { apiUrl } from "../config";

const apiEndpoint = apiUrl + '/order';

export default function sendOrder(orderInfo){
    return http.post(apiEndpoint,orderInfo)
}