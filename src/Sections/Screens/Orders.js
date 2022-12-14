import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Selectors as OrderSelector, ActionCreators as OrderActions } from '../Redux/OrderRedux'
import OrderCard from './Components/OrderCard';
import ListTopBar from './Components/ListTopBar';
import OrderDetails from './Components/OrderDetails';

export default function Orders() {
    const orderList = useSelector(OrderSelector.orderList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(OrderActions.getOrders());
    }, [])



    const [pageIndex, setPageIndex] = useState(0);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        if (orderList.length > 0) {
            const data = orderList.sort((a, b) => b.id - a.id)
            setCurrentData(data)
        }
    }, [orderList])

    const _renderOrders = () => {
        if (currentData.length > 10) {
            const rendered = currentData.slice(0 + (pageIndex * 10), 10 + (pageIndex * 10))
            return rendered.map((value, index) => {
                return <OrderCard completed={value?.completed} index={index + 10 * pageIndex} value={value} />;
            })
        } else {
            return currentData.map((value, index) => {
                return <OrderCard completed={value?.completed} index={index} value={value} />;
            })
        }

    }

    const _setPage = (value) => {
        const maxPage = Math.ceil(orderList.length / 10);
        if (value === '+') {
            if (pageIndex < maxPage - 1) {
                setPageIndex(pageIndex + 1)
            }
        } else if (value === '-') {
            if (pageIndex > 0) {
                setPageIndex(pageIndex - 1)
            }
        } else {
            if (value.nativeEvent.code === 'Enter') {
                const userPage = value.nativeEvent.target.value;
                if (userPage && userPage > 0 && userPage <= maxPage) {
                    setPageIndex(userPage - 1)
                } else {
                    value.nativeEvent.target.value = ''
                }
            }
        }
    }

    const _setSearchData = (e) => {
        if (e.nativeEvent.code === 'Enter') {
            setPageIndex(0);
            const val = e.nativeEvent.target.value;
            if (val !== '') {
                const newData = orderList.filter(x => x.title.includes(val));
                setCurrentData(newData);
            } else {
                setCurrentData(orderList);
            }
        }
    };

    const _orderDetails = (data) => {

    }

    return (
        <div style={{
            flex: 1,
            justifyContent: 'center',
            display: 'flex',
            marginTop: 50,
            marginBottom: 50,
            position: 'relative',
            alignItems: 'center'
        }}>
            {/* <OrderDetails /> */}
            <div style={{
                width: '80%'
            }}>
                <div style={{
                    width: '100%',
                    height: 100,
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '1px 2px 9px #3bb77e',
                    backgroundColor: '#3bb77e',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>
                    <div style={{
                        width: '10%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{"S??ra"}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        width: '15%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{"Sipari?? No."}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        textAlign: 'center',
                        width: '20%',
                    }}>{'G??nderen Ad??'}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        width: '10%',
                        textAlign: 'center'
                    }}>{'Tutar'}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        width: '15%',
                        textAlign: 'center'
                    }}>{'Tarih'}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{'Teslimat Durumu'}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        width: '10%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{'Detay'}</div>
                </div>

                {/* <ListTopBar
                    _setSearchData={_setSearchData}
                    _setPage={_setPage}
                    pageIndex={pageIndex} /> */}

                {_renderOrders()}

                {/* <ListTopBar
                    _setPage={_setPage}
                    pageIndex={pageIndex} /> */}

            </div>
        </div>
    )
}
