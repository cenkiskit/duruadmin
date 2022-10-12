/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import './App.css';
import { db, firebaseConfig } from './firebase';
import CreateProduct from './Sections/Screens/CreateProduct';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

function App() {

  useEffect(() => {
    // const app = initializeApp(firebaseConfig);
    // getCategories();
    // getProducts();
  }, [])

  const getCategories = async () => {
    const categoryCollection = collection(db, 'categories');
    const categorySnapshot = await getDocs(categoryCollection);
    
    const categoryList = categorySnapshot.docs.map(doc => doc.data());
    console.log('Categories:', categoryList)
    return categoryList;
  }


  const getProducts = async () => {
    const productCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productCollection);
    
    const productList = productSnapshot.docs.map(doc => doc.data());
    console.log('Categories:', productList)
    return productList;
  }

  return (
    <CreateProduct />
  )
}


export default App;
