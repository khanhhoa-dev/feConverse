import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as httpsRequest from '../../utils/httpsRequest';
import type { IRegister } from '../../pages/Register/Register';
import type { ILogin } from '../../layouts/components/Header/Login/Login';
import type { IAuthUser } from '../../ts';

export interface ILoginError {
    field: 'username' | 'password';
    message: string;
}

export interface IUserInfo {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    admin: boolean;
    gender: string;
}

interface IAuthState {
    accessToken: string | null;
    register: {
        pending: boolean;
        error: boolean;
        data: IAuthUser | null;
    };
    login: {
        pending: boolean;
        data: IUserInfo | null;
        error: ILoginError | null;
    };
    logout: {
        pending: boolean;
        error: boolean;
        data: string | null;
    };
}

const initialState: IAuthState = {
    accessToken: null,
    register: {
        pending: false,
        error: false,
        data: null,
    },
    login: {
        pending: false,
        error: null,
        data: null,
    },
    logout: {
        pending: false,
        error: false,
        data: null,
    },
};

// createAsyncThunk< kiểu dữ liệu trả về, kiểu dự liệu nhận vào, kiểu giá trị truyền vào rejectWithValue>()
export const fetchRegister = createAsyncThunk<IAuthUser, IRegister, { rejectValue: string }>(
    'register/fetchRegister',
    async (data: IRegister, { rejectWithValue }) => {
        try {
            const resultRegister = await httpsRequest.post<IAuthUser>('/auth/register', data);
            if (!resultRegister) throw new Error('Failed to register');
            return resultRegister;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const fetchLogin = createAsyncThunk<IAuthUser, ILogin, { rejectValue: ILoginError }>(
    'login/fetchLogin',
    async (data: ILogin, { rejectWithValue }) => {
        try {
            const resultLogin = await httpsRequest.post<IAuthUser>('/auth/login', data);
            if (!resultLogin) throw new Error('Failed to Login');
            return resultLogin;
        } catch (error: any) {
            if (error.response?.data?.field && error.response?.data?.message) {
                return rejectWithValue({
                    field: error.response?.data?.field,
                    message: error.response?.data?.message,
                });
            }
            return rejectWithValue({ field: 'username', message: 'Server error' });
        }
    }
);

export const fetchLogout = createAsyncThunk<string, string, { rejectValue: string }>(
    'logout/fetchLogout',
    async (token: string, { rejectWithValue }) => {
        try {
            const resultLogout = await httpsRequest.post(
                '/auth/logout',
                {},
                {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                }
            );
            if (!resultLogout) throw new Error('Failed Logout');
            return resultLogout;
        } catch (error) {
            return rejectWithValue('Logout fail');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Update AccessToken
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
    },
    extraReducers: (builder) => {
        //Register
        builder.addCase(fetchRegister.pending, (state) => {
            state.register.pending = true;
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.register.pending = false;
            state.register.data = action.payload;
            state.register.error = false;
        });
        builder.addCase(fetchRegister.rejected, (state) => {
            state.register.pending = false;
            state.register.error = true;
        });

        //Login
        builder.addCase(fetchLogin.pending, (state) => {
            state.login.pending = true;
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.login.pending = false;
            const { accessToken, ...infoUser } = action.payload;
            state.login.data = infoUser;
            state.login.error = null;
            state.accessToken = accessToken;
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.login.error = action.payload ?? { field: 'username', message: 'Server error' };
            state.login.pending = false;
            state.login.data = null;
        });

        //Logout
        builder.addCase(fetchLogout.pending, (state) => {
            state.logout.pending = true;
            state.logout.error = false;
        });
        builder.addCase(fetchLogout.fulfilled, (state, action) => {
            state.logout.pending = false;
            state.logout.data = action.payload;
            state.logout.error = false;
            state.login.data = null;
            state.accessToken = null;
        });
        builder.addCase(fetchLogout.rejected, (state) => {
            state.logout.pending = false;
            state.logout.error = true;
        });
    },
});

export const { updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
