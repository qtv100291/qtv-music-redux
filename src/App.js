import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Product from './components/Product';
import AlbumDetail from'./components/AlbumDetail';
import Blog from './components/Blog';
import BlogArticle from './components/BlogArticle';
import LogIn from './components/LogIn';
import Register from './components/Register';
import ScrollTopIcon from './components/common/scrollTopIcon';
import PurchaseGuidance from './components/PurchaseGuidance';
import ShoppingCart from './components/ShoppingCart';
import ContactUs from './components/ContactUs';
import ServicePolicy from './components/ServicePolicy';
import Payout from './components/Payout';
import LoadingScreen from './components/common/loadingScreen';
import SearchPage from './components/SearchPage';
import NotFoundPage from './components/NotFoundPage';
import Account from './components/Account';
import ProtectedRoute from './components/common/protectedRoute';
import PreviewModal from './components/common/previewModal';
import AboutThisWebsite from './components/navbar/aboutThisWebsite';
import NavbarMobile from './components/NavbarMobile';
import IconLibrary from './ultis/addIcon';
import authService, { getUserData, login } from './services/loginService';
import shoppingCartFunc from './ultis/shoppingCartFunc';
import updateUser from './services/updateService';
import addfunc from './ultis/additionalFunction';
import additionalFunctionDom from './ultis/additionalFunctionDom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getInitialValue } from './store/shoppingCart';
import { setLogin } from './store/authentication';

import { connect } from 'react-redux';


IconLibrary.addIcon();

const mapDispatchToProps = dispatch => ({
  getInitialShoppingCart: shoppingCart => {
    dispatch(getInitialValue(shoppingCart))
  },
  getInitialUser: userData => (
    dispatch(setLogin(userData))
  )
})
class App extends Component {
  state = { 
    isLoadingScreen:false
  }

  async componentDidMount() {
    //Authentication
    const user = authService.getCurrentUser();
    const timeNow = Date.now()/1000;
    if (user && user.exp > timeNow){
      const userId = user.sub
      const userData = await authService.getUserData(userId)
      user.name = userData.name;
      const shoppingCart = [...userData.shoppingCart];
      userData.shoppingCart = [...new Array()];
      this.props.getInitialShoppingCart(shoppingCart);
      this.props.getInitialUser(userData);
    }
    else {
    //if no logged user, load Shopping Cart from localstorage
      const shoppingCart = shoppingCartFunc.loadCartLocal()
      this.props.getInitialShoppingCart(shoppingCart)
    }
  }

  handleLoadingScreen = () => {
    const isLoadingScreen = this.state.isLoadingScreen ? false : true;
    this.setState({isLoadingScreen});
  }

  handleUpdateTradeHistory = tradeHistory => {
    const shoppingCart = [];
    const userData = {...this.state.userData}
    const tradeHistoryUpdate = [...this.state.userData.tradeHistory,...tradeHistory];
    userData.tradeHistory = [...tradeHistoryUpdate];
    this.setState({userData,shoppingCart});
    updateUser(this.state.user.sub, userData, shoppingCart);
  }

  handleCloseLoadingScreen = () => {
    this.setState( { isLoadingScreen: false} )
    
  }

  handleOpenLoadingScreen = () => {
    this.setState( { isLoadingScreen: true } )
  }

  render() { 
    const { shoppingCart, user, userData} = this.state;
    return ( 
      <React.Fragment>
        <PreviewModal />
        <AboutThisWebsite />
        <LoadingScreen isLoadingScreen = {this.state.isLoadingScreen}/>
        <NavBar />
        <NavbarMobile />
        <Switch>
            <Route path="/san-pham/:album" 
              render={(props) => <AlbumDetail {...props} 
                updateShoppingCart= {this.handleUpdateShoppingCart} 
                onLoadingScreen = {this.handleLoadingScreen}
              />}/>
            <Route path="/san-pham" 
              render={(props) => <Product {...props} 
                updateShoppingCart= {this.handleUpdateShoppingCart} 
                onLoadingScreen = {this.handleLoadingScreen}
              />}/>
            <Route path="/blog/:article" 
              render = {(props) => <BlogArticle {...props}  
              onLoadingScreen = {this.handleLoadingScreen}
            />}/>
            <Route path="/blog" render = {(props) => <Blog {...props} onLoadingScreen = {this.handleLoadingScreen}/>}/>
            <Route path="/dang-nhap" render = {(props) => <LogIn {...props} onLoadingScreen = {this.handleLoadingScreen}/>}/>
            <Route path="/dang-ky" render = {(props) => <Register {...props} onLoadingScreen = {this.handleLoadingScreen}/>}/>
            <Route path="/huong-dan-mua-hang" render = {(props) => <PurchaseGuidance {...props} onLoadingScreen = {this.handleLoadingScreen}/>}/>
            <Route path="/dieu-khoan-dich-vu" render = {(props) => <ServicePolicy {...props} onLoadingScreen = {this.handleLoadingScreen}/>}/>
            <Route path="/lien-he" render = {(props) => <ContactUs {...props} onLoadingScreen = {this.handleLoadingScreen}/>}/>
            <Route path="/tim-kiem" 
              render= {(props) => 
                <SearchPage {...props} 
                onLoadingScreen = {this.handleLoadingScreen}
                updateShoppingCart= {this.handleUpdateShoppingCart}
              />}/>
            <Route path="/gio-hang"
                  render={(props) => <ShoppingCart {...props} 
                    onOpenLoadingScreen = {this.handleOpenLoadingScreen}
                    onCloseLoadingScreen = {this.handleCloseLoadingScreen}
            />}/>
            <ProtectedRoute path="/thanh-toan" 
                            component= {Payout} 
                            userData={userData}
                            shoppingCart= { shoppingCart } 
                            onOpenLoadingScreen = {this.handleOpenLoadingScreen}
                            onCloseLoadingScreen = {this.handleCloseLoadingScreen}
                            onTradeHistory ={this.handleUpdateTradeHistory}
            />
            <ProtectedRoute path="/tai-khoan" 
                            component= {Account} 
                            onOpenLoadingScreen = {this.handleOpenLoadingScreen}
                            onCloseLoadingScreen = {this.handleCloseLoadingScreen}
            />
            <Route path="/khong-tim-thay" component={NotFoundPage}/>
            <Route exact path="/" render={(props) => <HomePage {...props} updateShoppingCart= {this.handleUpdateShoppingCart} onLoadingScreen = {this.handleLoadingScreen}/>}/>
            <Redirect to="/khong-tim-thay"/>
        </Switch>
        <ScrollTopIcon/>
        <Footer/>
    </React.Fragment>
     );
  }
}

export default connect(null,mapDispatchToProps)(App);

