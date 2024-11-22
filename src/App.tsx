import React, { useEffect } from 'react';
import HorizontalMenu from './components/horizontalmenu';
import { Routes, Route, Link } from 'react-router-dom';
import Catalog from './components/catalog';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import SignInUp from './components/sign-in-up';
import Basket from './components/basket';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';



function App() {

  const dispatch = useDispatch<any>();





  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  
 
  return (
    <>
      <HorizontalMenu />
      
      
      <Layout>
      <Content style={{ padding: '20px' }}> 
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<SignInUp />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </Content>
    </Layout>
    </>
  );
}

export default App;
