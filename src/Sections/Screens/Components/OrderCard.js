import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { productObj } from '../../Entity/Models'
import { ActionCreators } from '../../Redux/InitialRedux'
import ProductSwitch from './ProductSwitch'
import { ActionCreators as InitialActions, Selectors as InitialSelectors } from '../../Redux/InitialRedux'

export default function OrderCard({ index, value }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const _onClickDelete = () => {
        // dispatch(ActionCreators.setDeleteAlert(value))
    }

    const _changeState = () => {
        // const body = productObj(
        //     value?.id,
        //     value?.title,
        //     value?.content,
        //     value?.price,
        //     value?.imageList,
        //     value?.categoryId,
        //     !value?.isActive
        // )

        // dispatch(InitialActions.updateProduct({
        //     data: body,
        //     fbId: value?.fbId
        // }))
    }

    const _getTotalPrice = () => {
        let price = 0
        value.products.map((val) => {
            price += parseInt(val.price);
        })
        return price;
    }

    return (
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
                width: '20%',
                display: 'flex',
                justifyContent: 'center'
            }}>{value?.id}</div>
            <div style={{
                width: '35%',
            }}>{value?.senderName || '-'}
            </div>
            <div style={{
                width: '10%',
                textAlign: 'center'
            }}>{_getTotalPrice() + '₺' || '-'}</div>
            <div style={{
                width: '20%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ProductSwitch state={value?.completed} changeState={_changeState} />
            </div>
            <div style={{
                width: '10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <a
                    onClick={_onClickDelete}
                    style={{
                        cursor: 'pointer',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid transparent',
                    }}>
                    <MdDelete style={{
                        width: 30,
                        height: 30,
                        color: 'red',
                    }} />
                </a>
            </div>
        </div>
    )
}
