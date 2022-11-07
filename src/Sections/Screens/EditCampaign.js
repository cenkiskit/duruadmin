/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import EditCampaignForm from '../Components/EditCampaignForm'
import ImageUploadArea from '../Components/ImageUploadArea'
import { campaignObj } from '../Entity/Models'
import { ActionCreators as InitialActions, Selectors as InitialSelectors } from '../Redux/InitialRedux'

export default function EditCampaign() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const added = useSelector(InitialSelectors.added)

    const { state } = useLocation();
    const { data } = state;

    const [title, setTitle] = useState(data?.title || '');
    const [imageList, setImageList] = useState(data?.imageList || []);
    const [color, setColor] = useState(data?.color || 'black');
    const [description, setDescription] = useState(data?.description || '');
    const [order, setOrder] = useState(data?.order || -1);

    const _onPressSave = () => {
        const body = campaignObj(
            data?.id,
            title,
            description,
            color,
            imageList,
            data?.isActive,
            order
        )

        dispatch(InitialActions.updateCampaign({
            data: body,
        }))
    }

    useEffect(() => {
        if (added) {
            dispatch(InitialActions.setAdded(false))
            setImageList([]);
            setTitle('');
            setDescription('');
            navigate('/kampanyalar');
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

                    <EditCampaignForm
                        color={color}
                        title={title}
                        description={description}
                        order={order}
                        setOrder={setOrder}
                        setColor={setColor}
                        setTitle={setTitle}
                        setDescription={setDescription} />

                    <Form.Label style={{ marginTop: 20 }}>Kampanya Fotoğrafı</Form.Label>
                    <ImageUploadArea
                        onlyOne
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
                            Kampanya Güncelle
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
