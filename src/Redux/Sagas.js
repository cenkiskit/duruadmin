import { all } from 'redux-saga/effects';
import {Sagas as InitialSagas} from '../Sections/Redux/InitialSagas'

export default function* rootSaga() {
    yield all([
        ...InitialSagas,
    ]);
}
