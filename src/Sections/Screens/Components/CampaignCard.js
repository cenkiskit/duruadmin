import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { campaignObj } from '../../Entity/Models'
import { ActionCreators } from '../../Redux/InitialRedux'
import ProductSwitch from './ProductSwitch'
import { ActionCreators as InitialActions, Selectors as InitialSelectors } from '../../Redux/InitialRedux'
import { VscCheck, VscClose } from 'react-icons/vsc'
import { BiDetail } from 'react-icons/bi'
import { ActionCreators as OrderActions } from '../../Redux/OrderRedux'
import OrderDetails from './OrderDetails'

export default function CampaignCard({ index, value }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const _changeState = () => {
        const body = campaignObj(
            value?.id,
            value?.title,
            value?.description,
            value?.color,
            value?.imageList || [],
            !value?.isActive,
            value?.order
        )

        dispatch(InitialActions.updateCampaign({
            data: body,
        }))
    }

    const _onClickEdit = () => {
        navigate(`/kampanya-duzenle/${value?.id}`, {
            state: {
                data: value
            }
        })
    }

    return (
        <>
            <div style={{

                minHeight: 50,
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
                    width: '25%',
                    display: 'flex',
                    paddingLeft: 10,
                    flexWrap: 'wrap'
                }}>{value?.description}</div>
                <div style={{
                    width: '35%',
                    flexWrap: 'wrap',
                    paddingLeft: 10
                }}>{value?.title || '-'}
                </div>
                <div style={{
                    width: '10%',
                    flexWrap: 'wrap',
                    paddingLeft: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: 40,
                        height: 20,
                        backgroundColor: value?.color || 'white',
                    }}>

                    </div>
                </div>
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
                        <BiDetail style={{
                            width: 30,
                            height: 30,
                            color: 'rgb(59, 183, 126)',
                        }} />
                    </a>
                    <ProductSwitch state={value?.isActive} changeState={_changeState} />
                </div>

            </div>
        </>
    )
}
