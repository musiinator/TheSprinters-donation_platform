import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_API_URL } from '@/src/constants/server.constants';
import { serializeAxiosError } from '@/src/utils/reducer.util';
import { AppThunk } from '@/src/hooks/general.hook';
import { Donation } from '@/src/interfaces/donation.interface';

interface InitialState {
  loading: null | undefined | boolean;
  success: null | undefined | boolean;
  error: null | undefined | boolean /** Errors returned from server side */;
  donation: Donation;
  errorMessage: null | undefined | string /** Errors returned from server side */;
  errorKey: null | undefined | string;
}

export type CharityCaseState = Readonly<typeof initialState>;

export const initialState: InitialState = {
  loading: false,
  success: false,
  error: false /** Errors returned from server side */,
  donation: null as unknown as Donation,
  errorMessage: null as unknown as string /** Errors returned from server side */,
  errorKey: null as unknown as string,
};

export const donate = createAsyncThunk(
    'charityCase/donate',
    async (donation: Donation) => 
        axios.post<any>(`${USER_API_URL}/donate`, donation),
    {
        serializeError: serializeAxiosError,
    }
);

export const donateNow: (data: Donation) => AppThunk = (data) => async (dispatch) => {
  await dispatch(donate(data));
};

export const DonationSlice = createSlice({
  name: 'donation',
  initialState: initialState as CharityCaseState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(donate.pending, (state) => {
                return {
          ...state,
          donation: null as unknown as Donation,
          loading: true,
        };
      })

      .addCase(donate.fulfilled, (state, action) => {
                return {
          ...state,
          loading: false,
          success: true,
          donation: action.payload.data,
        };
      })
      .addCase(donate.rejected, (state, action) => {
                return {
          ...state,
          loading: false,
          error: true,
          errorMessage: action.error.message,
        };
      });
  },
});

export default DonationSlice.reducer;
