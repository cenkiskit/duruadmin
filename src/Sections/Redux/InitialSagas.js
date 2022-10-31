import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore/lite';
import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { db } from '../../firebase';
import { ActionCreators as InitialActions, Selectors as InitialSelectors, Types as InitialTypes } from './InitialRedux';
import { v4 as uuidv4 } from 'uuid';


function* watcherInitial() {
    yield takeEvery(InitialTypes.FETCH_INITIAL, workerInitial);
}

function* watcherAddProduct() {
    yield takeEvery(InitialTypes.ADD_PRODUCT, workerAddProduct);
}

function* watcherUpdateProduct() {
    yield takeEvery(InitialTypes.UPDATE_PRODUCT, workerUpdateProduct);
}

function* watcherDeleteProduct() {
    yield takeEvery(InitialTypes.DELETE_PRODUCT, workerDeleteProduct);
}


function* workerInitial() {
    try {
        const list = yield select(InitialSelectors.productList);
        const loading = yield select(InitialSelectors.loading)

        if (list.length === 0 && !loading) {
            yield put(InitialActions.setLoading(true))
            const productList = yield call(workerGetProductList)
            yield put(InitialActions.setProductList(productList));
            yield put(InitialActions.setLoading(false))
        }
    } catch (error) {
        yield put(InitialActions.setLoading(false))
        console.log('Initial error.', error);
    }
}

function* workerAddProduct(action) {
    try {
        yield put(InitialActions.setLoading(true))

        const product = action.payload;
        product.id = uuidv4();

        if (product.imageList.length > 0) {
            let newImageList = [];
            product.imageList.map((value) => {
                newImageList.push({
                    data_url: value?.data_url,
                    name: value?.file?.name
                })
                return null
            })
            product.imageList = newImageList
        }

        const response = yield addDoc(collection(db, "products"), JSON.parse(JSON.stringify(product)));

        const productList = yield select(InitialSelectors.productList);
        const newList = productList.slice();

        product.fbId = response.id;
        newList.push(product);
        yield put(InitialActions.setProductList(newList));

        yield put(InitialActions.setAdded(true))
        yield put(InitialActions.setLoading(false))
    } catch (error) {
        yield put(InitialActions.setLoading(false))
        console.log('Add Product error.', error);
    }
}

function* workerUpdateProduct(action) {
    try {
        yield put(InitialActions.setLoading(true))

        const data = action.payload.data;
        const fbId = action.payload.fbId;
        const productList = yield select(InitialSelectors.productList)

        const currentProduct = yield doc(db, 'products', fbId);

        const newList = productList.slice();
        data.fbId = fbId;

        if (data.imageList.length > 0) {
            let newImageList = [];
            data.imageList.map((value) => {
                if(!value?.name){
                    newImageList.push({
                        data_url: value?.data_url,
                        name: value?.file?.name
                    })
                }else{
                    newImageList.push(value);
                }
                return null
            })
            data.imageList = newImageList
        }

        yield updateDoc(currentProduct, JSON.parse(JSON.stringify(data)));

        const item = newList.find(x => x.fbId === fbId);
        const index = newList.indexOf(item);
        newList[index] = data

        yield put(InitialActions.setProductList(newList))
        yield put(InitialActions.setAdded(true))
        yield put(InitialActions.setLoading(false))

    } catch (error) {
        yield put(InitialActions.setLoading(false))
        console.log('Update error:', error);

    }
}

function* workerGetProductList() {
    const productCollection = collection(db, 'products');
    const productSnapshot = yield getDocs(productCollection);
    const productList = productSnapshot.docs.map(doc => {
        const product = doc.data();
        product.fbId = doc.id;
        return product;
    });
    return productList;
}

function* workerAddCategory() {

}

function* workerGetCategoryList() {
    const categoryCollection = collection(db, 'categories');
    const categorySnapshot = yield getDocs(categoryCollection);
    const categoryList = categorySnapshot.docs.map(doc => doc.data());

    return categoryList;
}

function* workerDeleteProduct(action) {
    try {
        yield put(InitialActions.setLoading(true))

        const fbId = action.payload.fbId;

        const currentProduct = yield doc(db, 'products', fbId);
        yield deleteDoc(currentProduct);

        const productList = yield select(InitialSelectors.productList);
        const newList = productList.slice();
        const item = newList.find(x => x.fbId === fbId);
        const index = newList.indexOf(item);
        newList.splice(index, 1);

        yield put(InitialActions.setProductList(newList));
        yield put(InitialActions.setDeleteAlert(null));
        yield put(InitialActions.setLoading(false));
    } catch (error) {
        yield put(InitialActions.setLoading(false));
        console.log('Delete error:', error);
    }
}



export const Sagas = [
    fork(watcherInitial),
    fork(watcherAddProduct),
    fork(watcherUpdateProduct),
    fork(watcherDeleteProduct),
];
