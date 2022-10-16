import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Selectors as InitialSelector, ActionCreators as InitialActions } from '../Redux/InitialRedux'
import ProductCard from './Components/ProductCard';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import ListTopBar from './Components/ListTopBar';

export default function ListProducts() {
    const productList = useSelector(InitialSelector.productList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('Val:', productList)

    useEffect(() => {
        dispatch(InitialActions.fetchInitial());
    }, [])

    const [pageIndex, setPageIndex] = useState(0);
    const [currentData, setCurrentData] = useState(productList);

    useEffect(() => {
        if (productList) {
            setCurrentData(productList)
        }
    }, [productList]);

    const _renderProducts = () => {
        console.log('Curr:', currentData)
        if (currentData.length > 10) {
            const rendered = currentData.slice(0 + (pageIndex * 10), 10 + (pageIndex * 10))
            return rendered.map((value, index) => {
                return <ProductCard index={index + 10 * pageIndex} value={value} />;
            })
        } else {
            return currentData.map((value, index) => {
                return <ProductCard index={index} value={value} />;
            })
        }

    }

    const _setPage = (value) => {
        const maxPage = Math.ceil(productList.length / 10);
        console.log('Maxpae:', maxPage)
        if (value === '+') {
            if (pageIndex < maxPage - 1) {
                setPageIndex(pageIndex + 1)
            }
        } else if (value === '-') {
            if (pageIndex > 0) {
                setPageIndex(pageIndex - 1)
            }
        } else {
            if (value.nativeEvent.code === 'Enter') {
                const userPage = value.nativeEvent.target.value;
                if (userPage && userPage > 0 && userPage <= maxPage) {
                    setPageIndex(userPage - 1)
                } else {
                    value.nativeEvent.target.value = ''
                }
            }
        }
    }

    const _setSearchData = (e) => {
        if (e.nativeEvent.code === 'Enter') {
            setPageIndex(0);
            const val = e.nativeEvent.target.value;
            if (val !== '') {
                const newData = productList.filter(x => x.title.includes(val));
                console.log('ValE:', newData)
                setCurrentData(newData);
            } else {
                setCurrentData(productList);
            }
        }
    };

    return (
        <div style={{
            flex: 1,
            justifyContent: 'center',
            display: 'flex',
            marginTop: 50,
            marginBottom: 50
        }}>
            <div style={{
                width: '80%'
            }}>
                <div style={{
                    width: '100%',
                    height: 100,
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '1px 2px 9px #3bb77e',
                    backgroundColor: '#3bb77e',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>
                    <div style={{
                        width: '10%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{"Sıra"}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        marginLeft: 20,
                        width: '50%',
                    }}>{'Ürün Adı'}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{'Fiyat'}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{'Aksiyon'}</div>
                </div>

                <ListTopBar
                    _setSearchData={_setSearchData}
                    _setPage={_setPage}
                    pageIndex={pageIndex} />

                {_renderProducts()}

                <ListTopBar
                    _setPage={_setPage}
                    pageIndex={pageIndex} />

            </div>
        </div>
    )
}
