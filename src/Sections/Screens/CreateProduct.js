/* eslint-disable jsx-a11y/anchor-is-valid */
import { addDoc, collection } from 'firebase/firestore/lite'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import AddProductForm from '../Components/AddProductForm'
import Header from '../Components/Header'
import ImageUploadArea from '../Components/ImageUploadArea'
import { productObj } from '../Entity/Models'
import { ActionCreators as InitialActions, Selectors as InitialSelectors } from '../Redux/InitialRedux'

export default function CreateProduct() {

    const [imageList, setImageList] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const added = useSelector(InitialSelectors.added)
    const productList = useSelector(InitialSelectors.productList)
    console.log('Pro:', productList)

   
    useEffect(() => {
        dispatch(InitialActions.fetchInitial());
    }, [])

    const _onPressSave = () => {
        const body = productObj(
            null,
            title,
            content,
            price,
            imageList,
            1
        )

        dispatch(InitialActions.addProduct(body))
    }

    useEffect(() => {
        if (added) {
            dispatch(InitialActions.setAdded(false))
            setImageList([]);
            setTitle('');
            setContent('');
            setPrice('');
            navigate('/')
        }
    }, [added, dispatch])

    return (
        <div>
            <div style={{
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20
            }}>
                <div style={{
                    border: '1px solid white',
                    padding: 20,
                    borderRadius: 20,
                    width: 420,
                    boxShadow: '0px 0px 14px -1px rgba(224, 224, 224, 0.69)'
                }}>

                    <AddProductForm
                        title={title}
                        content={content}
                        price={price}
                        setTitle={setTitle}
                        setContent={setContent}
                        setPrice={setPrice} />

                    <Form.Label>Ürün Fotoğrafları</Form.Label>
                    <ImageUploadArea
                        images={imageList}
                        setImageList={setImageList} />
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
                        <Button
                            onClick={_onPressSave} variant="primary" type="submit">
                            Ürün Ekle
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
