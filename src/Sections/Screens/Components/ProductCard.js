import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { productObj } from '../../Entity/Models'
import { ActionCreators } from '../../Redux/InitialRedux'
import ProductSwitch from './ProductSwitch'
import { ActionCreators as InitialActions, Selectors as InitialSelectors } from '../../Redux/InitialRedux'

export default function ProductCard({ index, value }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const _onClickEdit = () => {
        navigate(`/urun-duzenle/${value?.id}`, {
            state: {
                data: value
            }
        })
    }

    const _onClickDelete = () => {
        dispatch(ActionCreators.setDeleteAlert(value))
    }

    const _changeState = () => {
        const body = productObj(
            value?.id,
            value?.title,
            value?.content,
            value?.price,
            value?.imageList,
            value?.categoryId,
            !value?.isActive,
            value?.campaignId
        )

        dispatch(InitialActions.updateProduct({
            data: body,
            fbId: value?.fbId
        }))
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
                marginLeft: 20,
                width: '50%',
            }}>{value?.title || '-'}
            </div>
            <div style={{
                width: '20%',
                display: 'flex',
                justifyContent: 'center'
            }}>{value?.price + '₺' || '-'}</div>
            <div style={{
                width: '20%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <a
                    onClick={_onClickEdit}
                    style={{
                        cursor: 'pointer',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid transparent',

                    }}>
                    <BiEdit style={{
                        width: 30,
                        height: 30,
                        color: 'green',
                    }} />
                </a>
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

                <ProductSwitch state={value?.isActive} changeState={_changeState} />
            </div>
        </div>
    )
}
