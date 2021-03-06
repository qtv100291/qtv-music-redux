import React from 'react';
import Form from './common/form';
import './LogIn.scss';
import authService from '../services/loginService';
import { Link } from 'react-router-dom';



class LogIn extends Form {
    state = { 
        data :{
            emailLogIn: "user@gmail.com",
            passwordLogIn: "123456"
        },
        errors : {} ,
        serverError: "",
        disabled: false
    }

    inputCheck = {
        emailLogIn: "emailCheck"
    }

    
    componentDidMount() {
        document.title = "Đăng Nhập";
        window.scrollTo(0,0)
    }
    

    doSubmit = async () => {
        try {
            const { data : user } = this.state ;
            await authService.login(user);
            const { state } = this.props.location
            window.location = state ? state.from.pathname : "/";   
        }
        catch (ex){
            if (ex.response && ex.response.status === 400){
                const serverError = "Thông tin đăng nhập sai";
                this.setState({serverError})
            }
        }
    }

    handleToggle = (e) =>{
        e.preventDefault();
        this.props.history.replace('/dang-ky')
    }

    render(){ 
        return ( 
        <main className="log-in-section">
            <section className="log-in-container">
                <h2>ĐĂNG NHẬP</h2>
                {this.state.serverError && <div className="valid-feedback">{this.state.serverError}</div>}
                <form onSubmit={this.handleSubmit} className="log-in-form">
                    {this.renderInputType2("emailLogIn","Email Đăng Nhập")}
                    {this.renderInputType2("passwordLogIn","Mật Khẩu Đăng Nhập","password")}
                    <button type="submit" disabled={this.state.disabled} >Đăng Nhập</button>
                </form>
                <p>Bạn chưa có tài khoản? <span><Link to="/dang-ky" onClick={this.handleToggle}>Đăng Ký</Link></span></p>
            </section>
        </main>
        )
    }
}

export default LogIn;



