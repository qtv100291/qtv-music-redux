import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './combinerReducer';
import saveShoppingCart from './middleware/saveShoppingCart';

const store = configureStore({ reducer : rootReducer, middleware : [saveShoppingCart] });
export default store;

