import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Alert from '../Sections/Components/Alert'
import Header from '../Sections/Components/Header'
import LoadingOverlay from '../Sections/Components/LoadingOverlay'
import { Selectors } from '../Sections/Redux/InitialRedux'
import AuthScreen from '../Sections/Screens/AuthScreen'
import CampaignList from '../Sections/Screens/CampaignList'
import OrderDetails from '../Sections/Screens/Components/OrderDetails'
import CreateProduct from '../Sections/Screens/CreateProduct'
import EditCampaign from '../Sections/Screens/EditCampaign'
import EditProduct from '../Sections/Screens/EditProduct'
import ListProducts from '../Sections/Screens/ListProducts'
import Orders from '../Sections/Screens/Orders'

export default function Navigator() {
    const connected = useSelector(Selectors.connected)

    return connected ? (
        <BrowserRouter>
            <LoadingOverlay />
            <OrderDetails />
            <Header />
            <Alert />

            <Routes>
                <Route index element={<ListProducts />} />
                <Route path='yeni-urun' element={<CreateProduct />} />
                <Route path='siparisler' element={<Orders />} />
                <Route path='kampanyalar' element={<CampaignList />} />
                <Route path="urun-duzenle/:productId" element={<EditProduct />} />
                <Route path="kampanya-duzenle/:campaignId" element={<EditCampaign />} />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    ) :
        <BrowserRouter>
            <Routes>
                <Route index element={<AuthScreen />} />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>

}
