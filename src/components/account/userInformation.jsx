import React from 'react';
import Form from '../common/form';
import payoutService from '../../services/payoutService';
import './userInformation.scss';

 
class UserInformation extends Form {
    provinceInit = {
        idProvince:"None",
        name:"Chọn Tỉnh/Thành Phố ..."
    }

    districtInit = {
        idProvince:"None",
        idDistrict:"None",
        name:"Chọn Quận/Huyện..."
    }

    communeInit = {
        idDistrict: "None",
        idCommune: "None",
        name: "Chọn Phường/Xã..."
    }

    userLoadProperty = ["userName", "userPhone", "userProvince", "userDistrict", "userCommune", "userStreet","cardType" , "cardNumber", "cardOwner", "cardExpireDate", "cardCvv"]
    
    userDataProperty = [["name"], ["phone"], ["address","province"], ["address","district"], ["address","commune"], ["address","street"], ["payment","cardType"], ["payment", "cardNumber"], ["payment", "cardOwner"], ["payment", "cardExpireDate"], ["payment", "cardCvv"]];

    state = { 
        data : {},
        disabled: true,
        errors: {},
        serverError: {},
        province: [{...this.provinceInit}],
        district: [{...this.districtInit}],
        commune : [{...this.communeInit}],
    }
    
    async componentDidMount() {
        const { userData } = this.props;
        const  userLoadProperty  = [...this.userLoadProperty];
        const userDataProperty = [...this.userDataProperty];
        const userLoad = {};
        for (let i = 0; i < userLoadProperty.length ; i++){
            if (userDataProperty[i].length === 1){
                userLoad[userLoadProperty[i]] = userData[userDataProperty[i][0]];
            }
            else {
                userLoad[userLoadProperty[i]] = userData[userDataProperty[i][0]][userDataProperty[i][1]];
            }
        }
        const provinceList = await payoutService.getProvince();
        const province =[{...this.provinceInit},...provinceList];
        if (userLoad.userProvince !== "") {
            await this.hanldeDistrict(userLoad.userProvince)
        }
        if (userLoad.userDistrict !== "") {
            await this.hanldeCommune(userLoad.userDistrict)
        }
        this.setState({data : userLoad, province});
        document.title = "Tài Khoản";
    }

    hanldeDistrict = async idProvince => {
        if (idProvince === "None"){
            this.setState( { district: [{...this.districtInit}], commune: [{...this.communeInit}]} )
        }
        else {
            const districtList  = await payoutService.getDistrict(idProvince);
            const district = [{...this.districtInit}, ...districtList];
            this.setState({ district, commune: [{...this.communeInit}] })
        }
    }

    hanldeCommune = async idDistrict => {
        if (idDistrict === "None"){
            this.setState( { commune: [{...this.communeInit}]} )
        }
        else {
            const communeList  = await payoutService.getCommune(idDistrict);
            const commune = [{...this.communeInit},...communeList];
            this.setState({ commune })
        }
    }

    doSubmit = () => {
        const userData = {...this.props.userData};
        userData.address = {};
        userData.payment = {}
        const userLoadProperty  = [...this.userLoadProperty];
        const userDataProperty = [...this.userDataProperty];
        const userDataUpdate = {...this.state.data};
        for (let i = 0; i < userLoadProperty.length ; i++){
            if (userDataProperty[i].length === 1){
                userData[userDataProperty[i][0]] = userDataUpdate[userLoadProperty[i]] ;
            }
            else {
                userData[userDataProperty[i][0]][userDataProperty[i][1]] = userDataUpdate[userLoadProperty[i]] ;
            }
        }
        userData.tradeHistory = [...this.props.userData.tradeHistory]
        this.props.onUpdateUser(userData)
    }

    render() { 
        const { province, district, commune} = this.state ;
        const cardType = [
            {
                check:true,
                cardType: "None",
                name: "Chọn Loại Thẻ ..."
            },
            {
                cardType: "Visa",
                name: "Visa"
            },
            {
                cardType: "Master Card",
                name: "Master Card"
            },
            {
                cardType: "JCB",
                name: "JCB"
            }
        ]
        
        return ( 
        <div className="user-information">
            <form className="form-account" onSubmit={this.handleSubmit}>
                <h2>THÔNG TIN TÀI KHOẢN</h2>
                <div className="personal-information">
                    <h3>Thông Tin Cá Nhân</h3>
                    {this.renderInputType3("userName","Tên người nhận", "Nhập họ tên người nhận","false",10,"false")}
                    {this.renderInputType3("userPhone","Điện thoại", "Số điện thoại gồm 10 chữ số","true",10,"false")}
                    {this.renderSelect("userProvince","Tỉnh/Thành Phố",province, "idProvince","false")}
                    {this.renderSelect("userDistrict","Quận/Huyện",district, "idDistrict","false")}
                    {this.renderSelect("userCommune","Phường/Xã",commune, "idCommune","false")}
                    {this.renderInputType3("userStreet","Địa Chỉ", "Nhập số nhà, tên đường","false",10,"false")}
                </div>
                <div className="personal-payment-method">
                <h3>Thông Tin Thanh Toán</h3>
                    {this.renderSelect("cardType","Loại thẻ",cardType, "cardType","false")}
                    {this.renderInputType3("cardNumber","Số Thẻ", "Số thẻ gồm 12 chữ số...","true",12, "false")}
                    {this.renderInputType3("cardOwner","Tên Chủ Thẻ", "Lưu ý nhập khớp với tên trên thẻ","false",10,"false")}
                    {this.renderInputType3("cardExpireDate","Ngày Hết Hạn", "MM/YYYY","false",10,"false")}
                    {this.renderInputType3("cardCvv","Mã CVV/CVC", "Gồm 3 chữ số in ở mặt sau của thẻ...","true",3,"false")}
                </div>
                <button className="button-update">Cập Nhật Thông Tin</button>
            </form>
        </div> );
    }
}
 
export default UserInformation;

// {
//     "email": "quang@gmail.com",
//     "password": "$2a$10$.uSpF3U9PawVQjYxWUD5XOctEvQNwHsXdFEcwibUt0Vq2TThce06i",
//     "phone": "0962461650",
//     "name": "hehe",
//     "shoppingCart": [
//       {
//         "id": "10",
//         "name": "Lối Thoát",
//         "price": "200.000",
//         "image": "/album-cover-and-audio/Loi_Thoat/cover.jpg",
//         "bandName": "Microwave",
//         "count": 12
//       },
//       {
//         "id": "14",
//         "name": "Unlimited Giáng sinh",
//         "price": "180.000",
//         "image": "/album-cover-and-audio/Giang_Sinh/cover.jpg",
//         "bandName": "UnlimiteD",
//         "count": 8
//       }
//     ],
//     "address": {
//       "province": "",
//       "district": "",
//       "commune": "",
//       "street": ""
//     },
//     "payment": {
//       "cardType": "",
//       "cardNumber": "",
//       "cardOwner": "",
//       "cardExpireDate": "",
//       "cardCvv": ""
//     },
//     "tradeHistory": [],
//     "id": 1
//   }