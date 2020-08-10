import React from 'react';
import Form from '../common/form';
import payoutService from '../../services/payoutService';

 
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

    state = { 
        data : {},
        disabled: true,
        errors: {},
        serverError: {},
        province: [{...this.provinceInit}],
        district: [{...this.districtInit}],
        commune : [{...this.communeInit}],
        provinceValue: "None",
        districtValue : "None",
        communeValue : "None"
    }

    async componentDidMount() {
        let data = {...this.state.data};
        const provinceList = await payoutService.getProvince();
        const province =[{...this.provinceInit},...provinceList];
        this.setState({ data, province })
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

    render() { 
        const { province, district, commune} = this.state ;
        const { paymentMethod } = this.state.data;   
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
        return ( <div className="user-information">
            <form className="form-account" onSubmit={this.handleSubmit}>
                <div className="personal-information">
                    {this.renderInputType3("userName","Tên người nhận", "Nhập họ tên người nhận")}
                    {this.renderInputType3("userPhone","Điện thoại", "Số điện thoại gồm 10 chữ số","true")}
                    {this.renderSelect("userProvince","Tỉnh/Thành Phố",province, "idProvince")}
                    {this.renderSelect("userDistrict","Quận/Huyện",district, "idDistrict")}
                    {this.renderSelect("userCommune","Phường/Xã",commune, "idCommune")}
                    {this.renderInputType3("userStreet","Địa Chỉ", "Nhập số nhà, tên đường")}
                </div>
                <div className="personal-payment-method">
                {this.renderSelect("cardType","Loại thẻ",cardType, "cardType")}
                    {this.renderInputType3("cardNumber","Số Thẻ", "Số thẻ gồm 12 chữ số...","true",12)}
                    {this.renderInputType3("cardOwner","Tên Chủ Thẻ", "Lưu ý nhập khớp với tên trên thẻ")}
                    {this.renderInputType3("cardExpireDate","Ngày Hết Hạn", "MM/YYYY")}
                    {this.renderInputType3("cardCvv","Mã CVV/CVC", "Gồm 3 chữ số in ở mặt sau của thẻ...","true",3)}
                </div>
            </form>
        </div> );
    }
}
 
export default UserInformation;

