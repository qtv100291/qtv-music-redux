import http from './httpService';
import { apiUrl } from "../config";

const apiEndpoint = apiUrl + '/articles';

export async function getArticle(articleId){
    const articleDetail = http.get(apiEndpoint + '/' + articleId);
    return articleDetail;
}