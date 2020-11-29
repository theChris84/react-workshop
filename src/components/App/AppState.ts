import { combineReducers } from '@reduxjs/toolkit';
import climateReducer, { ClimateState } from '../Climate/ClimateReducer';
import pageReducer, { PageDataState } from './PageStateReducer';

export type AppState = {
  climate: ClimateState;
  page: PageDataState;
};

export default combineReducers<AppState>({
  climate: climateReducer,
  page: pageReducer,
});
