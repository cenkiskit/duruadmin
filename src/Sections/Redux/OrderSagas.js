import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore/lite';
import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { db } from '../../firebase';
import { ActionCreators as OrderActions, Selectors as OrderSelectors, Types as OrderTypes } from './OrderRedux';
import { ActionCreators as InitialActions, } from './InitialRedux';

function* watcherGetOrders() {
    yield takeEvery(OrderTypes.GET_ORDERS, workerGetOrders);
}

function* watcherUpdateOrder() {
    yield takeEvery(OrderTypes.UPDATE_ORDER, workerUpdateOrder);
}

function* watcherDeleteOrder() {
    yield takeEvery(OrderTypes.DELETE_ORDER, workerDeleteOrder);
}


function* workerGetOrders() {
    try {
        yield put(OrderActions.setLoading(true))
        const orderList = yield call(workerGetOrderList)
        yield put(OrderActions.setOrders(orderList));

    } catch (error) {
        yield put(OrderActions.setLoading(false))
        console.log('Order error:', error);
    }
}

function* workerGetOrderList() {
    const orderCollection = collection(db, 'orders');
    const orderSnapshot = yield getDocs(orderCollection);
    const orderList = orderSnapshot.docs.map(doc => {
        const order = doc.data();
        order.fbId = doc.id;
        return order;
    });
    return orderList;
}

function* workerUpdateOrder(action) {
    try {
        yield put(InitialActions.setLoading(true))
        const data = action.payload;

        const orderList = yield select(OrderSelectors.orderList)

        const currentOrder = yield doc(db, 'orders', data?.fbId);
        yield updateDoc(currentOrder, JSON.parse(JSON.stringify(data)));

        const newList = orderList.slice();

        const item = newList.find(x => x.fbId === data?.fbId);
        const index = newList.indexOf(item);
        newList[index] = data

        yield put(OrderActions.setOrders(newList))
        yield put(InitialActions.setLoading(false))

    } catch (error) {
        yield put(InitialActions.setLoading(false))
        console.log('Update error:', error);

    }
}

function* workerDeleteOrder(action) {
    try {
        yield put(OrderActions.setLoading(true))

        const fbId = action.payload.fbId;

        const currentProduct = yield doc(db, 'products', fbId);
        yield deleteDoc(currentProduct);

        const productList = yield select(OrderSelectors.productList);
        const newList = productList.slice();
        const item = newList.find(x => x.fbId === fbId);
        const index = newList.indexOf(item);
        newList.splice(index, 1);

        yield put(OrderActions.setProductList(newList));
        yield put(OrderActions.setDeleteAlert(null));
        yield put(OrderActions.setLoading(false));
    } catch (error) {
        yield put(OrderActions.setLoading(false));
        console.log('Delete error:', error);
    }
}

export const Sagas = [
    fork(watcherGetOrders),
    fork(watcherUpdateOrder),
    fork(watcherDeleteOrder),
];
