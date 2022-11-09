import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore/lite';
import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { auth, db } from '../../firebase';
import { ActionCreators as InitialActions, Selectors as InitialSelectors, Types as InitialTypes } from './InitialRedux';
import { v4 as uuidv4 } from 'uuid';
import { signInWithEmailAndPassword } from 'firebase/auth';


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

function* watcherUpdateCampaign() {
    yield takeEvery(InitialTypes.UPDATE_CAMPAIGN, workerUpdateCampaign);
}

function* watcherAuth() {
    yield takeEvery(InitialTypes.AUTH, workerAuth);
}

function* workerAuth(action) {
    try {
        if (action) {
            const email = action.payload?.email;
            const password = action.payload?.password;
            yield signInWithEmailAndPassword(auth, email, password);

            yield put(InitialActions.setConnected(true))
        }
    } catch (error) {
        console.log('Auth error:', error);
    }
}

function* workerInitial() {
    try {
        const list = yield select(InitialSelectors.productList);
        const loading = yield select(InitialSelectors.loading)
        yield call(workerAuth)

        if (list.length === 0 && !loading) {
            yield put(InitialActions.setLoading(true))
            const productList = yield call(workerGetProductList)
            yield put(InitialActions.setProductList(productList));
            yield put(InitialActions.setLoading(false))
        }
    } catch (error) {
        yield put(InitialActions.setLoading(false))
        console.log('Initial error:', error);
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
                if (!value?.name) {
                    newImageList.push({
                        data_url: value?.data_url,
                        name: value?.file?.name
                    })
                } else {
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
    let campaigns = [];
    const productList = productSnapshot.docs.map(doc => {
        const data = doc.data();
        data.fbId = doc.id;
        if (!data?.isCampaign) {
            return data;
        } else {
            campaigns.push(data);
            return null;
        }
    });
    campaigns.sort((a, b) => a?.order - b?.order)
    yield put(InitialActions.setCampaignList(campaigns.slice()));
    return productList.filter(x => x);
}

function* workerUpdateCampaign(action) {
    try {
        yield put(InitialActions.setLoading(true))

        const data = action.payload?.data;
        const fbId = action.payload?.fbId;
        const campaignList = yield select(InitialSelectors.campaignList)
        const item = campaignList.find(x => x.id === data?.id)
        const index = campaignList.indexOf(item);

        if (data?.imageList.length > 0) {
            if (!data?.imageList[0]?.name) {
                data.imageList =
                    [
                        {
                            data_url: data.imageList[0].data_url,
                            name: data.imageList[0].file.name
                        }
                    ]
            }
        }

        const currentCampaigns = yield doc(db, 'products', fbId);
        yield updateDoc(currentCampaigns, JSON.parse(JSON.stringify(data)));

        data.fbId = fbId;
        if (index > -1) {
            campaignList[index] = data;
        }

        campaignList.sort((a, b) => a?.order - b?.order)
        yield put(InitialActions.setCampaignList(campaignList.slice()))
        yield put(InitialActions.setAdded(true))
        yield put(InitialActions.setLoading(false))

    } catch (error) {
        yield put(InitialActions.setLoading(false))
        console.log('Update error:', error?.toJSON ? error.toJSON() : JSON.stringify(error));

    }
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
    fork(watcherUpdateCampaign),
    fork(watcherAuth)
];
