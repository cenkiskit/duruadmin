import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore/lite';
import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { db } from '../../firebase';
import { ActionCreators as OrderActions, Selectors as OrderSelectors, Types as OrderTypes } from './OrderRedux';

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
        console.log('GETORDERS')
        yield put(OrderActions.setLoading(true))
        const orderList = yield call(workerGetOrderList)
        console.log('Orderlist:', orderList)
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
        yield put(OrderActions.setLoading(true))

        const data = action.payload.data;
        const fbId = action.payload.fbId;
        const productList = yield select(OrderSelectors.productList)

        const currentProduct = yield doc(db, 'products', fbId);
        yield updateDoc(currentProduct, JSON.parse(JSON.stringify(data)));

        const newList = productList.slice();
        data.fbId = fbId;
        const item = newList.find(x => x.fbId === fbId);
        const index = newList.indexOf(item);
        newList[index] = data

        yield put(OrderActions.setProductList(newList))
        yield put(OrderActions.setAdded(true))
        yield put(OrderActions.setLoading(false))

    } catch (error) {
        yield put(OrderActions.setLoading(false))
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
