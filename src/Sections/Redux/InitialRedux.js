export const NS = 'initial';

const INITIAL_STATE = {
    initial: true,
    loading: false,
    added: false,
    productList: [],
    categoryList: [],
    deleteAlert: null,
    campaignList: []
};

export const Types = {
    FETCH_INITIAL: NS + '/fetch-initial',
    SET_PRODUCT_LIST: NS + '/set-product-list',
    SET_CATEGORY_LIST: NS + '/set-category-list',
    ADD_PRODUCT: NS + '/add-product',
    UPDATE_PRODUCT: NS + '/update-product',
    SET_LOADING: NS + '/set-loading',
    SET_ADDED: NS + '/set-addded',
    SET_DELETE_ALERT: NS + '/set-delete-alert',
    DELETE_PRODUCT: NS + '/delete-product',
    SET_CAMPAIGN_LIST: NS + '/set-campaign-list',
    UPDATE_CAMPAIGN: NS + '/update-campaign'
};

export const Selectors = {
    initial: state => state[NS].initial,
    loading: state => state[NS].loading,
    productList: state => state[NS].productList,
    categoryList: state => state[NS].categoryList,
    added: state => state[NS].added,
    deleteAlert: state => state[NS].deleteAlert,
    campaignList: state => state[NS].campaignList,
};

export const ActionCreators = {
    fetchInitial: () => ({
        type: Types.FETCH_INITIAL,
    }),

    addProduct: data => ({
        type: Types.ADD_PRODUCT,
        payload: data,
    }),
    updateProduct: data => ({
        type: Types.UPDATE_PRODUCT,
        payload: data,
    }),
    setLoading: data => ({
        type: Types.SET_LOADING,
        payload: data,
    }),
    setCategoryList: data => ({
        type: Types.SET_CATEGORY_LIST,
        payload: data,
    }),
    setProductList: data => ({
        type: Types.SET_PRODUCT_LIST,
        payload: data,
    }),
    setAdded: data => ({
        type: Types.SET_ADDED,
        payload: data,
    }),
    setDeleteAlert: data => ({
        type: Types.SET_DELETE_ALERT,
        payload: data,
    }),
    deleteProduct: data => ({
        type: Types.DELETE_PRODUCT,
        payload: data,
    }),
    setCampaignList: data => ({
        type: Types.SET_CAMPAIGN_LIST,
        payload: data,
    }),
    updateCampaign: data => ({
        type: Types.UPDATE_CAMPAIGN,
        payload: data,
    }),
};

export const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FETCH_INITIAL:
            return {
                ...state,
            };
        case Types.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case Types.SET_CAMPAIGN_LIST:
            return {
                ...state,
                campaignList: action.payload
            };
        case Types.SET_CATEGORY_LIST:
            return {
                ...state,
                categoryList: action.payload
            };
        case Types.SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload
            };
        case Types.SET_ADDED:
            return {
                ...state,
                added: action.payload
            };
        case Types.SET_DELETE_ALERT:
            return {
                ...state,
                deleteAlert: action.payload
            };
        default:
            return state;
    }
};
