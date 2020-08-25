import { createSlice } from '@reduxjs/toolkit';


const slice = createSlice({
    name : "aboutThisWebsiteModal",
    initialState: {
        isOpening : false,
    },
    reducers : {
        openAboutThisWebsiteModal : aboutThisWebsiteModal => {
            aboutThisWebsiteModal.isOpening = true
        },
        closeAboutThisWebsiteModal : aboutThisWebsiteModal => {
            aboutThisWebsiteModal.isOpening = false
        }
    }
})

export const { openAboutThisWebsiteModal, closeAboutThisWebsiteModal } = slice.actions;

export const selectAboutThisWebsiteIsOpening = state => state.aboutThisWebsiteModal.isOpening;

export default slice.reducer;