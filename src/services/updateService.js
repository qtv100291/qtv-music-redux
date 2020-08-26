import http from './httpService';
import { apiUrl } from "../config.json";
import store from '../store/configureStore';

const apiEndpoint = apiUrl + '/users'

function updateUser(){
    const shoppingCart = store.getState().shoppingCart;
    const userId = store.getState().user.userData.id;
    const userData = store.getState().user.userData;
    const userDataUpdate = {...userData};
    userDataUpdate.shoppingCart = [...shoppingCart];
    http.patch(apiEndpoint + `/${userId}`, userDataUpdate);
}

export default updateUser;


