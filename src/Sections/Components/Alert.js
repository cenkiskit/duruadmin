import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators, Selectors } from '../Redux/InitialRedux'

export default function Alert() {
    const deleteAlert = useSelector(Selectors.deleteAlert);
    const dispatch = useDispatch();

    return !deleteAlert ? null : (
        <div style={{
            backgroundColor: 'rgba(255,255,255,0.5)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
        }}>
            <div style={{
                backgroundColor: 'white',


                boxShadow: '0px 0px 14px -1px rgba(224, 224, 224, 1)',
                borderRadius: 20,
                alignItems: 'center',
                display: 'flex',
                padding: '40px 50px 40px 50px',
                flexDirection: 'column'
            }}>
                <div style={{
                    fontSize: 20
                }}>
                    {deleteAlert?.title} adlı ürünü silmek istiyor musunuz?
                </div>
                <div style={{
                    display: 'flex',
                    marginTop: 20
                }}>
                    <button
                        onClick={() => dispatch(ActionCreators.deleteProduct(deleteAlert))}
                        style={{
                            width: 100,
                            height: 80,
                            borderRadius: 20,
                            backgroundColor: 'rgb(59, 183, 126)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                            borderWidth: 0
                        }}>
                        EVET

                    </button>
                    <button
                        onClick={() => dispatch(ActionCreators.setDeleteAlert(null))}
                        style={{
                            width: 100,
                            height: 80,
                            marginLeft: 20,
                            borderRadius: 20,
                            backgroundColor: 'red',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                            borderWidth: 0
                        }}>
                        HAYIR
                    </button>
                </div>
            </div>

            {/* <Watch
                height="100"
                width="100"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            /> */}
        </div>
    )
}
