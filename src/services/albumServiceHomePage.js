import http from './httpService';
import { apiUrl } from "../config.json";
import _, { values } from 'lodash';
import addfunc from '../ultis/additionalFunction';

const apiEndpoint = apiUrl + '/musicData';


export async function getAlbum(arrayId){
    const albumArray = await Promise.all(arrayId.map(id => http.get(apiEndpoint + '/' + id )))
                                .then(values => values.map(value => value.data))

    return albumArray;
}

export async function  getAllAlbum(){
    const allAlbumArray = await http.get(apiEndpoint)
    return allAlbumArray;
}

export function getAlbumDetail(id){
    const albumDetail = http.get(apiEndpoint + '/' + id);
    return albumDetail;
}

export async function getRelatedAlbum( bandName, country, albumId){ //get 2 others albums of considered band and 2 others albums in same country (Vietname or International )
    let randomValueBand, randomValueCountry;
    let { data : albumBand } = await http.get(apiEndpoint + '?bandName=' + bandName.split(" ").join("+"));
    let { data : albumCountry } = await http.get(apiEndpoint + '?country=' + country.split(" ").join("+"));
    if (albumBand.length >= 3) randomValueBand = 2
    else randomValueBand = albumBand.length - 1;
    randomValueCountry = 4 - randomValueBand;
    albumBand = albumBand.filter( album => album.id !== albumId);
    albumCountry = albumCountry.filter( albumCountry => albumCountry.bandName !== bandName);
    const randomAlbumBand = _.sampleSize(albumBand, randomValueBand);
    const randomAlbumCountry = _.sampleSize(albumCountry, randomValueCountry);
    const albumRelated = [...randomAlbumBand,...randomAlbumCountry];
    return albumRelated
}


export async function searchAlbum (searchInputRaw){
    const searchInput = addfunc.removeAccents(searchInputRaw).toLowerCase();
    const { data : albumList} = await http.get(apiEndpoint + '?q=' + searchInputRaw);
    let albumListFiltered = [];
    for (let album of albumList){
        if (addfunc.removeAccents(album.albumName).toLowerCase().includes(searchInput))
        albumListFiltered.push(album);
    }
    return albumListFiltered;
}







