import React, { Component } from 'react';
import Form from './common/form';
import './Register.scss';
import { Link } from 'react-router-dom';
import registerNewUser from '../services/registerService';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import additionalFunctionDom from '../ultis/additionalFunctionDom';



class Register extends Form {
    state = { 
        data :{},
        errors : {} ,
        serverError: "",
        disabled : true
    }

    inputCheck = {
        emailRegister: "emailCheck",
        phoneRegister : "phoneCheck",
        passwordRegister : "passwordCheck",
        passwordRegisterRetype : "checkRetype"
    }

    doSubmit = async () => {
        const MySwal = withReactContent(Swal);
        try {
            const { data : user } = this.state
            await registerNewUser(user);
            MySwal.fire({
                icon: 'success',
                html: 'Đăng Ký Thành Công',
                showConfirmButton: false,
                timer: 1250,
              }).then(() => {
                additionalFunctionDom.releaseBody();
            })
            this.props.history.replace('/dang-nhap');
        }
        catch(ex){
            if (ex.response && ex.response.status === 400) {
                const serverError = "Email này đã được sử dụng"; 
                this.setState({ serverError })
            }
        }
    }

    handleToggle = (e) =>{
        e.preventDefault();
        this.props.history.replace('/dang-nhap')
    }

    render() { 
        return ( 
        <main className="register-section">
            <section className="register-container">
                <h2>ĐĂNG KÝ</h2>
                {this.state.serverError && <div className="valid-feedback">{this.state.serverError}</div>}
                <form onSubmit={this.handleSubmit} className="register-form">
                    {this.renderInputType2("emailRegister","Email Đăng Ký")}
                    {this.renderInputType2("nameRegister","Họ Tên")}
                    {this.renderInputType2("phoneRegister","Số Điện Thoại","text","true")}
                    {this.renderInputType2("passwordRegister","Mật Khẩu Chứa Ít Nhất 6 Kí Tự","password")}
                    {this.renderInputType2("passwordRegisterRetype","Nhập Lại Mật Khẩu","password")}
                    <p>Khi bạn Khi bạn nhấn ĐĂNG KÝ, bạn đã đồng ý với những <span><Link to="/dieu-khoan">Điều Khoản</Link></span> và <span><Link to="/chinh-sach">Chính Sách</Link></span>  của QTV Guitar Shop.</p>
                    <button type="submit" disabled={this.state.disabled}>Đăng Ký</button>
                </form>
                <p>Bạn đã có tài khoản? <span><Link to="/dang-nhap" onClick={this.handleToggle}>Đăng nhập</Link></span></p>
            </section>
        </main>
        )
    }
}

export default Register;