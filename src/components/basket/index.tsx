import React from 'react';
import { Layout, Row, Col, Card, Button } from 'antd';
import Product from '../product';
import { useSelector } from 'react-redux';


const Basket = () => {
  const products = useSelector((state: any) => state.auth.data?.basket || [])

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={4}>
          {products?.length > 0 ? products.map((item: any) => (

            <Product item={item} />

          )

          ) : "basket is empty"}

        </Col>
      </Row>
    </>
  );
};

export default Basket;