/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <img src={require('../../Assets/duruadmin-logo.png')}
                alt=''
                style={{
                    width: 200,
                    height: 100,
                    left: 0,
                    marginRight: 50
                }} />
            <a
                onClick={() => navigate('/')}
                style={{
                    // backgroundColor: '#3bb77e',
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    color: 'white',
                    boxShadow: '1px 2px 9px rgba(0,0,0,0.1)',

                }}>
                <span style={{
                    color: '#3bb77e',
                    textAlign:'center'
                }}>Ürünleri Listele</span>
            </a>

            <a
                onClick={() => navigate('/yeni-urun')}
                style={{
                    // backgroundColor: '#3bb77e',
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    marginLeft: 5,
                    color: 'white',
                    boxShadow: '1px 2px 9px rgba(0,0,0,0.1)',

                }}>
                <span style={{
                    color: '#3bb77e',
                    textAlign:'center'
                }}>Yeni Ürün Oluştur</span>
            </a>

            {/* <a style={{
                backgroundColor: '#3bb77e',
                width: 200,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                marginLeft: 5,
                color: 'white'

            }}>
                <span>Ürünleri Listele</span>
            </a> */}
        </div>
    )
}
