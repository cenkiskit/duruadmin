import React from 'react'
import { VscCheck, VscClose } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators, Selectors } from '../../Redux/OrderRedux'

export default function OrderDetails() {
    const selectedOrder = useSelector(Selectors.selectedOrder);
    const dispatch = useDispatch();

    const _onClose = () => {
        dispatch(ActionCreators.setSelectedOrder(null))
    }
    
    const _renderOrderContent = () => {
        return selectedOrder.products.map(value => {
            return <li>{value?.title}</li>
        })
    }

    return !selectedOrder ? null : (
        <div onClick={() => console.log('clicked')} style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 10,
        }}>
            <div style={{
                position: 'relative',
                width: 500,
                height: 400
            }}>
                <div onClick={_onClose} style={{
                    position: 'absolute',
                    width: 34,
                    height: 34,
                    zIndex: 51,
                    backgroundColor: 'white',
                    top: -17,
                    right: -17,
                    borderRadius: 34,
                    boxShadow: '1px 2px 9px rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}>
                    <VscClose style={{
                        width: 25,
                        height: 25,
                        color: 'red'
                    }} />
                </div>
            </div>

            <div style={{
                position: 'absolute',
                backgroundColor: 'white',
                width: 500,
                height: 400,
                border: '1px solid green',
                padding: 20,
                zIndex: 50,
                overflowY: 'scroll',
            }}>
                <div style={{
                    textAlign: 'center',
                    fontSize: 20
                }}>{selectedOrder?.id} Numaralı Sipariş</div>

                <div style={{
                    marginTop: 10,

                }}>
                    <span style={{ fontWeight: 'bold' }}>Sipariş Tarihi:</span> {selectedOrder?.date}
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    <span style={{ fontWeight: 'bold' }}>Gönderen:</span> {selectedOrder?.senderName}
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    <span style={{ fontWeight: 'bold' }}>Teslim Edilecek Kişi:</span> {selectedOrder?.receiverName}
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    <span style={{ fontWeight: 'bold' }}>Sipariş Tutarı:</span> 123TL
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    <span style={{ fontWeight: 'bold' }}>Telefon:</span> {selectedOrder?.phone}
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    <span style={{ fontWeight: 'bold' }}>Adres:</span> {selectedOrder?.address}
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    <span style={{ fontWeight: 'bold' }}>Not:</span> {selectedOrder?.note}
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    <span style={{ fontWeight: 'bold' }}>Sipariş İçeriği:</span>
                    <ul>
                        {_renderOrderContent()}
                    </ul>
                </div>
                <div style={{
                    marginTop: 10,
                    display: 'flex'
                }}>
                    <span style={{ fontWeight: 'bold' }}>Teslimat Durumu:</span>
                    <div
                        onClick={() => { }} style={{
                            width: 30,
                            cursor: 'pointer',
                            marginLeft: 10,
                            height: 30,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            boxShadow: '1px 2px 9px rgba(0,0,0,0.1)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {
                            selectedOrder?.completed ? <VscCheck style={{
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
                </div>
            </div>
        </div>
    )
}
