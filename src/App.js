/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import './App.css';
import { db, firebaseConfig } from './firebase';
import CreateProduct from './Sections/Screens/CreateProduct';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import CreateStore from './Redux/CreateStore';
import { Provider } from 'react-redux';
import LoadingOverlay from './Sections/Components/LoadingOverlay';
import ListProducts from './Sections/Screens/ListProducts';
import Header from './Sections/Components/Header';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import EditProduct from './Sections/Screens/EditProduct';
import Alert from './Sections/Components/Alert';
import Orders from './Sections/Screens/Orders';
import OrderDetails from './Sections/Screens/Components/OrderDetails';
import CampaignList from './Sections/Screens/CampaignList';
import EditCampaign from './Sections/Screens/EditCampaign';

const { store } = CreateStore();

function App() {
  return (
    <Provider store={store}>
      <div style={{
        flex: 1
      }}>
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
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}


export default App;
