/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export default function Header() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        }}>
            <a onClick={() => { }} style={{
                backgroundColor: '#3bb77e',
                width: 200,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                color: 'white'
            }}>
                <span>Ürün Oluştur</span>
            </a>

            <a style={{
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
            </a>

            <a style={{
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
            </a>
        </div>
    )
}
