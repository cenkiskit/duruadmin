import React from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'

export default function ListTopBar({ _setPage, pageIndex, _setSearchData }) {
    return (
        <div style={{
            // backgroundColor: 'red',
            width: '100%',
            height: 50,
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }}>
            {
                _setSearchData ?
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        position: 'relative'
                    }}>
                        <input
                            onKeyDown={_setSearchData}
                            style={{
                                width: '100%',
                                height: 40,
                                border: '1px solid green',
                                borderRadius: 20,
                                paddingLeft: 20,
                                paddingRight: 40
                            }} type={'text'}
                            placeholder='Ürün adı giriniz...' >
                        </input>
                        <button style={{
                            position: 'absolute',
                            right: 5,
                            borderWidth: 0,
                            backgroundColor: 'transparent',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <BiSearchAlt style={{
                                width: 25,
                                height: 25,

                            }} />
                        </button>
                    </div>
                    :
                    null
            }
            <button
                onClick={() => _setPage('-')}
                style={{
                    width: 50,
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 0,
                    backgroundColor: 'white'
                }}>
                <AiOutlineDoubleLeft style={{
                    width: 25,
                    height: 25
                }} />
            </button>
            <input
                onKeyDown={_setPage}
                style={{
                    width: 50,
                    height: 30,
                    textAlign: 'center',
                    border: '1px solid green',
                }} type={'text'}
                placeholder={pageIndex + 1} />
            <button
                onClick={() => _setPage('+')}
                style={{
                    width: 50,
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 0,
                    backgroundColor: 'white'
                }}>
                <AiOutlineDoubleRight style={{
                    width: 25,
                    height: 25
                }} />
            </button>
        </div>
    )
}
