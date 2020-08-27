import http from './httpService';
import { apiUrl } from "../config";

const apiEndpoint = apiUrl + '/subscription';

export default function subscrible(user){
    const data = { email: user["email-subscription"] }
    return http.post(apiEndpoint,data)
}