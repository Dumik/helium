import { combineReducers } from 'redux';
import populationReducer from './populationReducer';

const rootReducer = combineReducers({
  population: populationReducer,
});

export default rootReducer;
