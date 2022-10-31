import { combineReducers } from 'redux';
import { NS as InitialNamespace, Reducer as InitialReducer } from '../Sections/Redux/InitialRedux'
import { NS as OrderNamespace, Reducer as OrderReducer } from '../Sections/Redux/OrderRedux'

export default combineReducers({
    [InitialNamespace]: InitialReducer,
    [OrderNamespace]: OrderReducer,
});
