import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ActionCreators } from '../../Redux/InitialRedux'

export default function ProductCard({ index, value }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log('Value:', value)

    const _onClickEdit = () => {
        console.log('geliyor mu')
        navigate(`/urun-duzenle/${value?.id}`, {
            state: {
                data: value
            }
        })
    }

    const _onClickDelete = () => {
        dispatch(ActionCreators.setDeleteAlert(value))
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
                justifyContent: 'center'
            }}>
                <a
                    onClick={_onClickEdit}
                    style={{
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
                        width: 40,
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid transparent',
                        marginLeft: 10
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
