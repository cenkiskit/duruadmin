import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Selectors } from '../Redux/InitialRedux';

export default function AddProductForm(props) {

    const {
        setTitle,
        setContent,
        setPrice,
        setCategory,
        title,
        setCampaignId,
        content,
        price,
        categoryId,
        campaignId,
    } = props;

    const campaignList = useSelector(Selectors.campaignList);

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

    const changeCategory = (e) => {
        const value = e.nativeEvent.target.value;

        if (value !== 'Kategori Seçiniz') {
            setCategory(value.toString());
        } else {
            setCategory('0');
        }
    }

    const changeCampaign = (e) => {
        const value = e.nativeEvent.target.value;

        if (value !== 'Kampanya Seçiniz') {
            setCampaignId(value);
        } else {
            setCampaignId(0);
        }
    }

    const _renderCampaigns = () => {
        return campaignList.map((value, index) => {
            return value?.isActive && <option value={index + 1}>{value?.title}</option>
        })
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
            <Form.Select aria-label="Kategori Seçiniz" value={categoryId || 0}
                onChange={(e) => changeCategory(e)}>
                <option>Kategori Seçiniz</option>
                <option value="1">Saksı</option>
                <option value="2">Bitki</option>
                <option value="3">Çelenk</option>
                <option value="4">Teraryum</option>
                <option value="5">Buket</option>
                <option value="6">Aranjman</option>
            </Form.Select>
            <div style={{ marginTop: 20 }} />
            <Form.Label>Kampanya</Form.Label>
            <Form.Select aria-label="Kampanya Seçiniz" value={campaignId || 0}
                onChange={(e) => changeCampaign(e)}>
                <option>Kampanya Seçiniz</option>
                {_renderCampaigns()}
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