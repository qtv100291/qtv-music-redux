
function filterMusic(genre, musicData){
    // create array following this sample [ { band : number of different albums }, ...]
    const genreFilter = musicData.filter( x => x.country === genre);
    const bandFilter = genreFilter.map(x => x.bandName);
    const numberOfAlbumPerBand = bandFilter.reduce((allBand, band) => {
        if (band in allBand) {
            allBand[band]++;
        }
        else {
            allBand[band] = 1
        }
        return allBand
    }, {} )
    let numberOfAlbumPerBandArray = [];
    for (let band in numberOfAlbumPerBand){
        numberOfAlbumPerBandArray.push( {[band] : numberOfAlbumPerBand[band]} );
    }
    let allKey = "Rock/Metal " + genre; 
    const numberOfAlbumPerBandArraySorted = [{[allKey]: bandFilter.length},...numberOfAlbumPerBandArray];
    return numberOfAlbumPerBandArraySorted; 
}

function sortAToZ(array){
    const arraySorted =  array.sort((a,b) => {return a.albumName.localeCompare(b.albumName)})
    return arraySorted
}

function sortZToA(array){
    const arraySorted = sortAToZ(array).reverse();
    return arraySorted
}

function sortPriceMinToMax(array){
    return array.sort((a,b) => { return parseInt(a.price.replace(/\D/g,"")) - parseInt(b.price.replace(/\D/g,""))})
}

function sortPriceMaxToMin(array){
    return array.sort((a,b) => { return -(parseInt(a.price.replace(/\D/g,"")) - parseInt(b.price.replace(/\D/g,"")))})
}

function albumDisplay( total, currentpage, albumPerPage, album) {
    let indexEnd;
    if (currentpage === Math.ceil(total/albumPerPage)) indexEnd = total
    else indexEnd = currentpage*albumPerPage;
    const albumDisplay = album.slice((currentpage - 1)*albumPerPage, indexEnd);
    return albumDisplay;
} 


function productSortBy ( albumList, sortOrderBy ){
    let sortedAlbum
    switch (sortOrderBy){
        case "Tên Từ A Đến Z":
            sortedAlbum = sortAToZ(albumList)
            break
        case "Tên Từ Z Đến A":
            sortedAlbum = sortZToA(albumList)
            break
        case "Giá Tăng Dần":
            sortedAlbum = sortPriceMinToMax(albumList)
            break
        case "Giá Giảm Dần":
            sortedAlbum = sortPriceMaxToMin(albumList)
            break
    }
    return sortedAlbum;
}

function productFilter(album, filterValue) { 
    let filteredAlbum;
    if (filterValue === null) {
        filteredAlbum = album.slice(0);
        return filteredAlbum;
    }
    if (filterValue === "Rock/Metal Việt Nam") {
        filteredAlbum = album.filter( x => x.country === "Việt Nam");
        return filteredAlbum;
    }
    if (filterValue === "Rock/Metal Quốc Tế") {
        filteredAlbum = album.filter( x => x.country === "Quốc Tế");
        return filteredAlbum;
    }
    filteredAlbum = album.filter( x => x.bandName === filterValue);
    return filteredAlbum;
    
}

function separator1000(num){// 1000 separator 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
}

function getAlbumId(path){
    const pathArray = path.split("-");
    const albumId = pathArray[pathArray.length-1];
    return albumId
}

function getRatioSliderBar ( time, timeDuration ){
    const ratioSliderBar = (time/timeDuration*100).toFixed(2);
    // const widthSlider = document.querySelector('.input-slider::-webkit-slider-thumb').style.width = `${ratioSliderBar}`
    return ratioSliderBar 
}

function setTimeInSecond(time){
    const minutes = Math.floor(time/60) < 10 ? `0${Math.floor(time/60) }` : Math.floor(time/60);
    const seconds = (time - minutes*60) < 10 ? `0${Math.ceil((time - minutes*60))}` : Math.ceil(time - minutes*60);
    const timeInSecond = `${minutes} : ${seconds}`
    return timeInSecond
}

function getTimePlay (valueRef,timeDuration){
    const timePlay = Math.ceil(valueRef/100*timeDuration)
    return timePlay
}

function songTimeDuration(time){
    const minutes = parseInt(time.split(':')[0]) < 10 ? `0${parseInt(time.split(':')[0])}` : parseInt(time.split(':')[0]);
    const seconds = parseInt(time.split(':')[1]) < 10 ? `0${parseInt(time.split(':')[1])}` : parseInt(time.split(':')[1]);
    return `${minutes} : ${seconds}`
}

function titlePath(title){
    const path = removeAccents(title).toLowerCase().split(" ").join("-");
    return path
}

function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function totalItemCalculation (shoppingCart) {
    let totalItem = 0;
    for (let item of shoppingCart) {
        const count = item.count || 0
        totalItem += parseInt(count);
    }
    return totalItem
}

function totalMoneyCalculation(shoppingCart){
    let totalMoney = 0;
    for (let item of shoppingCart) {
        const count = item.count || 0
        totalMoney += item.price.replace(/\D/g,"")*count;
    }
    return totalMoney
}

function GetPaymentInfo(data , shoppingCart){
    this.receiverName = data.receiverName;
    this.phone = data.receiverPhone;
    this.address = {
        province : data.receiverProvince,
        district : data.receiverDistrict,
        commnune : data.receiverCommune
    }
    this.note = data.reciverNote;
    this.paymentMethod = data.paymentMethod;
    if (data.paymentMethod === "card") {
        this.cardInfo = {
            cardType : data.cardType,
            cardOwner : data.cardOwner,
            cardExpireDate : data.cardExpireDate,
            cardCvv : data.cardCvv
        }
    }
    this.orderList = [...shoppingCart]
}

const checkOnly2Digit = value => {//function check value is a number from 1 to 99 
    const regex = /^\d{0,2}$/;
    const testValue = value;
    if (testValue === "") return ""
    if (regex.test(testValue) && testValue.charAt(0) !== "0") {
      return parseInt(testValue)
    }
    else {
      const testValueChange = testValue.substring(0, testValue.length - 1);
      if (testValueChange === "") return ""
      else return parseInt(testValueChange);
    }
  }


export default {
    filterMusic,
    sortAToZ,
    sortZToA,
    sortPriceMinToMax,
    sortPriceMaxToMin,
    separator1000,
    productSortBy,
    albumDisplay,
    productFilter,
    getAlbumId,
    getRatioSliderBar,
    setTimeInSecond,
    getTimePlay,
    songTimeDuration,
    titlePath,
    removeAccents,
    totalItemCalculation,
    totalMoneyCalculation,
    GetPaymentInfo,
    checkOnly2Digit
}

