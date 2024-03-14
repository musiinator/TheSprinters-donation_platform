import { combineReducers } from 'redux';

import authentication from './authentication/authentication.reducer';
import charityCasesReducer from './charity-case/charity-case.reducer';
import filterCharityCaseReducer from './charity-case/filter-charity-case.reducer';
import donationsReducer from './donation/donation.reducer';

const rootReducer = {
  authentication,
  charityCasesReducer,
  filterCharityCaseReducer,
  donationsReducer,
};

export default combineReducers(rootReducer);
