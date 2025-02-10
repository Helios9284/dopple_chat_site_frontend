import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    pinnedIndexes: [],
    pinnedArchivedIndexes: [],
    archivedIndexes: [],
    dopples: [],
    deletedIndexes: [],
    clearedIndexes: [],
    toggleTextStream: false,
}

export const ChatReducer = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setToggleTextStream: (state, action) => {
            state.toggleTextStream = !state.toggleTextStream
        },
        setDopples: (state, action) => {
            state.dopples = action.payload.arr
        },
        setRemoveDeletedOrClearedIndexes: (state, action) => {
            let _deletedIndexes = [...state.deletedIndexes]
            state.deletedIndexes = _deletedIndexes.filter(x => x.id !== action.payload.index)
        },
        setDeleteChat: (state, action) => {
            let _dopples = state.dopples
            _dopples.splice(_dopples.findIndex(x => x._id === action.payload.doppleIndex), 1)
            state.dopples = _dopples

            let _deletedIndexes = [...state.deletedIndexes]
            if (_deletedIndexes.some(x => x.id === action.payload.doppleIndex))
                _deletedIndexes[_deletedIndexes.findIndex(x => x.id === action.payload.doppleIndex)] = {
                    id: action.payload.doppleIndex,
                    timestamp: action.payload.timestamp,
                }
            else
                _deletedIndexes.push({
                    id: action.payload.doppleIndex,
                    timestamp: action.payload.timestamp,
                })
            state.deletedIndexes = _deletedIndexes
        },
        setClearHistory: (state, action) => {
            let _dopples = [...state.dopples]
            _dopples[_dopples.findIndex(x => x._id === action.payload.doppleIndex)].chat_history = []
            state.dopples = _dopples

            let _clearedIndexes = [...state.clearedIndexes]
            if (_clearedIndexes.some(x => x.id === action.payload.doppleIndex)) {
                _clearedIndexes[_clearedIndexes.findIndex(x => x.id === action.payload.doppleIndex)] = {
                    id: action.payload.doppleIndex,
                    timestamp: action.payload.timestamp,
                }
            } else {
                _clearedIndexes.push({
                    id: action.payload.doppleIndex,
                    timestamp: action.payload.timestamp,
                })
            }
            state.clearedIndexes = _clearedIndexes
        },
        setPinnedIndexes: (state, action) => {
            state.pinnedIndexes = action.payload.arr
        },
        setPinnedArchivedIndexes: (state, action) => {
            state.pinnedArchivedIndexes = action.payload.arr
        },
        setArchivedIndexes: (state, action) => {
            state.archivedIndexes = action.payload.arr
        },
    },
})

export const { setToggleTextStream, setClearPoint, setDopples, setRemoveDeletedOrClearedIndexes, setPinnedIndexes, setPinnedArchivedIndexes, setArchivedIndexes, setClearHistory, setDeleteChat } = ChatReducer.actions

export default ChatReducer.reducer