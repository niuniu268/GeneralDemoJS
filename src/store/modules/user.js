import {createSlice} from "@reduxjs/toolkit";
import {getToken, http, setToken as _setToken, removeToken} from "../../utils";

const userStore = createSlice(
    {
        name: 'user',
        initialState: {
            token: getToken() || '',
        },
        reducers: {
            setToken (state, action) {
                state.token = action.payload
                _setToken(action.payload)
            },
            setUserInfo (state, action) {
                state.userInfo = action.payload
            },
            clearUserInfo (state) {
                state.token = ''
                state.userInfo = {}
                removeToken()
            }
        }


    }
)

const {setUserInfo, setToken, clearUserInfo} = userStore.actions;

const userReducer = userStore.reducer

const fetchLogin = (loginform) => {
    return async (dispatch) => {
        const res = await http.post(
            'authorization', loginform);
        dispatch(setToken(res.data.token))
        dispatch(setUserInfo(res.data.userInfo));
    }
}

const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await http.get('/user/profile')
        dispatch(setUserInfo(res.data));
    }

}

export {fetchLogin, fetchUserInfo, clearUserInfo}

export default userReducer