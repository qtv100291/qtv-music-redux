

function setDimension( source, target){ //set element target dimension is equal to element source dimension 
    const myWidth = source.clientWidth;
    target.style.width = myWidth + "px";
    const myHeight = source.clientHeight;
    target.style.height = myHeight + "px";
}

function fixBody(){
    let scrollBarWidth;
    if (document.body.offsetHeight > window.innerHeight){
        scrollBarWidth = window.innerWidth - document.body.clientWidth;
    }
    else scrollBarWidth = 0;
    if(document.querySelector('.navbar-desktop') !== null){
        document.querySelector('.navbar-desktop').style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.overflow = "hidden";
}

function releaseBody(){
    document.querySelector('.navbar-desktop').style.paddingRight = "0px";
    document.body.style.paddingRight = "0px";
    document.body.style.overflow = "auto";
}

function checkAreAllInputFilled(){
    const inputs = document.querySelectorAll('main  input');
    for (let i = 0; i < inputs.length; i++){
        if ( inputs[i].value.replace(/\s/g,"") === "" ) return false 
    }
    return true
}

function checkInput(inputCheck){
    const errors = {}
    for (let inputName in inputCheck){
        errors[inputName] = eval(inputCheck[inputName])(inputName);// execute function to check
    }
    return errors
}

function checkIfThereAreAnyError(errors){
    for (let error in errors){
        if (errors[error] !== "") {
            return true
        } 
    }
    return false
}

function emailCheck(inputName){
    const testRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const input = document.querySelector(`#${inputName}`).value;
    const error = "Email này không đúng định dạng"
    if (testRegex.test(input) === false) return error
    else return "";
}

function phoneCheck(inputName, digitNumber = 10){
    let error = "Số điện thoại bao gồm 10 chữ số";
    if (inputName === "cardNumber") {
        digitNumber = 12;
        error = "Số thẻ bao gồm 12 chữ số"
    }
    if (inputName === "cardCvv") {
        digitNumber = 3;
        error = "Mã số bao gồm 3 chữ số"
    }
    const regexVariable= `^\\d{${digitNumber}}$`
    const testRegex = new RegExp (regexVariable,"g")
    const input = document.querySelector(`#${inputName}`).value;
    if (testRegex.test(input) === false) return error
    else return "";
}

function passwordCheck(inputName){
    const testRegex = /^\S{6,}$/;
    const input = document.querySelector(`#${inputName}`).value;
    const error = "Mật khẩu có ít nhất 6 kí tự"
    if (testRegex.test(input) === false) return error;
    else return "";
}

function checkRetype(inputName){
    const input = document.querySelector(`#${inputName}`).value;
    const inputCheck = document.querySelector(`#${inputName.replace(/Retype/,"")}`).value;
    const error = "Mật khẩu không khớp"
    if (input !== inputCheck) return error
    else return "";
}

function selectEmptyCheck(inputName){
    const input = document.querySelector(`#${inputName}`).value;
    const error = "Bạn phải chọn một địa điểm"
    if (input === "None") return error
    else return "";
}

function emptyCheck(inputName){
    const input = document.querySelector(`#${inputName}`).value;
    const error = "Bạn không được để trống mục này";
    if (input === "") return error
    else return "";
}

function checkCardExpireDate(inputName){
    const input = document.querySelector(`#${inputName}`).value;
    const testRegex = /^\d{2}[/]\d{4}$/;
    let error;
    if (testRegex.test(input) === false) return error = "Dữ liệu không đúng định dạng";
    const monthCard = input.split("/")[0];
    const yearCard = input.split("/")[1];
    if (monthCard > 12) return error = "Tháng gồm 2 chữ số từ 01 đến 12"
    const monthNow = (new Date()).getMonth();
    const yearNow = (new Date()).getFullYear();
    if (yearNow > yearCard) return error = "Thẻ đã hết hạn"
    if (yearNow == yearCard) {
        if (monthNow >= monthCard) return error = "Thẻ đã hết hạn";
    }
    return error = "";
}

function checkhtmlHeight(){
    const htmlHieght = document.documentElement.offsetHeight;
    const windowHeight = window.innerHeight;
    const footerHieght = document.querySelector('footer').offsetHeight;
    if (htmlHieght + footerHieght < windowHeight)  document.querySelector('footer').classList.add('fixed');
    else document.querySelector('footer').classList.remove('fixed');
}

export default {
    setDimension,
    fixBody,
    releaseBody,
    checkAreAllInputFilled, 
    checkInput,
    checkIfThereAreAnyError,
    checkhtmlHeight
}

