import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './combinerReducer';

export default configureStore({reducer : rootReducer})