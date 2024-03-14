import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_API_URL } from '@/src/constants/server.constants';
import { serializeAxiosError } from '@/src/utils/reducer.util';
import { AppThunk } from '@/src/hooks/general.hook';
import useStorage from '@/src/hooks/use-storage.hook';
import { StorageType } from '@/src/enums/StorageType';
import { CharityCase } from '@/src/interfaces/charity-case.interfaces';
import { Donation } from '@/src/interfaces/donation.interface';

interface InitialState {
  loading: null | undefined | boolean;
  success: null | undefined | boolean;
  error: null | undefined | boolean /** Errors returned from server side */;
  donations: Donation[];
  errorMessage: null | undefined | string /** Errors returned from server side */;
  errorKey: null | undefined | string;
}

export type DonationState = Readonly<typeof initialState>;

export const initialState: InitialState = {
  loading: false,
  success: false,
  error: false /** Errors returned from server side */,
  donations: [] as Donation[],
  errorMessage: null as unknown as string /** Errors returned from server side */,
  errorKey: null as unknown as string,
};

export const loadDonationsByUsername = createAsyncThunk(
  'donations/getDonationsByUsername',
  async (username: string) => axios.get<any>(`http://localhost:8080/donation/${username}`),
  {
    serializeError: serializeAxiosError,
  }
);

export const getDonationsByUsername: (username: string) => AppThunk =
  (username) => async (dispatch: any) => {
    await dispatch(loadDonationsByUsername(username));
  };

export const DonationsSlice = createSlice({
  name: 'donations',
  initialState: initialState as DonationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDonationsByUsername.pending, (state) => {
        return {
          ...state,
          donations: [],
          loading: true,
        };
      })

      .addCase(loadDonationsByUsername.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          success: true,
          donations: action.payload.data,
        };
      })
      .addCase(loadDonationsByUsername.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
          errorMessage: action.error.message,
        };
      });
  },
});

export default DonationsSlice.reducer;
