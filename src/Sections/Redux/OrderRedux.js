export const NS = 'order';

const INITIAL_STATE = {
    orderList: [],
    loading: false
};

export const Types = {
    GET_ORDERS: NS + '/get-orders',
    SET_ORDERS: NS + '/set-orders',
    UPDATE_ORDER: NS + '/update-order',
    DELETE_ORDER: NS + '/delete-order',
    SET_LOADING: NS + '/set-loading',
};

export const Selectors = {
    loading: state => state[NS].loading,
    orderList: state => state[NS].orderList,
};

export const ActionCreators = {
    getOrders: () => ({
        type: Types.GET_ORDERS,
    }),
    setOrders: (data) => ({
        type: Types.SET_ORDERS,
        payload: data,
    }),
    updateOrder: data => ({
        type: Types.UPDATE_ORDER,
        payload: data,
    }),
    deleteOrder: data => ({
        type: Types.DELETE_ORDER,
        payload: data,
    }),
    setLoading: data => ({
        type: Types.SET_LOADING,
        payload: data,
    }),
};

export const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.SET_ORDERS:
            return {
                ...state,
                orderList: action.payload
            };
        case Types.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};
