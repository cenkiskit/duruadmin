import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { productObj } from '../../Entity/Models'
import { ActionCreators } from '../../Redux/InitialRedux'
import ProductSwitch from './ProductSwitch'
import { ActionCreators as InitialActions, Selectors as InitialSelectors } from '../../Redux/InitialRedux'
import { VscCheck, VscClose } from 'react-icons/vsc'
import { BiDetail } from 'react-icons/bi'
import { ActionCreators as OrderActions } from '../../Redux/OrderRedux'
import OrderDetails from './OrderDetails'

export default function OrderCard({ index, value, completed }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [delivered, setDelivered] = useState(value?.completed);
    const _onClickDetails = () => {
        dispatch(OrderActions.setSelectedOrder(value))
    }

    useEffect(() => {
        if (completed !== delivered) {
            setDelivered(completed)
        }
    }, [completed])

    const _getTotalPrice = () => {
        let price = 0
        value.products.map((val) => {
            price += parseInt(val.price);
        })
        return price;
    }

    const _setDeliverType = () => {
        const data = value;
        data.completed = !value?.completed
        dispatch(OrderActions.updateOrder(data))
    }

    return (
        <>
            {/* <OrderDetails isVisible={showDetails} value={value} /> */}

            <div style={{

                height: 50,
                width: '100%',
                marginTop: 20,
                borderRadius: 20,
                boxShadow: '1px 2px 9px #bababa',
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
            }}>
                <div style={{
                    width: '10%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>{index + 1}</div>
                <div style={{
                    width: '15%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>{value?.id}</div>
                <div style={{
                    width: '20%',
                    flexWrap: 'wrap'
                }}>{value?.senderName || '-'}
                </div>
                <div style={{
                    width: '10%',
                    textAlign: 'center'
                }}>{_getTotalPrice() + '₺' || '-'}</div>
                <div style={{
                    width: '15%',
                    textAlign: 'center'
                }}>{value?.date || '-'}</div>
                <div style={{
                    width: '20%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div
                        onClick={_setDeliverType} style={{
                            width: 30,
                            cursor: 'pointer',
                            height: 30,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            boxShadow: '1px 2px 9px rgba(0,0,0,0.1)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {
                            delivered ? <VscCheck style={{
                                width: 25,
                                height: 25,
                                color: 'rgb(59, 183, 126)'
                            }} /> : <VscClose style={{
                                width: 25,
                                height: 25,
                                color: 'red'
                            }} />
                        }
                    </div>
                    {/* <ProductSwitch state={value?.completed} changeState={_changeState} /> */}
                </div>
                <div style={{
                    width: '10%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <a
                        onClick={_onClickDetails}
                        style={{
                            cursor: 'pointer',
                            width: 40,
                            height: 40,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid transparent',
                        }}>
                        <BiDetail style={{
                            width: 30,
                            height: 30,
                            color: 'rgb(59, 183, 126)',
                        }} />
                    </a>
                </div>
            </div>
        </>
    )
}
