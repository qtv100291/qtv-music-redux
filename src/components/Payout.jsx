import React from 'react';
import Form from '../components/common/form';
import './Payout.scss';
import addfunc from '../ultis/additionalFunction';
import payoutService from '../services/payoutService';
import { Link } from 'react-router-dom';
import sendOrder from '../services/orderService';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Payout extends Form {
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
        errors: {},
        serverError: {},
        disabled: true,
        province: [{...this.provinceInit}],
        district: [{...this.districtInit}],
        commune : [{...this.communeInit}],
    }

    inputCheck = {
        receiverName : "emptyCheck",
        receiverPhone : "phoneCheck",
        receiverProvince : "selectEmptyCheck",
        receiverDistrict : "selectEmptyCheck",
        receiverCommune : "selectEmptyCheck",
        receiverStreet : "emptyCheck"
    }

    inputCheckForCardPayment = {
        cardType : "selectEmptyCheck",
        cardNumber : "phoneCheck",
        cardOwner : "emptyCheck",
        cardExpireDate : "checkCardExpireDate",
        cardCvv : "phoneCheck"
    }

    userLoadProperty = ["receiverName", "receiverPhone", "receiverProvince", "receiverDistrict", "receiverCommune", "receiverStreet","cardType" , "cardNumber", "cardOwner", "cardExpireDate", "cardCvv"]
    
    userDataProperty = [["name"], ["phone"], ["address","province"], ["address","district"], ["address","commune"], ["address","street"], ["payment","cardType"], ["payment", "cardNumber"], ["payment", "cardOwner"], ["payment", "cardExpireDate"], ["payment", "cardCvv"]];

    async componentDidMount(){
        // if (!this.props.shoppingCart) return null;
        window.scrollTo(0, 0);
        this.props.onOpenLoadingScreen();
        additionalFunctionDom.fixBody();
        const { userData } = this.props;
        if (!userData) return;
        const userLoadProperty  = [...this.userLoadProperty];
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
        userLoad["paymentMethod"] = "cash";
        if (userLoad.userProvince !== "") {
            await this.hanldeDistrict(userLoad.receiverProvince)
        }
        if (userLoad.userDistrict !== "") {
            await this.hanldeCommune(userLoad.receiverDistrict)
        }
        this.setState({ data : userLoad, province })
        document.title = "Thanh Toán";
        setTimeout( () => {
            this.props.onCloseLoadingScreen();
            additionalFunctionDom.releaseBody();
        },400)  
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userData !== this.props.userData || prevProps.shoppingCart !== this.props.shoppingCart ){
            const prevHistory = prevProps.userData ? prevProps.userData.tradeHistory.length : this.props.userData.tradeHistory.length;
            if (prevHistory === this.props.userData.tradeHistory.length) this.componentDidMount()
        }
    }

    handleWaitPropsFullyLoaded = () => {
        setTimeout(() => {
            const { userData } = this.props;
            if (!userData) {
                this.handleWaitPropsFullyLoaded();
            }
            else return userData
        },100)
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
        additionalFunctionDom.fixBody()
        const MySwal = withReactContent(Swal)
        const {data} = this.state;
        const { shoppingCart } = this.props;
        const tradeHistory = addfunc.buildHistoryTrade(shoppingCart);
        const orderInfo = new addfunc.GetPaymentInfo( data, shoppingCart);
        this.props.onTradeHistory(tradeHistory);
        sendOrder(orderInfo);
        MySwal.fire({
            icon: 'success',
            text: 'Cảm ơn quý khách đã tin tưởng QTV Music, nhân viên của chúng tôi sẽ liên lạc với quý khách trong thời gian sớm nhất.',
            confirmButtonText: 'Quay Về Trang Chủ',
          }).then( () => {
            window.location ="/"
        })        
    }


    render() { 
        const { province, district, commune} = this.state;
        const { shoppingCart, userData } = this.props;
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
        
        if (Boolean(userData) === false || Boolean(shoppingCart) === false) return null;
        else
        return (  
            <main className="payout-main">
                <h2 className="payout-title">Thanh Toán</h2>
                <div className="payout-container d-flex justify-content-between">
                    <section className="payout-user-info">
                        <form onSubmit={this.handleSubmit} className="payout-form">
                            <div className="payout-user-info-detail">
                                <h3>Thông Tin Người Nhận</h3>
                                {this.renderInputType3("receiverName","Tên người nhận", "Nhập họ tên người nhận")}
                                {this.renderInputType3("receiverPhone","Điện thoại", "Số điện thoại gồm 10 chữ số","true")}
                                {this.renderSelect("receiverProvince","Tỉnh/Thành Phố",province, "idProvince")}
                                {this.renderSelect("receiverDistrict","Quận/Huyện",district, "idDistrict")}
                                {this.renderSelect("receiverCommune","Phường/Xã",commune, "idCommune")}
                                {this.renderInputType3("receiverStreet","Địa Chỉ", "Nhập số nhà, tên đường")}
                                {this.renderTextArea("receiverNote","Ghi Chú", "Bạn cần chúng tôi chú ý điều gì",5)}
                                <p className="empty-warning"><span className="obligation-mark">*</span> Bạn không được để trống mục này</p>
                            </div>
                            <div className="payment-method">
                                <h3>Thông Tin Thanh Toán</h3>
                                {this.renderRadioInput("paymentMethod","cash-method","Thanh toán bằng tiền mặt khi nhận hàng","cash","true")}  
                                {this.renderRadioInput("paymentMethod","card-method","Thanh toán bằng thẻ thanh toán quốc tế","card")}  
                                <div className={paymentMethod === "card" ? "card-method-content displaying" : "card-method-content"}>
                                    {this.renderSelect("cardType","Loại thẻ",cardType, "cardType")}
                                    {this.renderInputType3("cardNumber","Số Thẻ", "Số thẻ gồm 12 chữ số...","true",12)}
                                    {this.renderInputType3("cardOwner","Tên Chủ Thẻ", "Lưu ý nhập khớp với tên trên thẻ")}
                                    {this.renderInputType3("cardExpireDate","Ngày Hết Hạn", "MM/YYYY")}
                                    {this.renderInputType3("cardCvv","Mã CVV/CVC", "Gồm 3 chữ số in ở mặt sau của thẻ...","true",3)}
                                    <p className="empty-warning"><span className="obligation-mark">*</span> Bạn không được để trống mục này</p>
                                </div>
                            </div>
                            <button className="order-button" disabled={shoppingCart.length === 0 ? true : false}>Đặt Hàng</button>
                            <p className="note-order-button">(Kiểm tra kĩ thông tin trước khi nhấn nút)</p>
                        </form>
                    </section>
                    <section className="payout-shopping-cart">
                        <div className="payout-shopping-container">
                            <div className="payout-shopping-header d-flex justify-content-between">
                                <h3 className="payout-shopping-title">Đơn Hàng</h3>
                                <Link to="/gio-hang"><div className="back-to-cart-button">Sửa</div></Link>
                            </div>
                        </div>
                        <div className="payout-shopping-body">
                            {shoppingCart && shoppingCart.map( item =>
                                <div className="item-list" key={item.id}>
                                    <p>{item.count} x {item.name}</p>
                                    <p>= {addfunc.separator1000(item.count*item.price.replace(/\D/g,""))} VND</p>
                                </div>
                            )}
                        </div>
                        <div className="payout-shopping-footer">
                            <div className="provisional-sum d-flex justify-content-between"><span>Tạm tính:</span> {addfunc.separator1000(addfunc.totalMoneyCalculation(shoppingCart))} VND</div>
                            <div className="tax-vat d-flex justify-content-between"><span>Thuế VAT: </span>{addfunc.separator1000(addfunc.totalMoneyCalculation(shoppingCart)/10)} VND</div>
                            <div className="total-money d-flex justify-content-between"><strong>Tổng tiền:</strong> <span> {addfunc.separator1000((addfunc.totalMoneyCalculation(shoppingCart)*1.1).toFixed(0))} VND</span></div>
                        </div>
                    </section>
                </div>
            </main>
          );
    }
}

export default Payout;