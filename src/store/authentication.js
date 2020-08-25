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
        }
    }
})
//actions
export const { setLogin, setLogout } = slice.actions;

//selector 
export const isLogged = createSelector(
    state => state.user.isLogged,
    isLogged => isLogged
)
export const userData = createSelector(
    state => state.user.userData,
    userData => userData
)
//reducer
export default slice.reducer;
