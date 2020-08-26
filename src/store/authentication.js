import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
    name: "user",
    initialState: {
        isLogged: false,
        userData: {}
    },
    reducers : {
        setLogin : (user, action) => {
            user.isLogged = true;
            user.userData = {...action.payload}
        },
        setLogout : user => {
            user.isLogged = false;
            user.userData = {...new Object}
        },
        updateUserInformation : (user, action) => {
            user.userData = {...action.payload}
        },
        updateAvatar : (user, action) => {
            user.userData = {...user.userData, avatar : action.payload}
        },
        updateTradeHistory : (user, action) => {
            user.userData = {...user.userData, tradeHistory : [...action.payload]}
        }
    }
})
//actions
export const { setLogin, setLogout, updateUserInformation, updateAvatar, updateTradeHistory } = slice.actions;

//selector 
export const isLogged = createSelector(
    state => state.user.isLogged,
    isLogged => isLogged
)

export const userData = createSelector(
    state => state.user.userData,
    userData => userData
)

export const selectTradeHistory = createSelector(
    state => state.user.userData.tradeHistory,
    tradeHistory => tradeHistory
)

//reducer
export default slice.reducer;
