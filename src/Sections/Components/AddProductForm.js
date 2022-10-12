import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import ImageUploadArea from './ImageUploadArea';

export default function AddProductForm() {

    return (
        <Form style={{
        }}>
            <Form.Group
                className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ürün Adı</Form.Label>
                <Form.Control type="email" placeholder="Başlık" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ürün Açıklaması</Form.Label>
                <Form.Control as='textarea' placeholder="Açıklama" />
            </Form.Group>

            <Form.Label>Fiyat</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
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