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
import IconLibrary from './ultis/addIcon';
import authService from './services/loginService';
import shoppingCartFunc from './ultis/shoppingCartFunc';
import updateUser from './services/updateService';
import addfunc from './ultis/additionalFunction';
import additionalFunctionDom from './ultis/additionalFunctionDom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import NavbarMobile from './components/NavbarMobile';

IconLibrary.addIcon();

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
      userData.shoppingCart = []
      this.setState({ user, userData, shoppingCart });
    }
    else {
    //if no logged user, load Shopping Cart from localstorage
      const shoppingCart = shoppingCartFunc.loadCartLocal()
      this.setState({ shoppingCart });
    }
  }

  handleUpdateShoppingCart = newItem => {
    const MySwal = withReactContent(Swal)
    const shoppingCartPrev = this.state.shoppingCart ? [...this.state.shoppingCart] : new Array(0);
    const shoppingCart = shoppingCartFunc.addItemToShoppingCart(shoppingCartPrev, newItem);
    this.setState({ shoppingCart });
    additionalFunctionDom.fixBody();
    MySwal.fire({
      icon: 'success',
      html: 'Đã Thêm Vào Giỏ Hàng',
      showConfirmButton: false,
      timer: 1250,
    }).then(() => {
      additionalFunctionDom.releaseBody();
    })
    if (this.state.user){
      updateUser(this.state.user.sub, this.state.userData, shoppingCart)
    } 
    else shoppingCartFunc.saveCartLocal(shoppingCart);
  }

  handlePlusQuantity = id => {
    const newShoppingCart = [...this.state.shoppingCart]
    for (let item of newShoppingCart){
      if ( item.id === id ){
        item.count += 1
      }
    }
    this.setState({ shoppingCart : newShoppingCart})
    if (this.state.user){
      updateUser(this.state.user.sub, this.state.userData, newShoppingCart)
    } 
    else shoppingCartFunc.saveCartLocal(newShoppingCart);
  }

  handleMinusQuantity = id => {
    const newShoppingCart = [...this.state.shoppingCart]
    for (let item of newShoppingCart){
      if ( item.id === id ){
        item.count += -1
      }
    }
    this.setState({ shoppingCart : newShoppingCart})
    if (this.state.user){
      updateUser(this.state.user.sub, this.state.userData, newShoppingCart)
    } 
    else shoppingCartFunc.saveCartLocal(newShoppingCart);
  }

  handleCheckEmpty = (id, input) => {//when input field loses focus, if input.value is empty, add value = 1 to input
    const newShoppingCart = [...this.state.shoppingCart];
    if ( input.value !== "") return 
    else {
      for (let item of newShoppingCart) {
        if (item.id === id ){
          item.count = 1;
          break;
        }
      }
      this.setState({ shoppingCart : newShoppingCart})
      if (this.state.user){
        updateUser(this.state.user.sub, this.state.userData, newShoppingCart)
      } 
      else shoppingCartFunc.saveCartLocal(newShoppingCart);
    }
  } 

  handleChangeQuantity = (id , input) => {
    const newShoppingCart = [...this.state.shoppingCart];
    const value = addfunc.checkOnly2Digit(input.value);
    for (let item of newShoppingCart){
      if ( item.id === id ){
        item.count = value;
        break
      }
    }
    this.setState({ shoppingCart : newShoppingCart})
    if (this.state.user){
      updateUser(this.state.user.sub, this.state.userData, newShoppingCart)
    } 
    else shoppingCartFunc.saveCartLocal(newShoppingCart);
  }

  handleDeleteItem = id => {
    const newShoppingCart = [...this.state.shoppingCart].filter(item => item.id !== id);
    this.setState({ shoppingCart : newShoppingCart})
    if (this.state.user){
      updateUser(this.state.user.sub, this.state.userData, newShoppingCart)
    } 
    else shoppingCartFunc.saveCartLocal(newShoppingCart);
  } 

  handleLoadingScreen = () => {
    const isLoadingScreen = this.state.isLoadingScreen ? false : true;
    this.setState({isLoadingScreen});
  }

  handleUpdateUserInformation = userData => {
    const MySwal = withReactContent(Swal)
    this.setState({ userData });
    updateUser(this.state.user.sub, userData, this.state.shoppingCart);
    MySwal.fire({
      icon: 'success',
      html: 'Đã Cập Nhật Thông Tin',
      showConfirmButton: false,
      timer: 1250,
    }).then(() => {
      additionalFunctionDom.releaseBody();
    })
  }

  handleUpdateTradeHistory = tradeHistory => {
    const shoppingCart = [];
    const userData = {...this.state.userData}
    const tradeHistoryUpdate = [...this.state.userData.tradeHistory,...tradeHistory];
    userData.tradeHistory = [...tradeHistoryUpdate];
    this.setState({userData,shoppingCart});
    updateUser(this.state.user.sub, userData, shoppingCart);
  }

  handleUpdateAvatar = urlAvatar => {
    const shoppingCart = [...this.state.shoppingCart];
    const userData = {...this.state.userData};
    userData.avatar = urlAvatar;
    this.setState({ userData });
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
        <LoadingScreen isLoadingScreen = {this.state.isLoadingScreen}/>
        <NavBar user = {user} shoppingCart= {shoppingCart}/>
        <NavbarMobile user = {user} shoppingCart= {shoppingCart}/>
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
                onLoadingScreen = {this.handleLoadingScreen}/>} />
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
                    shoppingCart ={ shoppingCart } 
                    onPlusQuantity = {this.handlePlusQuantity}
                    onMinusQuantity = {this.handleMinusQuantity}
                    onChangeQuantity = {this.handleChangeQuantity}
                    onDeleteItem = {this.handleDeleteItem}
                    onCheckEmpty = {this.handleCheckEmpty}
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
                            userData={userData}
                            onUpdateUser={this.handleUpdateUserInformation}
                            onUpdateAvatar = {this.handleUpdateAvatar}
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

export default App;

