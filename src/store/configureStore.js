import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './combinerReducer';

const store = configureStore({reducer : rootReducer})
export default store;

