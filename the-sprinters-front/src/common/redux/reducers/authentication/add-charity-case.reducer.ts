import { USER_API_URL } from '@/src/constants/server.constants';
import { AppThunk } from '@/src/hooks/general.hook';
import { CharityCase } from '@/src/interfaces/charity-case.interfaces';
import { serializeAxiosError } from '@/src/utils/reducer.util';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import charityCaseReducer from './charity-case.reducer';
import { access } from 'fs';
import { clearAuthToken } from './authentication.reducer';
import { FormData } from '@/pages/add-charitycase/index';

interface InitialState {
    loading: null | undefined | boolean;
    success: null | undefined | boolean;
    error: null | undefined | boolean;
    charityCase: FormData;
    errorMessage: null | undefined | string 
    errorKey: null | undefined | string;
}

export type CharityCaseState = Readonly<typeof initialState>;

export const initialState: InitialState = {
    loading: false,
    success: false,
    error: false,
    charityCase: {} as FormData,
    errorMessage: null as unknown as string,
    errorKey: null as unknown as string,
};

export const saveCharityCase = createAsyncThunk(
    'charityCase/charity-case',
    async (charityCase: FormData) => 
    axios.post<any>(`${USER_API_URL}charity-case`, charityCase),
    {
        serializeError: serializeAxiosError,
    }
);

export const addCharityCase: (data: FormData) => AppThunk = (data) => async (dispatch) => {
    await dispatch(saveCharityCase(data));
};

export const CharityCaseSlice = createSlice({
    name: 'charityCase',
    initialState: initialState as CharityCaseState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(saveCharityCase.pending, (state) => {
                return {
                    ...state,
                    charityCase: {} as FormData,
                    loading: true,
                };
            })
        .addCase(saveCharityCase.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    success: true,
                    charityCase: action.payload.data,
                };
            })
        .addCase(saveCharityCase.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMessage: action.error.message,
                };
            });
        },
    });

export default CharityCaseSlice.reducer;