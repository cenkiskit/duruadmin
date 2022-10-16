import { combineReducers } from 'redux';
import { NS as InitialNamespace, Reducer as InitialReducer } from '../Sections/Redux/InitialRedux'

export default combineReducers({
    [InitialNamespace]: InitialReducer,
});
