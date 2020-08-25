import { combineReducers } from 'redux';
import quickViewModalReducer from './quickViewModal';
import shoppingCartReducer from './shoppingCart';
import userReducer from './authentication';
import userAboutThisWebsiteModalReducer from './aboutThisWebsiteModal';

export default combineReducers({
    quickViewModal : quickViewModalReducer,
    shoppingCart : shoppingCartReducer,
    user : userReducer,
    aboutThisWebsiteModal : userAboutThisWebsiteModalReducer
})
