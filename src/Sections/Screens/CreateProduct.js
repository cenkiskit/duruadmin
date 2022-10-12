/* eslint-disable jsx-a11y/anchor-is-valid */
import { addDoc, collection } from 'firebase/firestore/lite'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { db } from '../../firebase'
import AddProductForm from '../Components/AddProductForm'
import Header from '../Components/Header'
import ImageUploadArea from '../Components/ImageUploadArea'
import { product } from '../Entity/Models'

export default function CreateProduct() {

    const [imageList, setImageList] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');

    const _onPressSave = () => {
        const body = {
            imageList: imageList,
            title: title,
            content: content,
            price: price
        }
        console.log('body:', body)
    }

    const addProducts = async () => {

        const newProduct = Object.create(product);
        const docRef = await addDoc(collection(db, "products"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
          });
          console.log("Document written with ID: ", docRef.id);
    }


    return (
        <div>
            <Header />
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

                    <AddProductForm />

                    <Form.Label>Ürün Fotoğrafları</Form.Label>
                    <ImageUploadArea setImageList={setImageList} />
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
