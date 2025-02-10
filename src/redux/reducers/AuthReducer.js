import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    recentHistory: []
}

export const AuthReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
            action.payload?.token && localStorage.setItem("accessToken", action.payload?.token)
        },
        setClearRecentHistory: (state, action) => {
            state.recentHistory = []
        },
        setRecentHistory: (state, action) => {
            let tmp = [...state.recentHistory]
            if (action.payload.addOrRemove) {
                if(tmp.some(x => x._id === action.payload.data._id))
                    tmp.splice(tmp.findIndex(x => x._id === action.payload.data._id), 1)
                tmp.push(action.payload.data)
            }
            else {
                tmp.splice(tmp.findIndex(x => x._id === action.payload.data._id), 1)
            }
            state.recentHistory = tmp
        }
    },
})

export const { setClearRecentHistory, setProfile, setRecentHistory } = AuthReducer.actions

export default AuthReducer.reducer