import { combineReducers } from 'redux';
import quickViewModalReducer from './quickViewModal';
import shoppingCartReducer from './shoppingCart';

export default combineReducers({
    quickViewModal : quickViewModalReducer,
    shoppingCart : shoppingCartReducer
})