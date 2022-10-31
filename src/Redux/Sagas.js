import { all } from 'redux-saga/effects';
import {Sagas as InitialSagas} from '../Sections/Redux/InitialSagas'
import {Sagas as OrderSagas} from '../Sections/Redux/OrderSagas'

export default function* rootSaga() {
    yield all([
        ...InitialSagas,
        ...OrderSagas,
    ]);
}
