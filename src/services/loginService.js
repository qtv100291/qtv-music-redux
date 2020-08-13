import http from './httpService';
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
import shoppingCartFunc from '../ultis/shoppingCartFunc';
import addfunc from '../ultis/additionalFunction';


const apiEndpoint = apiUrl + '/login';
const tokenKey = "token";
const apiEndpointUser = apiUrl + '/users'

export async function login(user){
    const userData = {
        email : user.emailLogIn,
        password : user.passwordLogIn,
    }
    const { data : tokenUser  } = await http.post(apiEndpoint,userData);
    localStorage.setItem(tokenKey, tokenUser.accessToken);
}

export function getCurrentUser(){
    try {
        const jwtUser = localStorage.getItem(tokenKey);
        return jwtDecode(jwtUser);
    }
    catch (ex){
        return null
    }
}

export async function getUserData(userId){//get user's data and synchronize server
    const {data : user} = await http.get(apiEndpointUser + `/${userId}`);
    const shoppingCartServer = [...user.shoppingCart];
    const shoppingCartLocal = shoppingCartFunc.loadCartLocal() || [];
    const shoppingCart = shoppingCartFunc.merge2shoppingCart(shoppingCartServer, shoppingCartLocal) // merger shopping from server and shopping card on user's computer
    const userData = {...user}
    userData.shoppingCart = [...shoppingCart];
    http.patch(apiEndpointUser + `/${userId}`,userData);//update shopping car on server
    localStorage.removeItem("qtv-cart");
    delete userData.password;
    return userData
}

export default {
    login,
    getCurrentUser,
    getUserData
}


// const InfoItem = ({ textitem }) => {
//     return (
//       <div>
//         {textitem.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
//       </div>
//     );
// };