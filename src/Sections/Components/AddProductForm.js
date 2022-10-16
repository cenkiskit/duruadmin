import React from 'react'
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';

export default function AddProductForm(props) {

    const {
        setTitle,
        setContent,
        setPrice,
        title,
        content,
        price
    } = props;

    const _setTitle = (e) => {
        const value = e.nativeEvent.target.value;
        setTitle(value)
    }

    const _setContent = (e) => {
        const value = e.nativeEvent.target.value;
        setContent(value)
    }

    const _setPrice = (e) => {
        const value = e.nativeEvent.target.value;
        setPrice(value)
    }

    return (
        <Form style={{
        }}>
            <Form.Group
                className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ürün Adı</Form.Label>
                <Form.Control
                    value={title}
                    onChange={_setTitle} type="email" placeholder="Başlık" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ürün Açıklaması</Form.Label>
                <Form.Control
                    value={content}
                    onChange={_setContent} as='textarea' placeholder="Açıklama" />
            </Form.Group>

            <Form.Label>Kategori</Form.Label>
            <Form.Select aria-label="Kategori Seçiniz">
                <option>Kategori Seçiniz</option>
                <option value="1">Saksılar</option>
                <option value="2">Bitkiler</option>
                <option value="3">Çelenkler</option>
            </Form.Select>

            <Form.Label style={{
                marginTop: 20
            }}>Fiyat</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    value={price}
                    onChange={_setPrice}
                    placeholder="00.00"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Text id="basic-addon2">₺</InputGroup.Text>
            </InputGroup>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}


        </Form>
    );
}