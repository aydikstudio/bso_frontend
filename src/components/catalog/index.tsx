import { Row, Col } from 'antd';
import Product from '../product';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProduct } from '../../redux/slices/product';



const Catalog = () => {


  const dispatch = useDispatch<any>();
  const products = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProduct());

  }, [])

  return (
    <>
      <Row gutter={[16, 16]}>
        {products.data?.length > 0 && products.data.map((item: any) => (

          <Col span={4}>
            <Product item={item} />
          </Col>
        )

        )}

      </Row>
    </>
  );
};

export default Catalog;