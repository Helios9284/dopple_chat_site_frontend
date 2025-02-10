import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    openUsernameModal: false,
    openVerifyModal: false,
    openChatModal: false,
    openShareModal: false,
    openChatSettingsModal: false,
    openWaitlistModal: false,
    openDeleteAccountModal: false,
    openForgetPasswordModal: false,
    details: {},
}

export const ModalReducer = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setOpenVerifyModal: (state, action) => {
            state.openVerifyModal = !state.openVerifyModal
        },
        setOpenDeleteAccountModal: (state, action) => {
            state.openDeleteAccountModal = !state.openDeleteAccountModal
        },
        setOpenForgetPasswordModal: (state, action) => {
            state.openForgetPasswordModal = !state.openForgetPasswordModal
        },
        setOpenUsernameModal: (state, action) => {
            state.openUsernameModal = !state.openUsernameModal
        },
        setOpenShareModal: (state, action) => {
            state.openShareModal = !state.openShareModal
        },
        setOpenWaitlistModal: (state, action) => {
            state.openWaitlistModal = !state.openWaitlistModal
        },
        setOpenChatSettingsModal: (state, action) => {
            state.openChatSettingsModal = !state.openChatSettingsModal
        },
        setDetails: (state, action) => {
            state.details = action.payload
        },
        setReferralDopple: (state, action) => {
            state.referral = action.payload
        }
    },
})

export const { setOpenUncensoredWaitlistModal, setOpenDeleteAccountModal, setOpenVerifyModal, setOpenForgetPasswordModal, setOpenUsernameModal, setOpenSignModal, setOpenChatSettingsModal, setOpenShareModal, setOpenWaitlistModal, setDetails, setReferralDopple } = ModalReducer.actions

export default ModalReducer.reducer