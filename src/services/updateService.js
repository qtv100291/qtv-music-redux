import http from './httpService';
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + '/users'

function updateUser(userId, userData, shoppingCart){
    const userDataUpdate = {...userData};
    userDataUpdate.shoppingCart = [...shoppingCart];
    http.put(apiEndpoint + `/${userId}`, userDataUpdate);
}

export default updateUser;
