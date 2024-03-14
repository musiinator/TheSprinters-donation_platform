import {setCookie} from 'cookies-next';

import axios, {AxiosResponse} from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {USER_API_URL} from '@/src/constants/server.constants';
import {serializeAxiosError} from '@/src/utils/reducer.util';
import {IConfig, LoginInformation, SignUpInformation} from '@/src/interfaces/account.interface';
import {StorageType} from "@/src/enums/StorageType";
import useStorage from "@/src/hooks/use-storage.hook";
import {AppThunk} from "@/src/hooks/general.hook";
import {ACCOUNT, AUTH_TOKEN_KEY} from "@/src/constants/general.constants";
import Router from "next/router";

interface InitialState {
    loading: null | undefined | boolean;
    isAuthenticated: null | undefined | boolean;
    jwtToken: null | undefined | string;
    loginSuccess: null | undefined | boolean;
    loginError:
        | null
        | undefined
        | boolean /** Errors returned from server side */
    ;
    account: any;
    errorMessage:
        | null
        | undefined
        | string /** Errors returned from server side */
    ;
    errorKey: null | undefined | string;

    email: null | undefined | string;

    success: {
        updateAccountSettings: boolean;
    };
    error: {
        updateAccountSettings: boolean;
    };
}

const authApiUrl = 'api/authenticate';

export type AuthenticationState = Readonly<typeof initialState>;

export const initialState: InitialState = {
    loading: false,
    isAuthenticated: null,
    jwtToken: null,
    loginSuccess: false,
    loginError: false /** Errors returned from server side */,
    account: {} as any,
    errorMessage:
        null as unknown as string /** Errors returned from server side */,
    errorKey: null as unknown as string,
    email: null,
    success: {
        updateAccountSettings: false as boolean,
    },
    error: {
        updateAccountSettings: false as boolean,
    },
};

export const authenticate = createAsyncThunk(
    'authentication/login',
    async (auth: LoginInformation) =>
        axios.post<any>(`${USER_API_URL}login`, auth),
    {
        serializeError: serializeAxiosError,
    }
);

export const signUp = createAsyncThunk(
    'authentication/register',
    async (signUpInfo: SignUpInformation) =>
        axios.post<any>(`${USER_API_URL}register`, signUpInfo),
    {
        serializeError: serializeAxiosError
    }
);
export const apiLogout = createAsyncThunk(
    'authentication/logout',
    async () => axios.post<any>(`${USER_API_URL}logout`),
    {
        serializeError: serializeAxiosError,
    }
);
export const login: (data: {
    username: string;
    password: string;
}) => AppThunk = (data) => async (dispatch) => {
    const result = await dispatch(
        authenticate({
            username: data.username,
            password: data.password,
        })
    );
    const response = result.payload as AxiosResponse;
    try {
        const {jwtToken, ...account} = response.data;
        if (jwtToken) {
            clearAuthToken();

            const {setItem} = useStorage();
            setItem(AUTH_TOKEN_KEY, jwtToken, StorageType.LOCAL);
            setItem(ACCOUNT, JSON.stringify(account), StorageType.LOCAL);
            setCookie('token', jwtToken);
        }
    } catch (e) {
        console.log('Failed to retrieve User Data')
    }
};

export const register: (data: SignUpInformation) => AppThunk = (data) => async (dispatch) => {
    const result = await dispatch(
        signUp({
            username: data.username,
            password: data.password,
            userType: data.userType
        })
    )
    const response = result.payload as AxiosResponse;
    try {
        const {jwtToken, ...account} = response.data;
        if (jwtToken) {
            clearAuthToken();

            const {setItem} = useStorage();
            setItem(AUTH_TOKEN_KEY, jwtToken, StorageType.LOCAL);
            setItem(ACCOUNT, JSON.stringify(account), StorageType.LOCAL);
            setCookie('token', jwtToken);
        }
    } catch (e) {
        console.log('Failed to retrieve User Data')
    }
}
export const clearAuthToken = () => {
    const {getItem, removeItem} = useStorage();
    const localAuthToken = getItem(AUTH_TOKEN_KEY, StorageType.LOCAL);
    const account = getItem(AUTH_TOKEN_KEY, StorageType.LOCAL);
    if (localAuthToken) {
        removeItem(AUTH_TOKEN_KEY, StorageType.LOCAL);
    }
    if (account) {
        removeItem(ACCOUNT, StorageType.LOCAL);
    }
};

export const logout: () => AppThunk = () => async (dispatch) => {
    clearAuthToken();
    dispatch(logoutSession());
};

export const AuthenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState as AuthenticationState,
    reducers: {
        verifyAuthState(state) {
            const {getItem} = useStorage()
            const jwt = getItem(AUTH_TOKEN_KEY, StorageType.LOCAL)
            const account = getItem(AUTH_TOKEN_KEY, StorageType.LOCAL)
            if (jwt && account) {
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: true,
                    loginSuccess: false,
                    loginError: false,
                    errorMessage: null,
                }
            }
            clearAuthToken()
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                loginSuccess: false,
                loginError: false,
                errorMessage: null,
            }

        },
        resetAuthState(state) {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                loginSuccess: false,
                loginError: false,
                errorMessage: null,
            };
        },
        logoutSession() {
            return {
                ...initialState,
                isAuthenticated: false,
            };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(authenticate.fulfilled, (state, action) => {
                const isAuthenticated = true;
                return {
                    ...state,
                    isAuthenticated,
                    jwtToken: action.payload?.data.idToken,
                    loading: false,
                    loginError: false,
                    loginSuccess: true,

                };
            })
            .addCase(authenticate.pending, () => ({
                ...initialState,
                loading: true,
                isAuthenticated: false,
                loginSuccess: false,
                loginError: false,
                errorMessage: null,
            }))
            .addCase(authenticate.rejected, (state, action) => {
                return {
                    ...initialState,
                    isAuthenticated: false,
                    loading: false,
                    errorMessage: (action.error as any).response?.data.message,
                    errorKey: (action.error as any).response?.data?.key,
                    loginError: true,
                }
            })
            .addCase(signUp.rejected, (state, action) => {
                return {
                    ...initialState,
                    isAuthenticated: false,
                    loading: false,
                    errorMessage: (action.error as any).response?.data.message,
                    errorKey: (action.error as any).response?.data?.key,
                }
            })
            .addCase(signUp.pending, () => ({
                ...initialState,
                loading: true,
                isAuthenticated: false,
                loginSuccess: false,
                loginError: false,
                errorMessage: null,
            }))
            .addCase(signUp.fulfilled, (state, action) => {
                const isAuthenticated = true;
                Router.push('/')
                return {
                    ...state,
                    isAuthenticated,
                    jwtToken: action.payload?.data.idToken,
                    loading: false,
                    loginError: false,
                    loginSuccess: true,

                };
            })
    },
});
export const {
    logoutSession,
    resetAuthState,
    verifyAuthState
} = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
