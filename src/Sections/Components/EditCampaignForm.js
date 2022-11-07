import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { ChromePicker, SketchPicker } from 'react-color';

export default function EditCampaignForm(props) {

    const {
        setTitle,
        setDescription,
        setColor,
        title,
        description,
        color,
        order,
        setOrder
    } = props;

    const _setTitle = (e) => {
        const value = e.nativeEvent.target.value;
        setTitle(value)
    }

    const _setDescription = (e) => {
        const value = e.nativeEvent.target.value;
        setDescription(value)
    }

    const _setOrder = (e) => {
        const value = e.nativeEvent.target.value;
        setOrder(value)
    }

    return (
        <Form style={{
        }}>
            <Form.Group
                className="mb-3" controlId="formBasicEmail">
                <Form.Label>Kampanya Adı</Form.Label>
                <Form.Control
                    value={description}
                    onChange={_setDescription} placeholder="Açıklama" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Kampanya Açıklaması</Form.Label>
                <Form.Control
                    value={title}
                    onChange={_setTitle} placeholder="Başlık" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Gösterim Sırası</Form.Label>
                <Form.Control
                    value={order || -1}
                    onChange={_setOrder} placeholder="Açıklama" />
            </Form.Group>
            <Form.Label>Kampanya Rengi</Form.Label>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <ChromePicker
                    color={color}
                    onChange={(color) => setColor(color?.hex)}
                />
                <div style={{
                    flex: 1,
                    marginLeft: 10,
                    backgroundColor: color
                }}>

                </div>
            </div>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}


        </Form>
    );
}