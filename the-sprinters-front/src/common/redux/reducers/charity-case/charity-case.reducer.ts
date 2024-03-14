import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_API_URL } from '@/src/constants/server.constants';
import { serializeAxiosError } from '@/src/utils/reducer.util';
import { AppThunk } from '@/src/hooks/general.hook';
import useStorage from '@/src/hooks/use-storage.hook';
import { StorageType } from '@/src/enums/StorageType';
import { CharityCase } from '@/src/interfaces/charity-case.interfaces';

interface InitialState {
  loading: null | undefined | boolean;
  success: null | undefined | boolean;
  error: null | undefined | boolean /** Errors returned from server side */;
  charityCases: CharityCase[];
  errorMessage: null | undefined | string /** Errors returned from server side */;
  errorKey: null | undefined | string;
}

export type CharityCaseState = Readonly<typeof initialState>;

export const initialState: InitialState = {
  loading: false,
  success: false,
  error: false /** Errors returned from server side */,
  charityCases: [] as CharityCase[],
  errorMessage: null as unknown as string /** Errors returned from server side */,
  errorKey: null as unknown as string,
};

export const loadCharityCases = createAsyncThunk(
  'charityCase/getCharityCases',
  async () => axios.get<any>(`http://localhost:8080/charity-case`),
  {
    serializeError: serializeAxiosError,
  }
);

export const getCharityCases: () => AppThunk = () => async (dispatch: any) => {
  await dispatch(loadCharityCases());
};

export const CharityCaseSlice = createSlice({
  name: 'charityCase',
  initialState: initialState as CharityCaseState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCharityCases.pending, (state) => {
                return {
          ...state,
          charityCases: [],
          loading: true,
        };
      })

      .addCase(loadCharityCases.fulfilled, (state, action) => {
                return {
          ...state,
          loading: false,
          success: true,
          charityCases: action.payload.data,
        };
      })
      .addCase(loadCharityCases.rejected, (state, action) => {
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
