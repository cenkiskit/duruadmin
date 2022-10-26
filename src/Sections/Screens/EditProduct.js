/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom'
import AddProductForm from '../Components/AddProductForm'
import ImageUploadArea from '../Components/ImageUploadArea'
import { productObj } from '../Entity/Models'
import { ActionCreators as InitialActions, Selectors as InitialSelectors } from '../Redux/InitialRedux'

export default function EditProduct() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const added = useSelector(InitialSelectors.added)
    const productList = useSelector(InitialSelectors.productList)

    const { state } = useLocation();
    const { data } = state;

    const [title, setTitle] = useState(data?.title);
    const [content, setContent] = useState(data?.content);
    const [categoryId, setCategory] = useState(data?.categoryId || 0);
    const [price, setPrice] = useState(data?.price);
    const [imageList, setImageList] = useState(data?.imageList || []);

    useEffect(() => {
        dispatch(InitialActions.fetchInitial());
    }, [])

    const _onPressSave = () => {
        const body = productObj(
            data?.id,
            title,
            content,
            price,
            imageList,
            categoryId,
            data?.isActive
        )
        
        dispatch(InitialActions.updateProduct({
            data: body,
            fbId: data?.fbId
        }))
    }

    useEffect(() => {
        if (added) {
            dispatch(InitialActions.setAdded(false))
            setImageList([]);
            setTitle('');
            setContent('');
            setPrice('');
            setCategory('');
            navigate('/');
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
                        categoryId={categoryId}
                        price={price}
                        setTitle={setTitle}
                        setContent={setContent}
                        setCategory={setCategory}
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
                            Ürün Güncelle
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
